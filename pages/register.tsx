import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/core'
import { NextPage } from 'next'
import React from 'react'
import useForm from 'react-hook-form'
import * as yup from 'yup'
import ErrorMessage from '../components/ErrorMessage'
import Layout from '../components/Layout'
import { useAuth } from '../context/Firebase/AuthContext'
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../utils/validationSchemas'
import { IUser } from './login'

const validationSchema = yup.object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})

interface IRUser extends IUser {
  username: string
  confirmPassword: string
}

interface Props {}

const Register: NextPage<Props> = () => {
  const { registerWithEmail } = useAuth()
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState: { isSubmitting, dirty, isValid },
  } = useForm<IRUser>({
    validationSchema,
  })
  const toast = useToast()

  const onSubmit = async ({ email, username, password, confirmPassword }: IRUser) => {
    try {
      registerWithEmail(email, password)
    } catch (e) {
      toast({
        title: 'Error creating new account.',
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
              <Heading as='h1' data-testid='signup-page'>
                Create new account
              </Heading>

              <FormControl>
                <FormLabel htmlFor='email'>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  className='input'
                  placeholder='Username'
                  ref={register}
                  variant='flushed'
                />
                {errors.username && <ErrorMessage message={errors.username.message} />}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='Email'
                  ref={register}
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
                  ref={register}
                  variant='flushed'
                />
                {errors.password && <ErrorMessage message={errors.password.message} />}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <Input
                  type='password'
                  name='confirmPassword'
                  className='input'
                  placeholder='*****'
                  ref={register}
                  variant='flushed'
                />
                {errors.confirmPassword && (
                  <ErrorMessage message={errors.confirmPassword.message} />
                )}
              </FormControl>

              <Flex justifyContent='space-evenly' mt={8}>
                <Button type='submit' variantColor='teal'>
                  Sign up
                </Button>

                <Button type='reset' variantColor='pink' variant='ghost'>
                  Reset
                </Button>
              </Flex>
            </fieldset>
          </form>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Register
