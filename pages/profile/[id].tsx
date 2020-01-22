import { Flex, Heading, Image, Text } from '@chakra-ui/core'
import { NextPage } from 'next'
import React from 'react'
import CardList from '../../components/CardList'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import { useAuth } from '../../context/Firebase/AuthContext'
import { useFirestore } from '../../context/Firebase/FirestoreContext'

interface Props {
  // entries?: IEntry[]
}

const Profile: NextPage<Props> = () => {
  const { user } = useAuth()
  const { data } = useFirestore()
  console.log('data', data)

  if (!user || !user.user) {
    return <Loading />
  }

  const { displayName, email, photoURL } = user.user

  return (
    <Layout>
      <Flex
        flexDirection='column'
        justify='flexStart'
        maxW={600}
        h='100%'
        mt={8}
        borderRadius={8}
        p={16}
      >
        <Heading as='h1' textAlign='center'>
          Profile
        </Heading>
        <Flex justify='center'>
          <Image
            size='48px'
            objectFit='cover'
            src={photoURL}
            fallbackSrc='https://via.placeholder.com/150'
            alt={`Profile picture`}
          />
        </Flex>
        <Text textAlign='center'>Username: {displayName}</Text>
        <Text textAlign='center'>Email: {email}</Text>
        {data && <CardList entries={data} />}
      </Flex>
    </Layout>
  )
}

// interface Context extends NextPageContext {}

// Profile.getInitialProps = async (ctx: Context) => {
//   const uid = ctx.query.uid
//   const snapshot = await firestore
//     .collection('entries')
//     // @ts-ignore
//     .doc(id)
//     // .doc(`entries/${name}`)
//     .get()
//   const entry = snapshot.data()
//   return { entry }
// }

export default Profile
