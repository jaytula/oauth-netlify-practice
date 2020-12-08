import React from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import classes from "./App.module.css";
import Layout from "./components/Layout/Layout";
import LoginWithAmazon from "./components/Pages/LoginWithAmazon";
import NetlifyApp from "./components/Pages/NetlfiyApp/NetlifyApp";
import ProfilePage from "./components/Pages/ProfilePage";
import { RefreshModal } from "@groundearth0/auth-utils";
import "@groundearth0/auth-utils/dist/index.css";
import { AuthProvider, useAuth } from "./providers/auth-provider";

const AppRouter = () => {
  const { checkUser, user, logout, refresh } = useAuth();
  const history = useHistory();

  const onLogout = () => {
    logout(() => {
      console.log({history})
      history.replace("/");
    });
  };
  checkUser();

  const onRefreshData = (data) => {
      console.log(data);
      console.log('abc');

      // Need to redirect to `/profile` which is the ProfilePage component
      // Needed queryParams are: userId, email, iat, exp

      const urlParams = new URLSearchParams();
      urlParams.set("userId", data.userId);
      urlParams.set("email", data.email);
      urlParams.set("iat", data.iat);
      urlParams.set("exp", data.exp);

      const qs = urlParams.toString();

      // TODO: why is history undefined?
      console.log(history);
            // history.push(`/profile?${qs}`);

  }

  const onRefresh = () => {
    console.log("TODO: onRefresh");
    refresh().then(onRefreshData);
  };

  return (
    <BrowserRouter>
      <Layout>
        <RefreshModal
          enabled={!!user.email}
          exp={user.exp}
          onLogout={onLogout}
          refresh={onRefresh}
          secondsRemaining={460}
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
