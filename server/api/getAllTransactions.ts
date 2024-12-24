import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        // Fetch all transfers
        const transfers = await prisma.transfer.findMany({
            include: {
                outcomingCard: {
                    include: {
                        user: true, // Include user information for outgoing card
                    },
                },
                incomingCard: {
                    include: {
                        user: true, // Include user information for incoming card
                    },
                },
                user: true, // Transferi yapan kişinin bilgisi
            },
        });

        // Fetch all payments
        const payments = await prisma.payment.findMany({
            include: {
                Card: {
                    include: {
                        user: true, // Include user information for the card
                    },
                },
                user: true, // Include user information for the payment
            },
        });

        // Combine and format the data
        const combinedList = [
            ...transfers.map((transfer) => ({
                user: transfer.incomingCard.user
                    ? `${transfer.incomingCard.user.firstName} ${transfer.incomingCard.user.lastName}`
                    : "Unknown User", // Transferi yapılan kişinin bilgileri
                date: transfer.transferDate,
                number: transfer.outcomingCard.cardNumber.toString(),
                state: transfer.transferStatus,
                amount: "-" + transfer.transferAmount.toString(), // Para gönderme
                detail: transfer.transferDetail?.toString(),
                cardType: transfer.outcomingCard.type,
            })),
            ...transfers.map((transfer) => ({
                user: transfer.outcomingCard.user
                    ? `${transfer.outcomingCard.user.firstName} ${transfer.outcomingCard.user.lastName}`
                    : "Unknown User", // Transferi yapılan kişinin bilgileri
                date: transfer.transferDate,
                number: transfer.incomingCard.cardNumber.toString(),
                state: transfer.transferStatus,
                amount: "+" + transfer.transferAmount.toString(), // Para alma
                detail: transfer.transferDetail?.toString(),
                cardType: transfer.incomingCard.type,
            })),
            ...payments.map((payment) => ({
                user: payment.user
                    ? `${payment.user.firstName} ${payment.user.lastName}`
                    : "Unknown User", // Payment yapan kişinin bilgileri
                date: payment.paymentDate,
                number: payment.Card
                    ? payment.Card.cardNumber.toString()
                    : "Unknown Card",
                state: payment.paymentStatus,
                amount: "-" + payment.paymentAmount.toString(), // Payment gönderme
                detail: payment.paymentDetail?.toString(),
                cardType: payment.Card?.type,
            })),
        ];

        // Sorting by date (newest to oldest)
        combinedList.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return {
            list: combinedList,
        };
    } catch (error) {
        console.error("Error while fetching data:", error);
        return { error: "An error occurred while fetching transfers and payments" };
    }
});
