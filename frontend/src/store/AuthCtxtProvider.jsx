import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useState } from 'react';
import React from 'react';

const AuthContext = createContext({
  token: '',
  funds: {},
  login(author_name, token) {},
  logout() {},
  isUserLoggedIn: false,
  isUserAdmin: false,
});

export default function AuthCtxProvider({ children }) {
  // let tokenData = parseJWTToken(localStorage.getItem('token'));

  const [authState, setAuthState] = useState({
    token: '',
    funds: {},
  });

  function login(email, token) {
    console.log('įvyko login');
    const tokenData = jwtDecode(token);

    setAuthState({
      token,
      email,
      funds: tokenData.funds,
    });

    localStorage.setItem('token', token);
  }

  function logout() {
    setAuthState({
      token: '',
      funds: {},
    });

    localStorage.removeItem('token');
  }

  const isUserLoggedIn = !!authState.token;

  let isUserAdmin = false;
  if (isUserLoggedIn) {
    const tokenData = jwtDecode(authState.token);
    isUserAdmin = !!(tokenData.user.hasOwnProperty('scope') && tokenData.user.scope === 'admin');
  }

  const ctxValue = {
    isUserLoggedIn,
    isUserAdmin,
    token: authState.token,

    login,
    logout,
    funds: authState.funds,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
