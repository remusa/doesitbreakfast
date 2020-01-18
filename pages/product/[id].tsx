import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { IEntry } from '../../components/Card'
import Layout from '../../components/Layout'
import { firestore } from '../../lib/firebase'

interface Props {
  entry: IEntry
}

const Product: NextPage<Props> = ({ entry }) => {
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
