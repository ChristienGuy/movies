import { useState, useEffect } from "react";
import { auth } from "firebaseConfig";

const AuthState = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  NOT_AUTHENTICATED: "not-authenticated"
};

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuthStateChange = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });

    return function cleanup() {
      unsubscribeAuthStateChange();
    };
  }, []);

  return user;
}

export default useAuth;
