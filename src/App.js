import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import classes from "./App.module.css";
import Layout from "./components/Layout/Layout";
import LoginWithAmazon from "./components/Pages/LoginWithAmazon";
import NetlifyApp from "./components/Pages/NetlfiyApp/NetlifyApp";
import ProfilePage from "./components/Pages/ProfilePage";

const App = () => {


  return (
    <BrowserRouter>
      <Layout>
        <div className={classes.App}>
          <h1>OAuth Practice App</h1>
          <Route path="/lwa" component={LoginWithAmazon} />
          <Route path="/netlify-oauth" component={NetlifyApp} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
