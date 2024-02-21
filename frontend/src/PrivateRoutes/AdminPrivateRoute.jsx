import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../store/AuthCtxtProvider.jsx';

export default function AdminPrivateRoute({ children }) {
  const { isUserLoggedIn, isUserAdmin } = useAuthContext();

  if (isUserLoggedIn) {
    return isUserAdmin ? children : <Navigate to="/" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
