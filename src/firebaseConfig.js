import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAfpR14R5blpCrMrNCe9Qju2XPrqxlHSwI",
  authDomain: "movies-1001-4b1a7.firebaseapp.com",
  databaseURL: "https://movies-1001-4b1a7.firebaseio.com",
  projectId: "movies-1001-4b1a7",
  storageBucket: "movies-1001-4b1a7.appspot.com",
  messagingSenderId: "824281428108"
};

firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true
});

export { firebase as default, googleProvider, auth, firestore };
