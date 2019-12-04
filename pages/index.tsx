import 'isomorphic-fetch'
import { NextPage, NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

interface IProps {
  stories: any
}

const Index: NextPage<IProps> = ({ stories }) => {
  const [search, setSearch] = useState<string>('')
  const [filteredStories, setFilteredStories] = useState(stories)

  useEffect(() => {
    const filtered = stories.filter(story => story.title.toLowerCase().includes(search))

    setFilteredStories(filtered)
  }, [search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleClear = (e: React.MouseEvent<HTMLInputElement>) => {
    setSearch('')
  }

  return (
    <Layout>
      <h1>Does it break a fast?</h1>

      <label htmlFor='search'>Search food</label>
      <input name='search' placeholder='Food, drink, supplement, etc.' onChange={handleChange} />
      <button type='button' onClick={handleClear}>
        Clear
      </button>

      <ul>
        {filteredStories.map(story => (
          <li key={story.title}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

interface Context extends NextPageContext {}

Index.getInitialProps = async (ctx: Context) => {
  const res = await fetch(`https://api.hackerwebapp.com/news`)
  const stories = await res.json()
  return { stories }
}

export default Index
