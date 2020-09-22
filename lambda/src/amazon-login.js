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

  // Get User Profile
  // https://developer.amazon.com/docs/login-with-amazon/obtain-customer-profile.html
  // Clients may ask the user to share some personal information from their Amazon profile,
  // including name, email address, and zip code

  const userProfile = await axios.get('https://api.amazon.com/user/profile', {
    params: {
      access_token: accessTokenResponse.data.access_token
    }
  })

  console.log(userProfile.data);

  return {
    statusCode: 200,
    body: "abc",
  };
};
