import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/core'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useForm from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import Layout from '../components/Layout'
import { useAuth } from '../context/Firebase/AuthContext'
import { firestore } from '../utils/firebase'

interface Props {}

const Submit: NextPage<Props> = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm()
  const toast = useToast()
  const { user, loggedIn } = useAuth()
  const router = useRouter()
  // const fileInput = useRef(null)

  if ((!user || !loggedIn) && typeof window !== 'undefined') {
    router.push('/')
  }

  const onSubmit = async (data, e) => {
    // let image = null
    // let imageURL = null
    // if (fileInput.current.files) {
    //   image = fileInput.current.files[0]
    //   console.log('file', image.name)
    // }
    // if (image) {
    //   await storage
    //     .ref()
    //     .child('entries')
    //     .child(data.id)
    //     .child(image.name)
    //     .put(image)
    //     .then(res => res.ref.getDownloadURL())
    //     .then(url => {
    //       imageURL = url
    //     })
    //     .catch(e => console.log(`Error uploading file: ${e.message}`))
    // }
    // console.log('imageURL', imageURL)

    const newEntry = {
      ...data,
      breaksFast: data.breaksFast === 'yes' ? true : false,
      sources: data.sources.split('\n'),
      approved: false,
    }

    // if (imageURL) newEntry.imageURL = imageURL

    const res = await firestore
      .collection('entries')
      .doc(data.name.toLowerCase())
      .set(newEntry)
      .catch(e => {
        toast({
          title: 'Error submitting entry.',
          description: `${e.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return
      })

    if (res === undefined) {
      return
    }

    if (res !== null) {
      toast({
        title: 'Success!',
        description: 'Entry successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      e.target.reset()
    }
  }

  return (
    <Layout>
      <Flex textAlign='center' flexDirection='column'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
            <Heading as='h1' data-testid='submit-page'>
              Submit new food
            </Heading>

            <FormControl>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input
                ref={register({ required: true })}
                name='name'
                type='input'
                variant='flushed'
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='type'>Type</FormLabel>
              <Select ref={register} name='type' variant='flushed'>
                <option value='Common Drinks'>Common Drinks</option>
                <option value='Additions/Condiments'>
                  Additions/Condiments
                </option>
                <option value='Non-caloric Sweeteners'>
                  Non-caloric Sweeteners
                </option>
                <option value='Supplements'>Supplements</option>
                <option value='Breath-Freshening Items'>
                  Breath-Freshening Items
                </option>
              </Select>
              {errors.type && <ErrorMessage message={errors.type.message} />}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor='breaksFast'>Breaks fast?</FormLabel>
              <RadioGroup
                name='breaksFast'
                spacing={5}
                isInline
                defaultValue='yes'
              >
                <Radio
                  name='breaksFast'
                  value='yes'
                  variantColor='red'
                  ref={register({ required: true })}
                >
                  Yes
                </Radio>
                <Radio
                  name='breaksFast'
                  value='no'
                  variantColor='green'
                  ref={register({ required: true })}
                >
                  No
                </Radio>
              </RadioGroup>
              {errors.breaksFast && (
                <ErrorMessage message={errors.breaksFast.message} />
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Input
                ref={register({ required: true })}
                name='description'
                variant='flushed'
              />
              {errors.description && (
                <ErrorMessage message={errors.description.message} />
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='sources'>Sources</FormLabel>
              <Textarea ref={register} name='sources' variant='flushed' />
              {errors.sources && (
                <ErrorMessage message={errors.sources.message} />
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='image'>Image URL</FormLabel>
              <Input ref={register} name='image' variant='flushed' />
              {errors.image && <ErrorMessage message={errors.image.message} />}
            </FormControl>

            <Flex justifyContent='center' mt={4}>
              <Button type='submit' variantColor='teal'>
                Submit
              </Button>
            </Flex>
          </fieldset>
        </form>
      </Flex>
    </Layout>
  )
}

export default Submit
