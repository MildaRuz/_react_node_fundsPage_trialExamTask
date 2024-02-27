import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../store/AuthCtxtProvider';

export default function Header() {
  const { isUserLoggedIn, logout, email, user, isUserAdmin } = useAuthContext();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/auth/login');
  }

  return (
    <div className="bg-green-100">
      <header className="container flex justify-end items-center">
        <>
          <NavLink className="px-3 py-2 hover:bg-green-300" to={'/'}>
            Home
          </NavLink>
          <NavLink className="px-3 py-2 hover:bg-green-300" to={'/funds'}>
            Funds List
          </NavLink>
          <NavLink className="px-3 py-2 hover:bg-green-300" to={'/create-fund'}>
            Add New Fund
          </NavLink>

          {!isUserLoggedIn && (
            <>
              <NavLink className="px-3 py-2 hover:bg-green-300" to={'/auth/login'}>
                LogIn
              </NavLink>
              <NavLink className="px-3 py-2 hover:bg-green-300" to={'/auth/register'}>
                Register
              </NavLink>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <button onClick={handleLogout} className={'px-3 py-2 hover:bg-green-300'}>
                Logout
              </button>
              <Link className="text-green-400 disabled" to={'/funds'}>
                <>{user.name}</> <>({user.scope})</>
              </Link>
            </>
          )}
        </>
      </header>
    </div>
  );
}
