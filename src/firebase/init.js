import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDjPKNa03h73SmlHVWGW52KjVCbhAd6LpA",
  authDomain: "geoapp-a5e8c.firebaseapp.com",
  databaseURL: "https://geoapp-a5e8c.firebaseio.com",
  projectId: "geoapp-a5e8c",
  storageBucket: "geoapp-a5e8c.appspot.com",
  messagingSenderId: "758953201328",
  appId: "1:758953201328:web:917b40e881858077"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
