import * as React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const GOOGLE_OAUTH_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

function isGoogleLoginResponse(
  response: GoogleLoginResponseOffline | GoogleLoginResponse
): response is GoogleLoginResponse {
  return (response as GoogleLoginResponse).getBasicProfile !== undefined;
}

const GoogleOauthApp = () => {
  // TODO: Google Sign-In JavaScript client
  // Reference: https://developers.google.com/identity/sign-in/web/reference
  // Article: https://developers.google.com/identity/sign-in/web/sign-in
  // https://www.npmjs.com/package/react-google-login

  const onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void = (response) => {
    if (isGoogleLoginResponse(response)) {

      const searchParams = new URLSearchParams();
      searchParams.set('id', response.getId())
      searchParams.set('id_token', response.getAuthResponse().id_token);

      fetch(`/.netlify/functions/google-login?${searchParams.toString()}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    }
  };

  const onFailure = (err: any) => {
    console.log({ err });
  };
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
