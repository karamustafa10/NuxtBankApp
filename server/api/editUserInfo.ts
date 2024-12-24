import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ca } from "date-fns/locale";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // POST request body
  const {
    id,
    firstName,
    lastName,
    mail,
    phone,
    oldPassword,
    newPassword,
    newPasswordAgain,
  } = body;

  const capitalize = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  let isPasswordValid = false;
  let isPasswordChanged = false;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      if (oldPassword === "" && newPassword === "" && newPasswordAgain === "") {
        const capitalizedFirstName = capitalize(firstName);
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            firstName: capitalizedFirstName,
            lastName: lastName,
            mail: mail,
            phone: parseInt(phone),
          },
        });

        await prisma.card.updateMany({
          where: {
            userId: id,
            type: "debit",
          },
          data: {
            cardName: `${capitalizedFirstName} debit ridex card`,
          },
        });

        await prisma.card.updateMany({
          where: {
            userId: id,
            type: "credit",
          },
          data: {
            cardName: `${capitalizedFirstName} credit ridex card`,
          },
        });

        await prisma.transfer.updateMany({
          where: {
            incomingAccountId: id,
          },
          data: {
            transferDetail: `Money transfer to ${capitalizedFirstName} ${lastName.slice(0,1)}.`,
          },
        });

        return { success: true, message: "User Info changed successfully!" };
      }
    }

    if (user) {
      if (oldPassword != "") {
        isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      }
      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid password!",
        };
      }
    }

    if (isPasswordValid) {
      if (firstName === "") {
        firstName.value = user?.firstName;
      }

      if (lastName === "") {
        lastName.value = user?.lastName;
      }

      if (mail === "") {
        mail.value = user?.mail;
      }

      if (phone === "") {
        phone.value = user?.phone.toString();
      }

      if (oldPassword === "") {
        oldPassword.value = user?.password;
      }

      if (
        oldPassword != "" &&
        newPassword != "" &&
        newPasswordAgain != "" &&
        newPassword === newPasswordAgain
      ) {
        isPasswordChanged = true;
        const capitalizedFirstName = capitalize(firstName);
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            firstName: capitalizedFirstName,
            lastName: lastName,
            mail: mail,
            phone: parseInt(phone),
            password: await bcrypt.hash(newPassword, 10),
          },
        });
      }
    }

    if (isPasswordChanged) {
      return {
        success: true,
        message: "Password and User Info changed successfully!",
      };
    }
  } catch (error) {
    console.error("Error while fetching user:", error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
});
