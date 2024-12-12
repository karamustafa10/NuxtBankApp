import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            phone: parseInt(phone),
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
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            firstName: firstName,
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
