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
  const entryId = entry.id // .replace(/ /g, '-')

  return (
    <Link href='/product/[id]' as={`/product/${entryId}`}>
      <Flex
        flexDirection='column'
        textAlign='center'
        w='225px'
        h='250px'
        overflowY='hidden'
        // backgroundColor={color}
        borderWidth='6.5px 0px 0px 0px'
        borderColor={entry.breaksFast ? 'red.500' : 'green.500'}
        borderRadius={6}
        borderStyle='solid'
        boxShadow=' 8px 10px 20px 0px rgba(46, 61, 73, 0.15)'
        m={8}
        p={8}
        cursor='pointer'
        lineHeight='1.5rem'
      >
        <Heading as='h2' fontSize='1.5rem' textAlign='center' mb={4}>
          {entry.name}
        </Heading>
        <Flex justify='center'>
          <Image
            size='48px'
            objectFit='cover'
            src={entry.image}
            fallbackSrc='https://via.placeholder.com/150'
            alt={`${entry.name} image`}
          />
        </Flex>
        <Text fontStyle='italic'>{entry.type}</Text>
        <Text>
          Breaks fast:
          <Box as='span' textTransform='capitalize' fontWeight='bold'>
            {' '}
            {entry.breaksFast ? 'Yes' : 'No'}
          </Box>
        </Text>
        {/* <Text>Description: {entry.description}</Text> */}
      </Flex>
    </Link>
  )
}

export default Card
