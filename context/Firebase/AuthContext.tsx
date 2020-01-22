import { useToast } from '@chakra-ui/core'
import { User } from 'firebase'
import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  createUserProfileDocument,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '../../utils/firebase'

type TUser = firebase.firestore.DocumentData & { uid: string }

interface IContext {
  user: TUser
  loginWithGoogle: () => void
  loginWithEmail: (email: string, password: string) => void
  registerWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => void
  logout: () => void
}

const AuthContext = createContext({} as IContext)

interface Props {
  children: any
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userDocument = await createUserProfileDocument(userAuth)
        userDocument.onSnapshot(doc => {
          setUser({ uid: doc.id, user: doc.data() })
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribeFromAuth()
  }, [])

  const showToast = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    })
  }

  const loginWithGoogle = async () => {
    const response = await signInWithGoogle().catch(e => {
      console.error(
        `loginWithGoogle | ERROR LOGGING IN WITH GOOGLE: ${e.message}`
      )
      showToast({
        title: 'Error logging in with Google.',
        description: `${e.message}. You may need to enable cookies to login with this option.`,
        status: 'error',
      })
    })

    if (response) {
      showToast({
        title: 'Logged in with Google successfully.',
        description: 'Welcome!',
        status: 'success',
      })
      router.push('/')
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(email, password).catch(
      error => {
        console.error(`loginWithEmail | ${error.message} - ${error.code}`)
        showToast({
          title: 'Error logging in.',
          description: `${error.message}`,
          status: 'error',
        })
      }
    )

    if (response) {
      showToast({
        title: 'Logged in successfully.',
        description: 'Welcome back!.',
        status: 'success',
      })
      router.push('/')
    }
  }

  const registerWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const response = await createUserWithEmailAndPassword(
      email,
      password
    ).catch(error => {
      console.error(`registerWithEmail | ${error.message} - ${error.code}`)
      showToast({
        title: 'Error signing up.',
        description: `${error.message}`,
        status: 'error',
      })
    })

    if (response) {
      const user: User = auth.currentUser
      await createUserProfileDocument(user, {
        displayName,
      })
      showToast({
        title: 'Account created successfully.',
        description: `Welcome!`,
        status: 'success',
      })
      router.push('/')
    }
  }

  const logout = async () => {
    await signOut()
    setUser(null)
    showToast({
      title: 'Successfully logged out.',
      description: 'See you later!',
      status: 'info',
    })
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
