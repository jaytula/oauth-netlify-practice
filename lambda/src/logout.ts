import { APIGatewayEvent } from "aws-lambda";
import { clearCookie } from "./helpers/jwt-helper";

export const handler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': clearCookie()
    },
    body: JSON.stringify({
      message: 'Clearing JWT Cookie',
    })
  };
};
