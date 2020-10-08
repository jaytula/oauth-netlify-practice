import querystring from "querystring";
import { authorizationCodeClient, REDIRECT_URL } from "./utils/netlify-auth";
import { getUser } from "./utils/netlify-api";
import { APIGatewayEvent } from "aws-lambda";
import { createJwtCookie } from "./helpers/jwt-helper";
import { connectToDatabase } from "./helpers/db-helper";
import { User } from "./models/User";

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

    const jwtCookie = createJwtCookie(user.email, user.id);

    await connectToDatabase();

    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      const newUser = User.build({
        email: user.email,
      });

      await newUser.save();
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": jwtCookie,
      },
      body: JSON.stringify({ user, jwtCookie }, null, 2),
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
