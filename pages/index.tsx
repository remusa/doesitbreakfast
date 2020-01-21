import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/core'
import 'isomorphic-fetch'
import { NextPage, NextPageContext } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import Card, { IEntry } from '../components/Card'
import Layout from '../components/Layout'
import { firestore } from '../utils/firebase'

interface Props {
  entries: IEntry[]
}

const Index: NextPage<Props> = ({ entries }) => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('All')
  const [filteredEntries, setFilteredEntries] = useState(entries)

  useEffect(() => {
    let filtered = entries
    if (selected === 'All') {
      filtered = entries.filter(entry =>
        entry.name.toLowerCase().includes(search.toLowerCase())
      )
    } else {
      filtered = entries.filter(
        entry =>
          entry.name.toLowerCase().includes(search.toLowerCase()) &&
          entry.type.toLowerCase() === selected.toLowerCase()
      )
    }
    setFilteredEntries(filtered)
  }, [search, selected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSelected(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleClear = (
    e: React.MouseEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    e.preventDefault()
    setSearch('')
    setSelected('All')
  }

  return (
    <Layout>
      <Heading as='h1' mb={4}>
        Does it break a fast?
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl textAlign='center' mb={4}>
          <FormLabel htmlFor='search'>Search</FormLabel>
          <Input
            name='search'
            variant='flushed'
            placeholder='Product name, type, etc.'
            value={search}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl textAlign='center'>
          <FormLabel htmlFor='type'>Type</FormLabel>
          <Select
            name='type'
            variant='flushed'
            value={selected}
            onChange={handleSelect}
          >
            <option value='All'>All</option>
            <option value='Common Drinks'>Common Drinks</option>
            <option value='Additions/Condiments'>Additions/Condiments</option>
            <option value='Non-caloric Sweeteners'>
              Non-caloric Sweeteners
            </option>
            <option value='Supplements'>Supplements</option>
            <option value='Breath-Freshening Items'>
              Breath-Freshening Items
            </option>
          </Select>
        </FormControl>

        <Flex justifyContent='center' mt={4}>
          <Button
            type='button'
            variantColor='pink'
            variant='ghost'
            onClick={handleClear}
          >
            Clear
          </Button>
        </Flex>
      </form>

      <Flex
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        mt={8}
      >
        {filteredEntries.map(entry => (
          <Card entry={entry} key={entry.id} />
        ))}
      </Flex>
    </Layout>
  )
}

interface Context extends NextPageContext {}

Index.getInitialProps = async (ctx: Context) => {
  const entries = []
  const snapshot = await firestore.collection('entries').get()
  snapshot.forEach(doc => {
    const docData = doc.data()
    if (docData.approved) {
      entries.push({ ...docData, id: doc.id })
    }
  })
  return { entries }
}

export default Index
