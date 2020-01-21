import { useToast } from '@chakra-ui/core'
import { User } from 'firebase'
import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { fireauth, googleProvider } from '../../utils/firebase'

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
  const [user, setUser] = useState<User | null>(fireauth.currentUser ? fireauth.currentUser : null)
  const [loggedIn, setIsLoggedIn] = useState<boolean>(fireauth.currentUser ? true : false)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    fireauth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    })
  }, [])

  const loginWithGoogle = async () => {
    console.log(`LOGIN WITH GOOGLE`)
    try {
      await fireauth.signInWithPopup(googleProvider)
      toast({
        title: 'Logged in with Google successfully.',
        description: 'Welcome!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    } catch (e) {
      console.log(`ERROR LOGGING IN WITH GOOGLE: ${e.message}`)
      toast({
        title: 'Error logging in with Google.',
        description: `${e.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    const response = await fireauth.signInWithEmailAndPassword(email, password).catch(error => {
      throw new Error(`${error.message} - ${error.code}`)
    })
    if (response) {
      const user: User = fireauth.currentUser
      // const token = await user.getIdToken()
      // firestore
      //   .collection('users')
      //   .doc(response.user.uid)
      //   .set(user)
      setUser(user)
      setIsLoggedIn(true)
      toast({
        title: 'Logged in successfully.',
        description: 'Welcome back!.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    }
  }

  const registerWithEmail = async (email: string, password: string) => {
    const response = await fireauth.createUserWithEmailAndPassword(email, password).catch(error => {
      throw new Error(`${error.message} - ${error.code}`)
    })
    if (response) {
      const user: User = fireauth.currentUser
      setUser(user)
      setIsLoggedIn(true)
      toast({
        title: 'Account created successfully.',
        description: `Welcome!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    }
  }

  const logout = async () => {
    await fireauth.signOut()
    // TODO: check if it works
    setUser(null)
    setIsLoggedIn(false)
    toast({
      title: 'Successfully logged out.',
      description: 'See you later!',
      status: 'info',
      duration: 5000,
      isClosable: true,
    })
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }

