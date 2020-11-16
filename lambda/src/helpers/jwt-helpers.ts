import cookie from "cookie";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

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
    expiresIn: "2 minutes",
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

export const decodeJwtPayload = (payload: string) =>
  jwt.verify(payload, JWT_PUBLIC_KEY, { algorithms: ['RS256'] }) as JwtPayload;
  
export const createJwtCookie = (email: string, userId: string) => {
  const payload = createJwtPayload(email, userId);
  return createJwtCookieFromPayload(payload);
};

export const clearCookie = () => {
  return "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
