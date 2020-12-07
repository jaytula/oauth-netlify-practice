import JwtHelpers from "./jwt-helpers";

export const JWT_PUBLIC_KEY = Buffer.from(
  process.env.JWT_PUBLIC_KEY as string,
  "base64"
).toString("ascii");

export const JWT_SECRET_KEY = Buffer.from(
  process.env.JWT_SECRET_KEY as string,
  "base64"
).toString("ascii");

export const {
  createJwtPayload,
  createJwtCookieFromPayload,
  decodeJwtPayload,
  createJwtCookie,
  clearCookie,
} = JwtHelpers({
  secretKey: JWT_SECRET_KEY,
  publicKey: JWT_PUBLIC_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN as string || "480 sec",
  sameSite: (process.env.JWT_SAMESITE as
    | boolean
    | "strict"
    | "none"
    | "lax"
    | undefined) || "strict",
  httpOnly: true,
  secure: true,
});
