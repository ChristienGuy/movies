import React, { Fragment } from "react";
import styled from "styled-components";

import Auth from "./Auth";
import { Router } from "@reach/router";

import Home from 'pages/Home';

const SiteWrapper = styled("div")`
  padding: 16px;
`;

const App = () => (
  <Auth>
    {({ user, movies }) => (
      <Fragment>
        <SiteWrapper>
          <Router>
            <Home user={user} movies={movies} path="/" />
            {/* <Dash user={user} path="/dash" />
            <AddBookmark user={user} path="/add-bookmark" /> */}
          </Router>
        </SiteWrapper>
      </Fragment>
    )}
  </Auth>
);

export default App;
