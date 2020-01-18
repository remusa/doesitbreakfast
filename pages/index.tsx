import { Button, FormControl, FormLabel, Heading, Input, Select } from '@chakra-ui/core'
import styled from '@emotion/styled'
import 'isomorphic-fetch'
import { NextPage, NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import Card, { IEntry } from '../components/Card'
import Layout from '../components/Layout'
import { firestore } from '../lib/firebase'

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
`

interface IProps {
  entries: IEntry[]
}

const Index: NextPage<IProps> = ({ entries }) => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('All')
  const [filteredEntries, setFilteredEntries] = useState(entries)

  useEffect(() => {
    let filtered = entries

    if (selected !== 'All') {
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

  const handleClear = (e: React.MouseEvent<HTMLInputElement & HTMLSelectElement>) => {
    e.preventDefault()
    setSearch('')
    setSelected('All')
  }

  return (
    <Layout>
      <Heading as='h1'>Does it break a fast?</Heading>

      <form>
        <FormControl>
          <FormLabel htmlFor='search'>Search: </FormLabel>
          <Input
            name='search'
            variant='flushed'
            placeholder='Product name, type, etc.'
            value={search}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='type'>Type: </FormLabel>
          <Select name='type' variant='flushed' value={selected} onChange={handleSelect}>
            <option value='All'>All</option>
            <option value='Common Drinks'>Common Drinks</option>
            <option value='Additions/Condiments'>Additions/Condiments</option>
            <option value='Non-caloric Sweeteners'>Non-caloric Sweeteners</option>
            <option value='Supplements'>Supplements</option>
            <option value='Breath-Freshening Items'>Breath-Freshening Items</option>
          </Select>
        </FormControl>

        <Button type='button' variantColor='pink' variant='outline' onClick={handleClear}>
          Clear
        </Button>
      </form>

      <CardContainer>
        {filteredEntries.map(entry => (
          <Card entry={entry} key={entry.id} />
        ))}
      </CardContainer>
    </Layout>
  )
}

interface Context extends NextPageContext {}

Index.getInitialProps = async (ctx: Context) => {
  const entries = []

  const snapshot = await firestore.collection('entries').get()

  snapshot.forEach(doc => {
    entries.push({ ...doc.data(), id: doc.id })
  })
  return { entries }
}

export default Index
