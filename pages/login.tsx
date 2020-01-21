import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/core'
import { NextPage } from 'next'
import React from 'react'
import useForm from 'react-hook-form'
import * as yup from 'yup'
import ErrorMessage from '../components/ErrorMessage'
import Layout from '../components/Layout'
import { useAuth } from '../context/Firebase/AuthContext'
import { emailValidation, passwordValidation } from '../utils/validationSchemas'

const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
})

export interface IUser {
  email: string
  password: string
}

interface Props {}

const Login: NextPage<Props> = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, dirty, isValid },
  } = useForm<IUser>({
    validationSchema,
  })
  const toast = useToast()

  const onSubmit = async ({ email, password }: IUser) => {
    try {
      loginWithEmail(email, password)
    } catch (e) {
      toast({
        title: 'Error logging in.',
        description: `${e.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Layout>
      <Flex textAlign='center' flexDirection='column'>
        <Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
              <Heading as='h1' data-testid='login-page'>
                Login to your account
              </Heading>

              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='Email'
                  ref={register({ required: true })}
                  variant='flushed'
                />
                {errors.email && <ErrorMessage message={errors.email.message} />}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  className='input'
                  placeholder='*****'
                  ref={register({ required: true })}
                  variant='flushed'
                />
                {errors.password && <ErrorMessage message={errors.password.message} />}
              </FormControl>

              <Flex justifyContent='space-evenly' mt={8}>
                <Button type='submit' variantColor='teal'>
                  Login
                </Button>

                <Button type='reset' variantColor='pink' variant='ghost'>
                  Reset
                </Button>
              </Flex>
            </fieldset>
          </form>
        </Flex>

        <Divider />

        <Flex justifyContent='center' mt={4}>
          <Button type='button' variantColor='orange' variant='outline' onClick={loginWithGoogle}>
            Login with Google
          </Button>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Login
