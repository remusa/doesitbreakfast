import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/core'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../context/Firebase/AuthContext'

const MenuItems = ({ children }) => {
  return (
    <Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
      {children}
    </Text>
  )
}

interface Props {}

const Header: React.FC<Props> = props => {
  const [show, setShow] = useState<boolean>(false)
  const { user, loggedIn, logout } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const displayName = user ? user.displayName || user.email : ''

  const handleLogout = () => {
    logout()
  }

  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as='nav'
      w='100%'
      justifyContent='space-between'
      alignItems='center'
      wrap='wrap'
      padding='1rem'
      bg='teal.500'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Link href='/'>
          <a>
            <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
              Does it break a fast?
            </Heading>
          </a>
        </Link>

        <Button variantColor='teal'>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </Button>

        {loggedIn && user && (
          <Button variantColor='teal'>
            <Link href='/submit'>
              <a>Submit food</a>
            </Link>
          </Button>
        )}
      </Flex>

      <Box>
        {!loggedIn && !user ? (
          <>
            <Button variantColor='teal'>
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </Button>

            <Button variantColor='teal'>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </Button>
          </>
        ) : (
          <Flex flexDirection='row' justifyContent='space-between'>
            <Button type='button' variantColor='white' variant='outline'>
              <Link href='/'>
                <a>{displayName}</a>
              </Link>
            </Button>
            <Button variantColor='teal' onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default Header
