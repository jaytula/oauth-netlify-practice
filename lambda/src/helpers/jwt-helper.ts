import cookie from "cookie";
import jwt from "jsonwebtoken";

export const JWT_PUBLIC_KEY = Buffer.from(
  process.env.JWT_PUBLIC_KEY as string,
  "base64"
).toString("ascii");

const JWT_SECRET_KEY = Buffer.from(
  process.env.JWT_SECRET_KEY as string,
  "base64"
).toString("ascii");

export const createJwtCookie = (email: string, userId: string) => {
  const payload = jwt.sign({ email, userId }, JWT_SECRET_KEY, {
    algorithm: "RS256",
    expiresIn: "1 day",
  });
  return cookie.serialize("jwt", payload, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};
