import React from "react";
import styled from "styled-components";
import googleSignIn from "../btn_google_signin_light_normal_web@2x.png";

import firebase, { auth, googleProvider } from "firebaseConfig";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
`;

const GoogleButton = styled("button")`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;

  cursor: pointer;
`;

const LoginPage = () => {
  const db = firebase.firestore();

  const loginWithGoogle = async () => {
    const { user } = await auth.signInWithPopup(googleProvider);

    if (user) {
      console.log("USER", user);

      const { docs } = await db.collection("movies").get();

      // TODO: Only set movies if the user is new
      const movies = [];
      docs.forEach(movie => {
        movies.push(movie.data());
      });

      db.collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          movies,
        });
    }
  };

  return (
    <Wrapper>
      <GoogleButton onClick={loginWithGoogle}>
        <img width="191" alt="Sign in with Google" src={googleSignIn} />
      </GoogleButton>
    </Wrapper>
  );
};

export default LoginPage;
