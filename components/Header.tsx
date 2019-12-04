import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyles = styled.header`
  grid-area: header;

  padding: 16px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

interface Props {}

const Header: React.FC<Props> = () => (
  <HeaderStyles>
    <nav>
      <span>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </span>

      <span>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </span>
    </nav>
  </HeaderStyles>
)

export default Header
