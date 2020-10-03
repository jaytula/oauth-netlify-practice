import querystring from "querystring";
import {
  authorizationCodeClient,
  REDIRECT_URL,
} from "./utils/netlify-auth";
import { getUser } from "./utils/netlify-api";
import { APIGatewayEvent } from "aws-lambda";

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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user, null, 2),
    };


    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     user: user,
    //     authResult: authResult,
    //     state: state,
    //     encode: Buffer.from(token, 'binary').toString('base64')
    //   })
    // }

    // const encodedUserData = querystring.stringify({
    //   email: user.email || "NA",
    //   full_name: user.full_name || "NA",
    //   avatar: user.avatar_url || "NA",
    // });

    // const URI = `${state.url}#${encodedUserData}&csrf=${
    //   state.csrf
    // }&token=${Buffer.from(token, "binary").toString("base64")}`;
    // console.log("URI", URI);
    // /* Redirect user to authorizationURI */
    // return {
    //   statusCode: 302,
    //   headers: {
    //     Location: URI,
    //     "Cache-Control": "no-cache", // Disable caching of this response
    //   },
    //   body: "", // return body for local dev
    // };
  } catch (e) {
    console.log("Access Token Error", e.message);
    console.log(e);
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};
