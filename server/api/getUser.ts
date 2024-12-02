import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Şifrelerin güvenli bir şekilde saklanması için bcrypt kullanıyoruz
import { defineEventHandler, readBody } from "h3";
import { setCookie } from "h3";
import { encrypt } from "~/server/utils/encryption";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // İstek gövdesindeki veriyi alıyoruz
  const { mail, password } = body;

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

  // Encrypt the user ID for the session cookie
  const encryptedUserId = encrypt(user.id.toString());

  // Set session cookie
  const COOKIE_NAME = "session";
  setCookie(event, COOKIE_NAME, encryptedUserId);

  // Başarıyla giriş yaptıktan sonra kullanıcının adı ile birlikte başarılı yanıtı döndürüyoruz
  return {
    success: true,
    message: "",
    firstName: user.firstName, // Kullanıcının adını ekliyoruz
  };
});
