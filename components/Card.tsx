import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

const CardStyles = styled.div`
  width: 250px;
  height: 250px;
  overflow-y: scroll;
  border-radius: 3px;
  box-shadow: 0 15px 25px 0 grey;
  margin: 8px;
  padding: 8px;
  text-align: center;
  cursor: pointer;

  .name {
    font-weight: bold;
  }

  .type {
    font-style: italic;
  }

  .breaks-fast {
    text-transform: upperacse;
  }

  .description {
  }
`

export interface IEntry {
  id: string
  name: string
  type: string
  breaks: string
  description: string
  sources?: string[] | string
}

export interface IProps {
  entry: IEntry
}

const Card: React.FC<IProps> = ({ entry }) => {
  return (
    <Link href='/product/[id]' as={`/product/${entry.id}`}>
      <CardStyles key={entry.id}>
        <h3 className='name'>{entry.name}</h3>
        <p className='type'>Type: {entry.type}</p>
        <p>
          Breaks fast:
          <span className='breaks-fast'> {entry.breaks}</span>
        </p>
        <p>Description: {entry.description}</p>
      </CardStyles>
    </Link>
  )
}

export default Card
