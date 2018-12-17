import React from "react";
import { Router } from "@reach/router";

import Home from "pages/Home";
import useAuth from "./useAuth";
import Login from 'pages/Login';

// TODO: update to use a hook instead of a renderProp
const App = () => {
  const [user, authState] = useAuth();

  if(authState === 'loading') {
    return <p>Loading...</p>;
  }

  if(authState === 'not-authenticated') {
    return <Login />
  }

  return (
    <Router>
      <Home user={user} path="/" />
    </Router>
  );
};

export default App;
