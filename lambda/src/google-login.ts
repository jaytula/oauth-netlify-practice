import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  const { queryStringParameters } = event;

  console.log({queryStringParameters});

  return {
    statusCode: 200,
    headers: {
      'Conten-Type': 'application/json'
    },

    body: JSON.stringify(queryStringParameters)
  }
};
