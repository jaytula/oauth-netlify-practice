import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./helpers/jwt-helpers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  if(typeof event.headers.cookie !== 'string') {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "no cookie header",
      }),
    }
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
  const jwtInfo = jwt.verify(parsedCookie.jwt, JWT_PUBLIC_KEY )

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "profile endpoint",
      headers: event.headers,
      jwtInfo,
    }),
  };
} catch (err) {
  return {
    statusCode: 401,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: err.message
    })
  }
}
};
