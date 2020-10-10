import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import cookie from 'cookie';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const parsedCookie = cookie.parse(event.headers.cookie);
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "profile endpoint",
      headers: event.headers,
      parsedCookie
    }),
  };
};
