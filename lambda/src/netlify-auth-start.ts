import { APIGatewayEvent } from "aws-lambda";
import { authorizationCodeClient, REDIRECT_URL } from "./utils/netlify-auth";

/* Do initial auth redirect */
export const handler = async (event: APIGatewayEvent) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "No token found",
      }),
    };
  }

  const csrfToken = event.queryStringParameters.csrf;
  const redirectUrl = event.queryStringParameters.url;


  /* Generate authorizationURI */
  const authorizationURI = authorizationCodeClient.authorizeURL({
    redirect_uri: REDIRECT_URL,
    /* Specify how your app needs to access the user’s account. */
    scope: "",
    /* State helps mitigate CSRF attacks & Restore the previous state of your app */
    state: `url=${redirectUrl}&csrf=${csrfToken}`,
  });

  /* Redirect user to authorizationURI */
  return {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Cache-Control": "no-cache", // Disable caching of this response
    },
    body: "", // return body for local dev
  };
};
