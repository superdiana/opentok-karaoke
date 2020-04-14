import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const fb = firebase.initializeApp(firebaseConfig);
const FirebaseContext = React.createContext();

function FirebaseProvider({ children }) {
  const [user, initializing, error] = useAuthState(fb.auth());

  const googleLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    fb.auth().signInWithPopup(provider);
  };

  const logout = () => {
    fb.auth().signOut();
  };

  const value = {
    googleLogin,
    logout,
    user,
    initializing,
    error
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
};

function useAuth() {
  const context = React.useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within FirebaseProvider')
  }

  return context;
}

export default FirebaseProvider;
export { useAuth };
