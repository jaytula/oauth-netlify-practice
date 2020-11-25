import { APIGatewayEvent } from "aws-lambda";
import cookie from "cookie";
import { authWithEmail } from "./helpers/auth-helpers";
import { decodeJwtPayload } from "./helpers/jwt-helpers";

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
    const { email } = decodeJwtPayload(parsedCookie.jwt);

    const response =  await authWithEmail(email);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({response, email})
    }
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
