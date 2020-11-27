import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
const JWT_SAMESITE =
  (process.env.JWT_SAMESITE as
    | boolean
    | "strict"
    | "none"
    | "lax"
    | undefined) || "strict";

type JwtPayload = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

export const JWT_PUBLIC_KEY = Buffer.from(
  process.env.JWT_PUBLIC_KEY as string,
  "base64"
).toString("ascii");

const JWT_SECRET_KEY = Buffer.from(
  process.env.JWT_SECRET_KEY as string,
  "base64"
).toString("ascii");

export const createJwtPayload = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET_KEY, {
    algorithm: "RS256",
    expiresIn: JWT_EXPIRES_IN || "300 sec",
  });
};

export const createJwtCookieFromPayload = (payload: string) => {
  return cookie.serialize("jwt", payload, {
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: JWT_SAMESITE,
  });
};

export const decodeJwtPayload = (payload: string) =>
  jwt.verify(payload, JWT_PUBLIC_KEY, { algorithms: ["RS256"] }) as JwtPayload;

export const createJwtCookie = (email: string, userId: string) => {
  const payload = createJwtPayload(userId, email);
  return createJwtCookieFromPayload(payload);
};

export const clearCookie = () => {
  return "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
