import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// configuration object
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

// creates user document on firestore db if doesn't exists
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if user is not logged in returns
  const userRef = firestore.doc(`/users/${userAuth.uid}`); //queries user doc from firestore
  const snapShot = await userRef.get(); //get user snapshot using the user ref

  // if snapshot contains no data, adds data to the doucment using userRef.set
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.messagingSenderId);
    }
  }
  return userRef;
};

// initalizes firebase app using config
firebase.initializeApp(config);

// sets auth and firestore after initializing
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// sets auth provider using gmail accoutn
const provider = new firebase.auth.GoogleAuthProvider();

// prompts account selection
provider.setCustomParameters({ prompt: "select_account" });

// makes account selection a popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
