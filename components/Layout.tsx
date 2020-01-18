import { Flex } from '@chakra-ui/core'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

interface Props {
  title?: string
  children: any
}

const Layout: React.FC<Props> = props => {
  return (
    <Flex w='100%' h='100vh' flexDirection='column' alignItems='center'>
      <Header />

      <Flex
        as='main'
        h='100vh'
        paddingY='1.5rem'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
      >
        {props.children}
      </Flex>

      <Footer />
    </Flex>
  )
}

export default Layout
