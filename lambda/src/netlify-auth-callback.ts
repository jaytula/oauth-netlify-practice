import querystring from "querystring";
import { authorizationCodeClient, REDIRECT_URL } from "./utils/netlify-auth";
import { getUser } from "./utils/netlify-api";
import { APIGatewayEvent } from "aws-lambda";
import { createJwtCookieFromPayload, createJwtPayload, decodeJwtPayload } from "./helpers/jwt-helper";
import { connectToDatabase } from "./helpers/db-helper";
import { User } from "./models/User";

const authWithEmail = async (email: string) => {
  await connectToDatabase();

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    const newUser = User.build({
      email,
    });

    existingUser = await newUser.save();
  }

  if(!existingUser) {
    throw new Error('existingUser should not be null');
  }
  
  const jwtPayload = createJwtPayload(email, existingUser._id);
  const jwtCookie = createJwtCookieFromPayload(jwtPayload);

  const payload = decodeJwtPayload(jwtPayload);

  const searchParams = new URLSearchParams();
  searchParams.append('userId', existingUser._id);
  searchParams.append('email', existingUser.email);
  searchParams.append('iat', payload.iat.toString());
  searchParams.append('exp', payload.exp.toString());

  return {
    statusCode: 302,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": jwtCookie,
      "Location": `/profile?${searchParams.toString()}`
    },
    body: JSON.stringify({ existingUser, jwtCookie }, null, 2),
  };
}

/* Function to handle netlify auth callback */
export const handler = async (event: APIGatewayEvent) => {
  // Exit early
  if (!event.queryStringParameters) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Not authorized",
      }),
    };
  }

  /* Grant the grant code */
  const code = event.queryStringParameters.code;
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = querystring.parse(event.queryStringParameters.state);

  try {
    /* Take the grant code and exchange for an accessToken */
    const authorizationToken = await authorizationCodeClient.getToken({
      code: code,
      redirect_uri: REDIRECT_URL,
    });

    const user = await getUser(authorizationToken.token.access_token);

    return authWithEmail(user.email);
  } catch (e) {
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};
