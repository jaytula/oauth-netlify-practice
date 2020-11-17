import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import classes from "./App.module.css";
import Layout from "./components/Layout/Layout";
import LoginWithAmazon from "./components/Pages/LoginWithAmazon";
import NetlifyApp from "./components/Pages/NetlfiyApp/NetlifyApp";
import ProfilePage from "./components/Pages/ProfilePage";
import RefreshModal from "./components/RefreshModal/RefreshModal";
import { AuthProvider, useAuth } from "./providers/auth-provider";

const AppRouter = () => {
  const { checkUser, user, logout, refresh } = useAuth();

  checkUser();

  return (
    <BrowserRouter>
      <Layout>
        <RefreshModal
          enabled={!!user.email}
          exp={user.exp}
          logout={logout}
          refresh={refresh}
        />
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

const withAuthProvider = Component => {
  return () => (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
};

const App = withAuthProvider(AppRouter);

export default App;
