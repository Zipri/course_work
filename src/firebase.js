import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const fireDB = firebase.initializeApp({
  apiKey: "AIzaSyA_neaNwb967N6JCaVl7Yyt7InjFN2FqiA",
  authDomain: "data-base-rep.firebaseapp.com",
  projectId: "data-base-rep",
  storageBucket: "data-base-rep.appspot.com",
  messagingSenderId: "913285644385",
  appId: "1:913285644385:web:042813467493bc8489aa20"
});

export const fireAuth = fireDB.auth();
export default fireDB;