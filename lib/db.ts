import { firestore } from './firebase'

export const GET_DATA = async () => {
  const allFoods = []

  const snapshot = await firestore.collection('entries').get()

  snapshot.forEach(doc => {
    allFoods.push({ ...doc.data(), id: doc.id })
  })

  return allFoods
}
