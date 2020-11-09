import { APIGatewayEvent } from "aws-lambda";
import cookie from "cookie";
import { authWithEmail } from "./helpers/auth-helpers";
import {
  createJwtCookieFromPayload,
  createJwtPayload,
  decodeJwtPayload,
} from "./helpers/jwt-helpers";
import { User } from "./models/User";

export const handler = async (event: APIGatewayEvent) => {
  if (typeof event.headers.cookie !== "string") {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "no cookie header",
      }),
    };
  }
  const parsedCookie = cookie.parse(event.headers.cookie);

  if (!parsedCookie || !parsedCookie.jwt) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "jwt cookie not found",
      }),
    };
  }

  try {
    const { email } = decodeJwtPayload(req.cookies.jwt);
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Invalid email: ${email}`,
        }),
      };
    }

    return authWithEmail(email);
  } catch (err) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
};
