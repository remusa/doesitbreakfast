import { Box, Flex, Heading, Image, Text } from '@chakra-ui/core'
import Link from 'next/link'
import React from 'react'

export interface IEntry {
  id: string
  name: string
  type: string
  breaksFast: string
  description: string
  sources?: string[] | string
  image?: string
}

export interface IProps {
  entry: IEntry
}

const Card: React.FC<IProps> = ({ entry }) => {
  const color = entry.breaksFast ? 'red.500' : 'green.500'

  return (
    <Link href='/product/[id]' as={`/product/${entry.id}`}>
      <Flex
        flexDirection='column'
        textAlign='center'
        w='250px'
        h='250px'
        overflowY='hidden'
        borderWidth='6.5px 0px 0px 0px'
        borderColor={color}
        borderRadius={6}
        borderStyle='solid'
        boxShadow=' 8px 10px 20px 0px rgba(46, 61, 73, 0.15)'
        m={8}
        p={8}
        cursor='pointer'
        lineHeight='1.5rem'
        // backgroundColor={color}
      >
        <Heading as='h2' fontSize='1.5rem' textAlign='center' mb={4}>
          {entry.name}
        </Heading>
        <Text fontStyle='italic'>{entry.type}</Text>
        <Text>
          Breaks fast:
          <Box as='span' textTransform='capitalize' fontWeight='bold'>
            {' '}
            {entry.breaksFast ? 'Yes' : 'No'}
          </Box>
        </Text>
        {/* <Text>Description:</Text>
        <Text>{entry.description}</Text> */}
        <Flex justify='center'>
          <Image
            size='100px'
            objectFit='cover'
            src={entry.image}
            fallbackSrc='https://via.placeholder.com/150'
            alt={`${entry.name} image`}
          />
        </Flex>
      </Flex>
    </Link>
  )
}

export default Card
