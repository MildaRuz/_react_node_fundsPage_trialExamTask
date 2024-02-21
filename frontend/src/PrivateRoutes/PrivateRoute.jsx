import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../store/AuthCtxProvider.jsx';

export default function PrivateRoute({ children }) {
  const { isUserLoggedIn } = useAuthContext();

  return isUserLoggedIn ? children : <Navigate to="/auth/login" />;
}
