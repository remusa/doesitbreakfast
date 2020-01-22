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

export const createUserProfileDocument = async (user, additionalData = {}) => {
  if (!user) {
    return
  }

  const userRef = firestore.doc(`users/${user.uid}`)

  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    const createdAt = new Date()
    const isAdmin = false

    try {
      await userRef.set({
        email,
        displayName,
        photoURL,
        createdAt,
        isAdmin,
        ...additionalData,
      })
    } catch (e) {
      console.error('Error creating user.', e.message)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = async (uid: string) => {
  if (!uid) {
    return null
  }

  try {
    return firestore.collection('users').doc(uid)
  } catch (e) {
    console.error('Error fetching user.', e.message)
  }
}

export const belongsToCurrentUser = (currentUser, author) => {
  if (!currentUser) {
    return false
  }

  return currentUser.uid === author.uid
}

export default firebaseApp
