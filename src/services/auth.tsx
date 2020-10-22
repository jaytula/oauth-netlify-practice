import React, { useContext, useState } from "react";

const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL as string;

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

const AuthContext = React.createContext({
  getStoredUser,
  handleLogin: (currentUser: ICurrentUser) => {},
  logout: (callback: Function) => {},
  checkUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser>({ userId: "", email: "" });

  const logout = (callback: Function) => {
    setStoredUser({});
    callback();
  };

  const checkUser = async () => {
    const response = await fetch(`${WEBSITE_URL}/.netlify/functions/profile`);
    if (response.status !== 200) {
      // TODO: How to setUser without causing infinite loop
      logout(() => {});
    }
  };

  const handleLogin = (currentUser: ICurrentUser) => {
    setUser(currentUser);
    return setStoredUser(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{ getStoredUser, handleLogin, logout, checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
