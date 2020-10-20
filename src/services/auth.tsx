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




const logout = (callback: Function) => {
  setStoredUser({});
  callback();
};

const checkUser = () => {
  console.log('TODO: checkUser');
}

const AuthContext = React.createContext({
  getStoredUser,
  handleLogin: (currentUser: ICurrentUser) => {},
  logout,
  checkUser
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser>({userId: '', email: ''})

  const handleLogin = (currentUser: ICurrentUser) => {
    setUser(currentUser);
    return setStoredUser(currentUser);
  };

  return (
    <AuthContext.Provider value={{ getStoredUser, handleLogin, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
