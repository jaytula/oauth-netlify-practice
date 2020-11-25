import React, { useContext, useState } from "react";

const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL as string;

export interface ICurrentUser {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

const isBrowser = () => typeof window !== "undefined";

const getStoredUser = () =>
  isBrowser() && window.localStorage.getItem("currentUser")
    ? JSON.parse(window.localStorage.getItem("currentUser") as string)
    : {};

const setStoredUser = (currentUser: ICurrentUser) =>
  window.localStorage.setItem("currentUser", JSON.stringify(currentUser));

interface ContextProps {
  user: ICurrentUser;
  handleLogin: (currentUser: ICurrentUser) => void;
  logout: (callback: Function) => void;
  refresh: () => void;
  checkUser: () => void;
}

const emptyUser = { userId: "", email: "", iat: 0, exp: 0 };

const AuthContext = React.createContext<ContextProps>({
  user: emptyUser,
  handleLogin: (currentUser: ICurrentUser) => {},
  logout: (callback: Function) => {},
  refresh: () => {},
  checkUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser>(getStoredUser());

  const logout = async (callback: Function) => {
    // TODO: clear the jwt cookie
    setStoredUser(emptyUser);
    if (user.email || user.userId) {
      setUser(emptyUser);
      await fetch(`${WEBSITE_URL}/.netlify/functions/logout`);
    }
    callback();
  };

  const checkUser = async () => {
    const response = await fetch(`${WEBSITE_URL}/.netlify/functions/profile`);
    if (response.status !== 200) {
      logout(() => {});
    }
  };

  const handleLogin = (currentUser: ICurrentUser) => {
    setUser(currentUser);
    return setStoredUser(currentUser);
  };

  const refresh = () => {
    fetch("/.netlify/functions/refresh-session")
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, logout, checkUser, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};
