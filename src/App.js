import React from "react";
import { Router } from "@reach/router";

import Home from "pages/Home";
import useAuth from "./useAuth";

// TODO: update to use a hook instead of a renderProp
const App = () => {
  const user = useAuth();
  console.log(user);


  if(user === null) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Home user={user} path="/" />
    </Router>
  );
};

export default App;
