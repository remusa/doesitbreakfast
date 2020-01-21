import { Flex, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/core'
import { NextPage, NextPageContext } from 'next'
import React from 'react'
import { IEntry } from '../../components/Card'
import Layout from '../../components/Layout'
import { firestore } from '../../utils/firebase'

interface Props {
  entry: IEntry
}

const Product: NextPage<Props> = ({ entry }) => {
  const breaksFast = entry.breaksFast ? 'Yes' : 'No'

  return (
    <Layout>
      <Flex flexDirection='column'>
        <Heading as='h1' textAlign='center'>
          {entry.name}
        </Heading>
        <List as='ul'>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Type: {entry.type}
          </ListItem>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Breaks fast: {breaksFast}
          </ListItem>
          <ListItem>
            <ListIcon icon='arrow-right' color='green.500' />
            Description: {entry.description}
          </ListItem>
        </List>
        {typeof entry.sources !== 'string' ? (
          <List as='ol'>
            {entry.sources.map((e, index) => (
              <ListItem key={index}>
                <ListIcon icon='check-circle' color='green.500' />
                {e}
              </ListItem>
            ))}
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
