import { Button, Flex, Heading, Text } from '@chakra-ui/core'
import Link from 'next/link'
import React, { useState } from 'react'

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

  const handleToggle = () => setShow(!show)

  return (
    <Flex
      w='100%'
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1.5rem'
      bg='teal.500'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Link href='/'>
          <a>
            <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
              Home
            </Heading>
          </a>
        </Link>
      </Flex>

      <Button variantColor='teal'>
        <Link href='/submit'>
          <a>Submit food</a>
        </Link>
      </Button>

      <Button variantColor='teal'>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </Button>
    </Flex>
  )
}

export default Header
