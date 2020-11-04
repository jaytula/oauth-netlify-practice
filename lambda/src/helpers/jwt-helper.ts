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

export const createJwtPayload = (email: string, userId: string) => {
  return jwt.sign({ email, userId }, JWT_SECRET_KEY, {
    algorithm: "RS256",
    expiresIn: "10 seconds",
  });
};

export const createJwtCookieFromPayload = (payload: string) => {
  return cookie.serialize("jwt", payload, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};
export const createJwtCookie = (email: string, userId: string) => {
  const payload = createJwtPayload(email, userId);
  return createJwtCookieFromPayload(payload);
};

export const clearCookie = () => {
  return "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
