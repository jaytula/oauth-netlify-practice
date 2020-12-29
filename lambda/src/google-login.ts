import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  const { queryStringParameters } = event;

  console.log({queryStringParameters});

  // TODO: Verify integrity of ID Token
  // https://developers.google.com/identity/sign-in/web/backend-auth
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(queryStringParameters)
  }
};
