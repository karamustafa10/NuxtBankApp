import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Şifrelerin güvenli bir şekilde saklanması için bcrypt kullanıyoruz
import { defineEventHandler, readBody } from "h3";
import { setCookie } from "h3";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // İstek gövdesindeki veriyi alıyoruz
  const { mail, password, rememberMe } = body;

  // Mail ile kullanıcıyı veritabanında arıyoruz
  const user = await prisma.user.findUnique({
    where: {
      mail: mail,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found...",
      firstName: "",
    };
  }

  // Şifreyi kontrol ediyoruz
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Wrong password...",
      firstName: "",
    };
  }

  // // Encrypt the user ID for the session cookie
  // const encryptedUserId = encrypt(user.id.toString());

  const token = jwt.sign(
    {
      id: user.id.toString(),
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      mail: user.mail,
      phone: user.phone.toString(),
      rememberMe: rememberMe, // Add rememberMe to the token payload
    },
    SECRET_KEY,
    {
      expiresIn: rememberMe ? "7d" : "1h", // Set token expiration based on rememberMe
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

  // // Set session cookie
  // const COOKIE_NAME = "session";
  // setCookie(event, COOKIE_NAME, encryptedUserId);

  // Başarıyla giriş yaptıktan sonra kullanıcının adı ile birlikte başarılı yanıtı döndürüyoruz
  return {
    success: true,
    message: "",
    firstName: user.firstName, // Kullanıcının adını ekliyoruz
  };
});
