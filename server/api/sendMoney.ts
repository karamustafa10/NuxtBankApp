import { defineEventHandler, readBody } from "h3";
import { PrismaClient } from "@prisma/client";
import { broadcast } from "../wsServer";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { senderId, senderCardType, transferAmount, receiverId } = body;

  if (!senderId || !senderCardType || !transferAmount || !receiverId) {
    return {
      status: "error",
      message: "Missing required fields.",
      errorDetails:
        "Ensure senderId, senderCardType, transferAmount, and receiverId are provided.",
    };
  }

  try {
    const senderIdBigInt = BigInt(senderId);
    const transferAmountFloat = parseFloat(transferAmount);
    const receiverIdBigInt = BigInt(receiverId);

    const senderCard = await prisma.card.findFirst({
      where: {
        userId: senderIdBigInt,
        type: senderCardType,
      },
    });

    if (!senderCard || senderCard.cardAmount === undefined) {
      return {
        status: "error",
        message: "Sender card not found or invalid amount.",
        errorDetails: "",
      };
    }

    if (transferAmountFloat <= 0) {
      return {
        status: "error",
        message: "Inavlid transfer amount.",
        errorDetails: "",
      };
    }

    if (senderCard.cardAmount < transferAmountFloat) {
      return {
        status: "error",
        message: "Insufficient funds on the sender card.",
        errorDetails: "",
      };
    }

    const receiverPerson = await prisma.user.findUnique({
      where: { id: receiverIdBigInt },
    });

    if (!receiverPerson) {
      return {
        status: "error",
        message: "Receiver not found.",
        errorDetails: "",
      };
    }

    const receiverCard = await prisma.card.findFirst({
      where: {
        userId: receiverIdBigInt,
        type: "debit",
      },
    });

    if (!receiverCard) {
      return {
        status: "error",
        message: "Receiver card not found",
        errorDetails: "",
      };
    }

    await prisma.$transaction([
      prisma.card.update({
        where: { cardNumber: BigInt(senderCard.cardNumber) },
        data: {
          cardAmount: Number(senderCard.cardAmount) - transferAmountFloat,
        },
      }),
      prisma.card.update({
        where: { cardNumber: BigInt(receiverCard.cardNumber) },
        data: {
          cardAmount: Number(receiverCard.cardAmount) + transferAmountFloat,
        },
      }),
      prisma.transfer.create({
        data: {
          outcomingCardNumber: BigInt(senderCard.cardNumber),
          incomingCardNumber: BigInt(receiverCard.cardNumber),
          incomingAccountId: receiverIdBigInt,
          outcomingAccountId: senderIdBigInt,
          transferAmount: transferAmountFloat,
          transferStatus: "success",
          transferDetail: `Money transfer to ${
            receiverPerson.firstName
          } ${receiverPerson.lastName.slice(0, 1)}.`,
        },
      }),
    ]);

    broadcast({
      type: "transaction",
      transaction: {
        senderId,
        senderCardType,
        transferAmount,
        receiverId,
        transferStatus: "success",
        transferDetail: `Money transfer to ${
          receiverPerson.firstName
        } ${receiverPerson.lastName.slice(0, 1)}.`,
      },
    });

    return {
      status: "success",
      message: "Money sent successfully!",
      errorDetails: "",
    };
  } catch (error) {
    console.error("Error in sendMoney API:", {
      senderId,
      senderCardType,
      transferAmount,
      receiverId,
      error,
    });

    return {
      status: "error",
      message: "Failed to send money.",
      errorDetails:
        error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
});
