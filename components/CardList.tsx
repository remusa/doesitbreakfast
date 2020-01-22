import { Flex } from '@chakra-ui/core'
import React from 'react'
import Card, { IEntry } from './Card'

interface Props {
  entries: IEntry[]
}

const CardList: React.FC<Props> = ({ entries }) => {
  return (
    <Flex
      flexDirection='row'
      wrap='wrap'
      justifyContent='center'
      alignItems='center'
      mt={8}
    >
      {entries.map(entry => (
        <Card entry={entry} key={entry.id} />
      ))}
    </Flex>
  )
}

export default CardList
