import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBQVM_g349rjQe84QzOvuE8RAeO2-oZOYY",
    authDomain: "reactnative-signal.firebaseapp.com",
    projectId: "reactnative-signal",
    storageBucket: "reactnative-signal.appspot.com",
    messagingSenderId: "567253339221",
    appId: "1:567253339221:web:2ef3cddeda88e33af118dc"
  };

  let app;
  
  if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};