import jwt from "jsonwebtoken";
import cookie from "cookie";

interface JwtConfig {
  secretKey: string;
  publicKey: string;
  expiresIn?: string;
  sameSite?: boolean | "strict" | "none" | "lax" | undefined;
  httpOnly?: boolean;
  secure?: boolean;
}

type JwtPayload = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

const JwtHelpers = ({
  secretKey,
  publicKey,
  expiresIn = "300 sec",
  sameSite = "strict",
  httpOnly = true,
  secure = true,
}: JwtConfig) => {
  const JWT_SECRET_KEY = secretKey;
  const JWT_PUBLIC_KEY = publicKey;
  const createJwtPayload = (userId: string, email: string) => {
    return jwt.sign({ userId, email }, JWT_SECRET_KEY, {
      algorithm: "RS256",
      expiresIn: expiresIn || "300 sec",
    });
  };
  const createJwtCookieFromPayload = (payload: string) => {
    return cookie.serialize("jwt", payload, {
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite,
    });
  };

  const decodeJwtPayload = (payload: string) =>
    jwt.verify(payload, JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    }) as JwtPayload;

  const createJwtCookie = (userId: string, email: string) => {
    const payload = createJwtPayload(userId, email);
    return createJwtCookieFromPayload(payload);
  };

  const clearCookie = () => {
    const cookieParams = [
      "jwt=deleted",
      "path=/",
      "expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ];

    if (httpOnly) cookieParams.push("HttpOnly");
    if (secure) cookieParams.push("Secure");
    if (sameSite) cookieParams.push(`SameSite=${sameSite}`);

    return cookieParams.join("; ");
  };

  return {
    JWT_PUBLIC_KEY,
    JWT_SECRET_KEY,
    createJwtPayload,
    createJwtCookieFromPayload,
    decodeJwtPayload,
    createJwtCookie,
    clearCookie,
  };
};

export default JwtHelpers;
