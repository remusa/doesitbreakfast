import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import {
//   API_KEY,
//   APP_ID,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   MESSAGING_SENDER_ID,
//   PROJECT_ID,
//   STORAGE_BUCKET,
// } from '../.env.js'

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// }

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

const Firebase = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const firestore = Firebase.firestore()

export const fireauth: firebase.auth.Auth = Firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export default Firebase
