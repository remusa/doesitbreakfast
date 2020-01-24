import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true,
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const getAllPosts = functions.https.onRequest(async (req, res) => {
  const snapshot = await firestore.collection('posts').get()
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  res.json({ posts })
})
