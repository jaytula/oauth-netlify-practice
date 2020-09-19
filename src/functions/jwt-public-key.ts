import { APIGatewayEvent } from "aws-lambda";
import { JWT_PUBLIC_KEY } from "./helpers/jwt-helper";

export const handler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JWT_PUBLIC_KEY,
  };
};
