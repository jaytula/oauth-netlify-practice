import React from "react";
import classes from "./App.module.css";

const App = () => {
  return (
    <div className={classes.App}>
      <h1>OAuth Practice App</h1>

      <a href id="LoginWithAmazon">
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
