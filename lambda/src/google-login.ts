import { APIGatewayEvent } from "aws-lambda";
import {OAuth2Client} from 'google-auth-library';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string;

export const handler = async (event: APIGatewayEvent) => {
  const { queryStringParameters } = event;

  if(!queryStringParameters || !queryStringParameters.id_token) {
    return {
      statusCode: 500,
    }
  }
  const id_token = queryStringParameters.id_token as string;

  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({idToken: id_token, audience: CLIENT_ID})
  const payload = ticket.getPayload();
  if(!payload || !('sub' in payload)) {
    return {
      statusCode: 500,
    }
  }
  
  const userid = payload['sub']

  // TODO: Verify integrity of ID Token
  // https://developers.google.com/identity/sign-in/web/backend-auth
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({userid})
  }
};
