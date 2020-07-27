import React from 'react';
import * as firebase from 'firebase'; 

var firebaseConfig = {
    apiKey: "AIzaSyBOrEfO6tnFiJAz1tL5RxUsGqwmjNfFrEo",
    authDomain: "pro-organiser-2eb3c.firebaseapp.com",
    databaseURL: "https://pro-organiser-2eb3c.firebaseio.com",
    projectId: "pro-organiser-2eb3c",
    storageBucket: "pro-organiser-2eb3c.appspot.com",
    messagingSenderId: "909081629005",
    appId: "1:909081629005:web:c5e0cdce3585ecf802a704",
    measurementId: "G-JX9TX5CZ08"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;