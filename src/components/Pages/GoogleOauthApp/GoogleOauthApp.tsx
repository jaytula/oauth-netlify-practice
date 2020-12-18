import * as React from "react";

const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const GoogleOauthApp = () => {
  const onClickHandler = () => {
    console.log("onClickHandler");

    // TODO: Hello, GAPI Article
    // https://medium.com/google-cloud/gapi-the-google-apis-client-library-for-browser-javascript-5896b12dbbd5
    // TODO: Figure out how to declare gapi
    // https://mariusschulz.com/blog/declaring-global-variables-in-typescript
    console.log(gapi)
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
