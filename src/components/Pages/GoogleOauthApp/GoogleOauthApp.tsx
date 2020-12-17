import * as React from "react";

const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const GoogleOauthApp = () => {
  const onClickHandler = () => {
    console.log("onClickHandler");

    // TODO: Figure out how to declare gapi
    // https://mariusschulz.com/blog/declaring-global-variables-in-typescript
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
