import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQwNlBlD0HbzmnahG0FUGtCBt3IjvQnZM",
  authDomain: "xero-bill-deb86.firebaseapp.com",
  projectId: "xero-bill-deb86",
  storageBucket: "xero-bill-deb86.appspot.com",
  messagingSenderId: "1082531733038",
  appId: "1:1082531733038:web:1b0d7fbe69e8da51ee49bf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
