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

export const sanitizeContent = functions.firestore
  .document('posts/{postId}')
  .onWrite(async change => {
    if (!change.after.exists) return

    // @ts-ignore
    const { content, sanitized } = change.after.data()

    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, '***********'),
        sanitized: true,
      })
    }

    return null
  })

export const incrementCommentCount = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params
    const postRef = firestore.doc(`posts/${postId}`)

    const snap = await postRef.get()
    const comments = snap.get('comments')

    return postRef.update({ comments: comments + 1 })
  })

export const decrementCommentCount = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params
    const postRef = firestore.doc(`posts/${postId}`)

    const snap = await postRef.get()
    const comments = snap.get('comments')

    return postRef.update({ comments: comments - 1 })
  })

export const updateUserInformation = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (snapshot, context) => {
    // @ts-ignore
    const { displayName } = snapshot.data()

    const postsRef = firestore
      .collection('posts')
      // @ts-ignore
      .where('user.uid', '==', snapshot.id)

    // @ts-ignore
    return postsRef.get(postSnaps => {
      // @ts-ignore
      postSnaps.forEach(doc => {
        doc.ref.update({ 'user.displayName': displayName })
      })
    })
  })
