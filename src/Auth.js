import React, { useState, useEffect, Fragment } from "react";
import { auth } from "./firebaseConfig";
import Login from "pages/Login";

const AuthState = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  NOT_AUTHENTICATED: "not-authenticated"
};

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(AuthState.NOT_AUTHENTICATED);
  let unsubscribeAuthStateChange = () => {};

  useEffect(() => {
    unsubscribeAuthStateChange = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setAuthState(AuthState.AUTHENTICATED);
      } else {
        setUser(user);
        setAuthState(AuthState.NOT_AUTHENTICATED);
      }
    });

    return function cleanup() {
      unsubscribeAuthStateChange();
    };
  }, []);

  // TODO: move bookmark fetching logic out of Auth
  // getBookmarks = async user => {

  //   const { docs } = await this.db
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("movies")
  //     .get();

  //   console.log("BOOKMARKS", bookmarks);
  // };

  const renderChildren = () => {
    switch (authState) {
      case AuthState.LOADING:
        return <p>loading</p>;
      case AuthState.NOT_AUTHENTICATED:
        return <Login />;
      case AuthState.AUTHENTICATED:
        // this.getBookmarks(user);
        return children({ user });
      default:
        break;
    }
  };

  return <Fragment>{renderChildren()}</Fragment>;
};

export default Auth;
