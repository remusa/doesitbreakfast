import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/core'
import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import CardList from '../../components/CardList'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import { useAuth } from '../../context/Firebase/AuthContext'
import { useFirestore } from '../../context/Firebase/FirestoreContext'
import { firestore, storage } from '../../utils/firebase'

const Profile: NextPage = () => {
  const toast = useToast()
  const [newDisplayName, setNewDisplayName] = useState('')
  const { user } = useAuth()
  const { data } = useFirestore()
  const imageInput = useRef(null)

  if (!user || !user.user) {
    return <Loading />
  }

  const { uid } = user
  const { displayName, email, photoURL } = user.user

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userRef = firestore.doc(`users/${uid}`)

    if (newDisplayName) {
      try {
        userRef.update({ displayName: newDisplayName })
        setNewDisplayName('')
        toast({
          title: 'Successfully updated profile.',
          description: 'Username changed.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (e) {
        console.error('Error updating displayName.')
      }
    }

    if (imageInput && imageInput.current && imageInput.current.files[0]) {
      const image = imageInput.current.files[0]

      if (image) {
        console.log('image', image)
        storage
          .ref()
          .child('user-profiles')
          .child(uid)
          .child(image.name)
          .put(image)
          .then(res => res.ref.getDownloadURL())
          .catch(e => console.log(`Error uploading file: ${e.message}`))
      }
    }
  }

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
        <Text textAlign='center'>Email: {email}</Text>
        <Text textAlign='center'>Username: {displayName}</Text>

        <Divider />

        <form onSubmit={handleSubmit}>
          <fieldset>
            <Heading as='h2'>Update profile</Heading>

            <FormControl>
              <FormLabel htmlFor='displayName'>Username</FormLabel>
              <Input
                type='text'
                name='displayName'
                className='input'
                placeholder='Username'
                variant='flushed'
                value={newDisplayName}
                onChange={e => {
                  setNewDisplayName(e.target.value)
                }}
              />
              {/* {errors.displayName && (
                <ErrorMessage message={errors.displayName.message} />
              )} */}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='imageInput'>Image</FormLabel>
              <Input
                ref={imageInput}
                type='file'
                name='imageInput'
                variant='flushed'
              />
            </FormControl>

            <Flex justifyContent='space-evenly' mt={8}>
              <Button type='submit' variantColor='teal'>
                Update profile
              </Button>

              <Button type='reset' variantColor='pink' variant='ghost'>
                Reset
              </Button>
            </Flex>
          </fieldset>
        </form>

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
