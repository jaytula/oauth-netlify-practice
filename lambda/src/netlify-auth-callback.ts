import querystring from "querystring";
import { authorizationCodeClient, REDIRECT_URL } from "./utils/netlify-auth";
import { getUser } from "./utils/netlify-api";
import { APIGatewayEvent } from "aws-lambda";
import { createJwtCookieFromPayload, createJwtPayload, JWT_PUBLIC_KEY } from "./helpers/jwt-helper";
import { connectToDatabase } from "./helpers/db-helper";
import { User } from "./models/User";
import jwt from 'jsonwebtoken';

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

    const jwtPayload = createJwtPayload(user.email, user.id);
    const jwtCookie = createJwtCookieFromPayload(jwtPayload);

    await connectToDatabase();

    let existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      const newUser = User.build({
        email: user.email,
      });

      existingUser = await newUser.save();
    }

    if(!existingUser) {
      throw new Error('existingUser should not be null');
    }

    const payload: any = jwt.verify(jwtPayload, JWT_PUBLIC_KEY);

    const searchParams = new URLSearchParams();
    searchParams.append('userId', existingUser._id);
    searchParams.append('email', existingUser.email);
    searchParams.append('iat', payload.iat);
    searchParams.append('exp', payload.exp);


    return {
      statusCode: 302,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": jwtCookie,
        "Location": `/profile?${searchParams.toString()}`
      },
      body: JSON.stringify({ existingUser, jwtCookie }, null, 2),
    };
  } catch (e) {
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};
