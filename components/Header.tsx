import { Box, Button, Flex, useDisclosure } from '@chakra-ui/core'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../context/Firebase/AuthContext'

interface Props {}

const Header: React.FC<Props> = props => {
  const [show, setShow] = useState<boolean>(false)
  const { user, logout } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const displayName = user ? user.user.displayName || user.user.email : ''
  const isAdmin = user ? user.user.isAdmin : false
  const uid = user ? user.uid : ''

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
      padding='1.25rem 1.75rem'
      bg='#fdfdfd'
      color='teal'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Button
          size='lg'
          letterSpacing={'-.1rem'}
          variantColor='teal'
          variant='ghost'
        >
          <Link href='/'>
            <a>Does it break a fast?</a>
          </Link>
        </Button>

        <Button variantColor='teal' variant='ghost'>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </Button>

        {user && isAdmin && (
          <Button variantColor='teal' variant='ghost'>
            <Link href='/submit'>
              <a>Submit food</a>
            </Link>
          </Button>
        )}
      </Flex>

      <Box>
        {!user ? (
          <>
            <Button variantColor='teal' variant='outline'>
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </Button>

            <Button variantColor='teal' variant='ghost'>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </Button>
          </>
        ) : (
          <Flex flexDirection='row' justifyContent='space-between'>
            <Button type='button' variantColor='teal' variant='outline'>
              <Link href='/profile/[uid]' as={`/profile/${uid}`}>
                <a>{displayName}</a>
              </Link>
            </Button>

            <Button onClick={handleLogout} variantColor='pink' variant='ghost'>
              Logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default Header
