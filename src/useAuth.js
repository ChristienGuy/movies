import { useState, useEffect } from "react";
import { auth } from "firebaseConfig";

const AuthState = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  NOT_AUTHENTICATED: "not-authenticated"
};

function useAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(AuthState.LOADING);

  useEffect(() => {
    const unsubscribeAuthStateChange = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setAuthState(AuthState.AUTHENTICATED)
      } else {
        setUser(user);
        setAuthState(AuthState.NOT_AUTHENTICATED)
      }
    });

    return function cleanup() {
      unsubscribeAuthStateChange();
    };
  }, []);

  return [user, authState];
}

export default useAuth;
