import React from "react";
import classes from "./App.module.css";

const App = () => {
  const onClick = () => {
    const options = {};
    options.scope = "profile";
    options.scope_data = {
      profile: { essential: false },
    };

    const amazon = window.amazon;
    amazon.Login.authorize(options, 'https://www.example.com/handle_login.php');
    return false;
  };

  return (
    <div className={classes.App}>
      <h1>OAuth Practice App</h1>

      <a href id="LoginWithAmazon" onClick={onClick}>
        <img
          border="0"
          alt="Login with Amazon"
          src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
          width="156"
          height="32"
        />
      </a>
    </div>
  );
};

export default App;
