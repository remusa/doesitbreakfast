import React from 'react'
import styled from 'styled-components'

const CardStyles = styled.div`
  width: 250px;
  height: 300px;
  overflow-y: scroll;
  border-radius: 3px;
  box-shadow: 0 15px 25px 0 grey;
  margin: 8px;

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

interface Props {
  entry: {
    id: string
    name: string
    type: string
    breaks_fast: string
    description: string
  }
}

const Card: React.FC<Props> = ({ entry }) => {
  return (
    <CardStyles key={entry.id}>
      <p>
        Name:<span className='name'> {entry.name}</span>
      </p>

      <p className='type'>Type: {entry.type}</p>

      <p>
        Breaks fast:
        <span className='breaks-fast'> {entry.breaks_fast}</span>
      </p>

      <p className='description'>Description: {entry.description}</p>
    </CardStyles>
  )
}

export default Card
