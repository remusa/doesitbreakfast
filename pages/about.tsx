import { Flex, Heading, Text } from '@chakra-ui/core'
import { NextPage } from 'next'
import Layout from '../components/Layout'

const About: NextPage = () => {
  return (
    <Layout>
      <Flex maxW={800} flexDirection='column'>
        <Heading as='h1' textAlign='center' mb={8}>
          About page
        </Heading>
        <Text>
          Consequatur illum maxime aliquam nam. Dolorem molestiae qui ad ut ut quisquam fugiat
          doloribus voluptatem. Fuga dignissimos nesciunt quasi non minus sed consequatur esse.
        </Text>
        <Text>
          Cum quia explicabo. Adipisci consequuntur laborum. Excepturi est quasi est sunt animi
          praesentium blanditiis. Tempore ut itaque asperiores. Quo similique id culpa.
        </Text>
        <Text>
          Voluptatibus iste minus nulla quis voluptas. Laboriosam sunt sed vitae perspiciatis
          molestiae quia.
        </Text>
        <Text>
          Est magni magnam maxime voluptatem labore fugiat tenetur deleniti ut. Maxime consequatur
          praesentium voluptatem. Atque earum voluptatem unde omnis officia incidunt cum facere.
          Animi quibusdam aut consequuntur a consequatur.
        </Text>
      </Flex>
    </Layout>
  )
}

export default About
