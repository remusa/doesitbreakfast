import 'isomorphic-fetch'
import { NextPage, NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { GET_DATA } from '../lib/db'

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
`

interface IProps {
  entries: any
}

const Index: NextPage<IProps> = ({ entries }) => {
  const [search, setSearch] = useState<string>('')
  const [filteredEntries, setFilteredEntries] = useState(entries)
  const [selected, setSelected] = useState('All')

  useEffect(() => {
    let filtered

    if (selected !== 'All') {
      filtered = entries.filter(
        entry =>
          entry.name.toLowerCase().includes(search.toLowerCase()) &&
          entry.description.toLowerCase().includes(search.toLowerCase()) &&
          entry.type.toLowerCase() === selected.toLowerCase()
      )
    } else {
      filtered = entries
    }

    setFilteredEntries(filtered)
  }, [search, selected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.name === 'search') {
      setSearch(e.target.value)
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    setSelected(e.target.value)
  }

  const handleClear = (e: React.MouseEvent<HTMLInputElement & HTMLSelectElement>) => {
    setSearch('')
    setSelected('All')
  }

  return (
    <Layout>
      <h1>Does it break a fast?</h1>

      <form>
        <label htmlFor='search'>Search...</label>
        <input
          name='search'
          placeholder='Drink, additive, condiment, supplement, etc.'
          onChange={handleChange}
        />
        <button type='button' onClick={handleClear}>
          Clear
        </button>

        <div>
          <label htmlFor='type'>Type: </label>
          <select name='type' value={selected} onChange={handleSelect}>
            <option value='All'>All</option>
            <option value='Common Drinks'>Common Drinks</option>
            <option value='Additions/Condiments'>Additions/Condiments</option>
            <option value='Non-caloric Sweeteners'>Non-caloric Sweeteners</option>
            <option value='Supplements'>Supplements</option>
            <option value='Breath-Freshening Items'>Breath-Freshening Items</option>
          </select>
        </div>
      </form>

      <CardContainer>
        {filteredEntries.map(entry => (
          <Card entry={entry} key={entry.name} />
        ))}
      </CardContainer>
    </Layout>
  )
}

interface Context extends NextPageContext {}

Index.getInitialProps = async (ctx: Context) => {
  const entries = await GET_DATA()
  return { entries }
}

export default Index
