import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBW3LSeHv7pfxKzSmBcJLJWqaJhFN4A6uY",
  authDomain: "crwn-db-6f6ec.firebaseapp.com",
  databaseURL: "https://crwn-db-6f6ec.firebaseio.com",
  projectId: "crwn-db-6f6ec",
  storageBucket: "crwn-db-6f6ec.appspot.com",
  messagingSenderId: "7318566999",
  appId: "1:7318566999:web:f9a115548bbd52bb5ccb12",
  measurementId: "G-MTN3W7MLP5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
