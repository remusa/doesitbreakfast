import {
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/core'
import { NextPage, NextPageContext } from 'next'
import React from 'react'
import { IEntry } from '../../components/Card'
import Layout from '../../components/Layout'
import { firestore } from '../../utils/firebase'

interface Props {
  entry: IEntry
}

const Product: NextPage<Props> = ({ entry }) => {
  return (
    <Layout>
      <Flex flexDirection='column' maxW={600} mt={8}>
        <Heading as='h1' textAlign='center'>
          {entry.name}
        </Heading>

        <Flex justify='center' mt={4}>
          <Image
            size='48px'
            objectFit='cover'
            src={entry.image}
            fallbackSrc='https://via.placeholder.com/150'
            alt={`${entry.name} image`}
          />
        </Flex>

        <List as='ul'>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Type: {entry.type}
          </ListItem>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Breaks fast: {entry.breaksFast ? 'Yes' : 'No'}
          </ListItem>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Description: {entry.description}
          </ListItem>
        </List>

        {typeof entry.sources !== 'string' ? (
          <List as='ol'>
            {entry.sources.map((src, index) => {
              if (src === '' || !src) return
              return (
                <ListItem key={index}>
                  <ListIcon icon='check-circle' color='green.500' />
                  {src}
                </ListItem>
              )
            })}
          </List>
        ) : (
          <Text>{entry.sources}</Text>
        )}
      </Flex>
    </Layout>
  )
}

interface Context extends NextPageContext {}

Product.getInitialProps = async (ctx: Context) => {
  const id = ctx.query.id
  const snapshot = await firestore
    .collection('entries')
    // @ts-ignore
    .doc(id)
    // .doc(`entries/${name}`)
    .get()
  const entry = snapshot.data()
  return { entry }
}

export default Product
