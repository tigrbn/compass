// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
// import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBFW04ZVfoyU8p18m9oMapy1HagQh2k5E8",
  authDomain: "appnorthtour.firebaseapp.com",
  projectId: "appnorthtour",
  storageBucket: "appnorthtour.appspot.com",
  messagingSenderId: "865939370034",
  appId: "1:865939370034:web:d83283403529626b470c2b",
  measurementId: "G-V14CSTJPCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

