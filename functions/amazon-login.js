const axios = require("axios");

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;

  const accessTokenResponse = await axios.post(
    "https://api.amazon.com/auth/o2/token",
    {
      grant_type: "authorization_code",
      code: queryStringParameters.code,
      // redirect_uri: '?',
      client_id: process.env.AMAZON_O2_CLIENT_ID,
      client_secret: process.env.AMAZON_O2_CLIENT_SECRET,
    }
  );

  console.log(accessTokenResponse.data);
  // Successful response has access_token, token_type, expires_in, and refresh_token

  return {
    statusCode: 200,
    body: "abc",
  };
};
