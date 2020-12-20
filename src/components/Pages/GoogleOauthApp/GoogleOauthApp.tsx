import * as React from "react";

const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;


const GoogleOauthApp = () => {
  React.useEffect(() => {
    // TODO: Google Sign-In JavaScript client
    // Reference: https://developers.google.com/identity/sign-in/web/reference
    // Article: https://developers.google.com/identity/sign-in/web/sign-in
    // https://www.npmjs.com/package/react-google-login
    console.log(gapi)
  }, [])
  const onClickHandler = () => {
    console.log("onClickHandler");


    console.log({GOOGLE_OAUTH_CLIENT_ID});
  };
  return (
    <div>
      <h2>Google Oauth App Demo</h2>

      <button onClick={onClickHandler}>Login</button>
    </div>
  );
};

export default GoogleOauthApp;
