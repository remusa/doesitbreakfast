import React, { createContext, useContext, useEffect, useState } from 'react'
import { firestore } from '../../utils/firebase'
import { useAuth } from './AuthContext'

interface IContext {
  data: any
}

const FirestoreContext = createContext({} as IContext)

interface Props {
  children: any
}

const FirestoreProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<any | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      console.log('FirestoreContext | no user')
      return
    }

    const unsubscribeFromFirestore = firestore
      .collection('users')
      .doc(user.uid)
      .collection('entries')
      .onSnapshot(snapshot => {
        const entries = []
        snapshot.forEach(doc => {
          const newEntry = { id: doc.id, ...doc.data() }
          entries.push(newEntry)
        })
        setData(entries)
        console.log('entries', entries)
      })

    return () => unsubscribeFromFirestore()
  }, [])

  return (
    <FirestoreContext.Provider value={{ data }}>
      {children}
    </FirestoreContext.Provider>
  )
}

const useFirestore = () => useContext(FirestoreContext)

export { FirestoreProvider, useFirestore }
