import * as React from "react";
import GoogleLogin from "react-google-login";

const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string

const GoogleOauthApp = () => {
  // TODO: Google Sign-In JavaScript client
  // Reference: https://developers.google.com/identity/sign-in/web/reference
  // Article: https://developers.google.com/identity/sign-in/web/sign-in
  // https://www.npmjs.com/package/react-google-login

  const onSuccess = (resp: any) => {
    console.log({resp});
  }

  const onFailure = (err: any) => {
    console.log({err});
  }
  return (
    <div>
      <h2>Google Oauth App Demo</h2>

      <GoogleLogin
        clientId={GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleOauthApp;
