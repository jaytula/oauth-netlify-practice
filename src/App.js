import React from "react";
import {BrowserRouter} from 'react-router-dom';
import classes from "./App.module.css";
import Layout from "./components/Layout/Layout";

const App = () => {
  window.onAmazonLoginReady = function () {
    window.amazon.Login.setClientId(
      process.env.REACT_APP_LWA_CLIENT_ID
    );
  };
  (function (d) {
    var a = d.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.id = "amazon-login-sdk";
    a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
    d.getElementById("amazon-root").appendChild(a);
  })(document);

  const onClick = () => {
  //   const options = {};
  //   options.scope = "profile";
  //   options.scope_data = {
  //     profile: { essential: false },
  //   };

    const amazon = window.amazon;
    amazon.Login.authorize({
      scope: 'profile',
      response_type: 'code',
      state: 'lulu',
    }, `${process.env.REACT_APP_WEBSITE_URL}/.netlify/functions/amazon-login`);
    return false;
  };

  return (
    <BrowserRouter>
      <Layout>
        <div className={classes.App}>
          <h1>OAuth Practice App</h1>
    
          <div id="LoginWithAmazon" onClick={onClick}>
            <img
              border="0"
              alt="Login with Amazon"
              src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
              width="156"
              height="32"
            />
          </div>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
