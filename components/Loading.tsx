import { CircularProgress, Flex } from '@chakra-ui/core'
import React from 'react'
import Layout from './Layout'

const Loading: React.FC = () => {
  return (
    <Layout>
      <Flex flexDirection='column' maxW={600} mt={8}>
        <CircularProgress isIndeterminate color='teal' />
      </Flex>
    </Layout>
  )
}

export default Loading
