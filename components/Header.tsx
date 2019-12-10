import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyles = styled.header`
  grid-area: header;

  padding: 16px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      justify-content: space-between;

      & > a {
        flex: 1 1 auto;
        min-width: 50px;
      }
    }
  }
`

interface Props {}

const Header: React.FC<Props> = () => (
  <HeaderStyles>
    <nav>
      <div className='left'>
        <Link href='/'>
          <a>Home</a>
        </Link>

        <Link href='/submit'>
          <a>Submit food</a>
        </Link>
      </div>

      <div className='right'>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </div>
    </nav>
  </HeaderStyles>
)

export default Header
