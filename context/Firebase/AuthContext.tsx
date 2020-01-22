import { useToast } from '@chakra-ui/core'
import { User } from 'firebase'
import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '../../utils/firebase'

interface IContext {
  user: User
  loggedIn: boolean
  loginWithGoogle: () => void
  loginWithEmail: (email: string, password: string) => void
  registerWithEmail: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext({} as IContext)

interface Props {
  children: any
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    auth.currentUser ? auth.currentUser : null
  )
  const [loggedIn, setIsLoggedIn] = useState<boolean>(
    auth.currentUser ? true : false
  )
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    })
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
    try {
      await signInWithGoogle()
      showToast({
        title: 'Logged in with Google successfully.',
        description: 'Welcome!',
        status: 'success',
      })
      router.push('/')
    } catch (e) {
      console.log(`ERROR LOGGING IN WITH GOOGLE: ${e.message}`)
      showToast({
        title: 'Error logging in with Google.',
        description: `${e.message}. You may need to enable cookies to login with this option.`,
        status: 'error',
      })
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(email, password).catch(
      error => {
        showToast({
          title: 'Error logging in.',
          description: `${error.message}`,
          status: 'error',
        })
        throw new Error(`${error.message} - ${error.code}`)
      }
    )
    if (response) {
      const user: User = auth.currentUser
      setUser(user)
      setIsLoggedIn(true)
      showToast({
        title: 'Logged in successfully.',
        description: 'Welcome back!.',
        status: 'success',
      })
      router.push('/')
    }
  }

  const registerWithEmail = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(
      email,
      password
    ).catch(error => {
      showToast({
        title: 'Error signing up.',
        description: `${error.message}`,
        status: 'error',
      })
      throw new Error(`${error.message} - ${error.code}`)
    })
    if (response) {
      const user: User = auth.currentUser
      setUser(user)
      setIsLoggedIn(true)
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
    setIsLoggedIn(false)
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
        loggedIn,
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
