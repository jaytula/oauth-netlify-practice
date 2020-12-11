import { APIGatewayEvent } from "aws-lambda";
import cookie from "cookie";
import { authWithEmail } from "./helpers/auth-helpers";
import { decodeJwtPayload } from "./helpers/jwt-helpers-instance";

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
    // TODO: these are old valuees and are not the ones we want
    const { email } = decodeJwtPayload(parsedCookie.jwt);

    const response = await authWithEmail(email);
    const body = JSON.parse(response.body)
    const payload = body.payload as {email: string, userId: string, exp: string, iat: string}
    const {userId, exp, iat} = payload;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": response.headers["Set-Cookie"],
      },
      body: JSON.stringify({ email, userId, exp, iat }),
    };
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
