import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, setCookie } from "h3";
import bcrypt from "bcryptjs";
import { addYears } from "date-fns";
import { encrypt } from "~/server/utils/encryption";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, phone, mail, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if phone or email already exists
    const existingPhone = await prisma.user.findUnique({
      where: { phone: BigInt(phone) },
    });

    const existingMail = await prisma.user.findUnique({
      where: { mail },
    });

    if (existingPhone) {
      return {
        success: false,
        message: "Telefon numarası zaten kullanımda.",
      };
    }

    if (existingMail) {
      return {
        success: false,
        message: "E-posta adresi zaten kullanımda.",
      };
    }

    // Capitalize the first letter of each part of the first name
    const capitalize = (name: string) => {
      return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    };

    const capitalizedFirstName = capitalize(firstName);

    // Create new user
    const user = await prisma.user.create({
      data: {
        firstName: capitalizedFirstName,
        lastName: lastName.toUpperCase(),
        phone: BigInt(phone),
        mail,
        password: hashedPassword,
      },
    });

    // Create debit and credit cards
    const newDebitCard = await prisma.card.create({
      data: {
        type: "debit",
        cardNumber: BigInt(getRandomNumber(16)),
        cardName: `${user.firstName} debit ridex card`,
        validDate: addYears(new Date(), 5),
        secNumber: Number(getRandomNumber(3)),
        cardAmount: 0,
        cardDebt: 0,
        userId: user.id,
      },
    });

    const newCreditCard = await prisma.card.create({
      data: {
        type: "credit",
        cardNumber: BigInt(getRandomNumber(16)),
        cardName: `${user.firstName} credit ridex card`,
        validDate: addYears(new Date(), 5),
        secNumber: Number(getRandomNumber(3)),
        cardAmount: 10000,
        cardDebt: 0,
        userId: user.id,
      },
    });

    // Encrypt the user ID for the session cookie
    const encryptedUserId = encrypt(user.id.toString());

    // // Set session cookie
    // const COOKIE_NAME = "session";
    // setCookie(event, COOKIE_NAME, encryptedUserId);

    //JWT token için çağrı yapılır
    const token = jwt.sign(
      {
        id: user.id.toString(),
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.mail,
        phone: user.phone.toString(),
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Set session cookie
    const COOKIE_NAME = "session";
    setCookie(event, COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
    });

    return {
      success: true,
      message: `Welcome ${user.firstName}!`,
      userMail: user.mail,
    };
  } catch (error) {
    if (error instanceof Error) {
      // Return detailed error message in JSON format
      return {
        success: false,
        message: error.message,
        name: error.name,
        code: (error as any).code, // Some error objects may have `code`
        meta: (error as any).meta, // Some error objects may have `meta`
        stack: error.stack,
      };
    } else {
      // General error message for unknown error types
      return { message: "An unknown error occurred.", success: false };
    }
  }
});

// Utility function to generate a random numeric string of given length
function getRandomNumber(length: number): string {
  // Eğer uzunluk 1 veya daha küçük ise hata döndürülür
  if (length <= 0) {
    throw new Error("Uzunluk 1'den büyük olmalıdır.");
  }

  // Minimum ve maksimum değeri hesaplayalım
  const min = Math.pow(10, length - 1); // En küçük sayı (ör. 1000)
  const max = Math.pow(10, length) - 1; // En büyük sayı (ör. 9999)

  // Rastgele bir sayı üretelim (min ve max dahil)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
}
