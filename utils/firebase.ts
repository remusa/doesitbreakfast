import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './config.json'

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export const firestore = firebaseApp.firestore()
export const storage = firebaseApp.storage()

export const auth: firebase.auth.Auth = firebaseApp.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)
export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)
export const signOut = () => auth.signOut()

export default firebaseApp
