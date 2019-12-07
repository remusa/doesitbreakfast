import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { IEntry } from '../../components/Card'
import Layout from '../../components/Layout'
import { firestore } from '../../lib/firebase'

const Product: NextPage<IEntry> = ({ entry }) => {
  const router = useRouter()

  return (
    <Layout>
      <h1>{entry.name}</h1>

      <p>Type: {entry.type}</p>
      <p>Breaks fast: {entry.breaks}</p>
      <p>Description: {entry.description}</p>

      {typeof entry.sources !== 'string' ? (
        <ul>
          {entry.sources.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      ) : (
        <p>{entry.sources}</p>
      )}
    </Layout>
  )
}

Product.getInitialProps = async context => {
  const id = context.query.id

  const snapshot = await firestore
    .collection('entries')
    // @ts-ignore
    .doc(id)
    // .doc(`entries/${name}`)
    .get()

  return { entry: snapshot.data() }
}

export default Product
