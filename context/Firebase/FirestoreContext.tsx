import React, { createContext, useContext, useEffect, useState } from 'react'
import { firestore } from '../../utils/firebase'
import { useAuth } from './AuthContext'

interface IContext {}

const FirestoreContext = createContext({} as IContext)

interface Props {
  children: any
}

const FirestoreProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<any | null>(null)
  const { user, loggedIn } = useAuth()

  useEffect(() => {
    // let snapshot = () => console.log('No unsubscribe')
    const getData = async () => {
      if (user && loggedIn) {
        const entries = []
        const snapshot = await firestore
          .collection('users')
          .doc(user.uid)
          .collection('posts')
          .get()
        snapshot.forEach(doc => {
          const newEntry = { ...doc.data(), id: doc }
          entries.push(newEntry)
        })
        // snapshot = await firestore
        //   .collection('users')
        //   .doc(user.uid)
        //   .collection('posts')
        //   .onSnapshot(docs => {
        //     docs.forEach(doc => {
        //       const newEntry = { ...doc.data(), id: doc }
        //       entries.push(newEntry)
        //     })
        //   })
        setData(entries)
        console.log('entries', entries)
      }
    }

    getData()
    // return () => snapshot()
  }, [])

  return <FirestoreContext.Provider value={data}>{children}</FirestoreContext.Provider>
}

const useFirestore = () => useContext(FirestoreContext)

export { FirestoreProvider, useFirestore }
