import React, { useContext, useState } from "react";

interface ICurrentUser {
  userId?: string;
  email?: string;
}

const isBrowser = () => typeof window !== "undefined";

const getStoredUser = () =>
  isBrowser() && window.localStorage.getItem("currentUser")
    ? JSON.parse(window.localStorage.getItem("currentUser") as string)
    : {};

const setStoredUser = (currentUser: ICurrentUser) =>
  window.localStorage.setItem("currentUser", JSON.stringify(currentUser));

const isLoggedIn = () => {
  const user = getStoredUser();
  return !!user.username;
};

const handleLogin = (currentUser: ICurrentUser) => {
  return setStoredUser(currentUser);
};

const logout = (callback: Function) => {
  setStoredUser({});
  callback();
};

const AuthContext = React.createContext({
  getStoredUser,
  isLoggedIn,
  handleLogin,
  logout,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={{ getStoredUser: getStoredUser, isLoggedIn, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
