import React, { useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import TodoList from './components/TodoList';
import envConfig from './Env';
import './App.css';

const App = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <TodoList />
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )
      
      }

    </div>
  );

};

export default () => (
  <Auth0Provider
    domain={envConfig.domain}
    clientId={envConfig.clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);