import { NextPage } from 'next'
import React from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { firestore } from '../lib/firebase'

const FormStyles = styled.form`
  text-align: center;

  .error-message {
    color: red;
  }
`

interface Props {}

const Submit: NextPage<Props> = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async (data, e) => {
    const newEntry = { ...data, sources: data.sources.split('\n') }
    console.log('newEntry', newEntry)

    const res = await firestore
      .collection('entries')
      .doc(data.name.toLowerCase())
      .set(data)
      .then(() => {})
      .catch(error => {
        console.error('Error writing document: ', error)
      })

    if (res !== null) {
      console.log('Document successfully written!')
      e.target.reset()
    }
  }

  return (
    <Layout>
      <FormStyles onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
          <h1 data-testid='submit-page'>Submit new food</h1>

          <div>
            <label htmlFor='name'>Name: </label>
            <input ref={register({ required: true })} name='name' type='input' />

            {errors.name && <span className='error-message'>{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor='type'>Type: </label>
            <select ref={register} name='type'>
              <option value='Common Drinks'>Common Drinks</option>
              <option value='Additions/Condiments'>Additions/Condiments</option>
              <option value='Non-caloric Sweeteners'>Non-caloric Sweeteners</option>
              <option value='Supplements'>Supplements</option>
              <option value='Breath-Freshening Items'>Breath-Freshening Items</option>
            </select>

            {errors.type && <span className='error-message'>{errors.type.message}</span>}
          </div>

          <div>
            <label htmlFor='breaks'>Yes</label>
            <input
              ref={register({ required: true })}
              name='breaks'
              type='radio'
              value='yes'
              defaultChecked={false}
            />
            <label htmlFor='breaks'>No</label>
            <input ref={register({ required: true })} name='breaks' type='radio' value='no' />

            {errors.breaks && <span className='error-message'>{errors.breaks.message}</span>}
          </div>

          <div>
            <label htmlFor='description'>Description: </label>
            <textarea ref={register({ required: true })} name='description' />

            {errors.description && (
              <span className='error-message'>{errors.description.message}</span>
            )}
          </div>

          <div>
            <label htmlFor='sources'>Sources: </label>
            <textarea ref={register} name='sources' />

            {errors.sources && <span className='error-message'>{errors.sources.message}</span>}
          </div>

          <div>
            <button type='submit'>Submit</button>
            <button type='reset'>Reset</button>
          </div>
        </fieldset>

        {/* <div style={{ color: 'red' }}>
          <pre>
            {Object.keys(errors).length > 0 && (
              <label>Errors: {JSON.stringify(errors, null, 2)}</label>
            )}
          </pre>
        </div> */}
      </FormStyles>
    </Layout>
  )
}

export default Submit
