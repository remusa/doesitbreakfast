import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto minmax(auto, 1fr) auto;
  grid-template-areas: 'header' 'main' 'footer';

  height: 100vh;
  width: 100%;

  main {
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
  }
`

interface Props {
  title?: string
}

const Layout: React.FC<Props> = props => {
  return (
    <StyledLayout>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </StyledLayout>
  )
}

export default Layout
