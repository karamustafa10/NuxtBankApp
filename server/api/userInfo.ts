import { parseCookies } from "h3";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  if (!cookies.session) {
    return { success: false, message: "Session cookie is missing." };
  }

  try {
    const decodedToken = jwt.verify(cookies.session, SECRET_KEY);
    // 'decodedToken' mevcut olduğunda döndürülür
    if (decodedToken) {
      return {
        success: true,
        userId: (decodedToken as jwt.JwtPayload).id,
        userRole: (decodedToken as jwt.JwtPayload).role,
      };
    } else {
      // 'decodedToken' eksikse hata mesajı döndürülür
      setCookie(event, "session", "", {
        maxAge: 0, // Çerezi hemen siler
      });
      return { success: false, message: "Decoded token is missing." };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Failed to verify session token.",
        error: error.message,
      };
    } else {
      return {
        success: false,
        message: "An unknown error occurred.",
        error: String(error),
      };
    }
  }
});
