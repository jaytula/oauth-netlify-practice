import React, {useContext} from 'react';

interface ICurrentUser {
  username?: string;
}

const isBrowser = () => typeof window !== 'undefined';

const getUser = () =>
  isBrowser() && window.localStorage.getItem('currentUser')
  ? JSON.parse(window.localStorage.getItem('currentUser') as string)
  : {}

const setUser = (currentUser: ICurrentUser) =>
  window.localStorage.setItem('currentUser', JSON.stringify(currentUser));


const isLoggedIn = () => {
  const user = getUser();
  return !!user.username
}

const handleLogin = (currentUser: ICurrentUser) => {
  return setUser(currentUser)
}

const logout = (callback: Function) => {
  setUser({})
  callback();
}

const AuthContext = React.createContext({
  getUser,
  isLoggedIn,
  handleLogin,
  logout,
})

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => (
  <AuthContext.Provider value={{getUser, isLoggedIn, handleLogin, logout}}>
    {children}
  </AuthContext.Provider>
)