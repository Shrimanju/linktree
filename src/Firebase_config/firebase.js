// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDHSU3HqoqgxSCiyaM21guqgDHqHpvHaY4",
    authDomain: "linktree-8e19d.firebaseapp.com",
    databaseURL: "https://linktree-8e19d.firebaseio.com",
    projectId: "linktree-8e19d",
    storageBucket: "linktree-8e19d.appspot.com",
    messagingSenderId: "498207836920",
    appId: "1:498207836920:web:9e2d41dfea44a97cb3090d",
    measurementId: "G-QT7JEHS40V"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider,firebaseApp};
  export default db;