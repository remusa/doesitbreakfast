import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../context/Theme/ThemeContext'
import Toggle from '../context/Theme/Toggle'

const FooterStyles = styled.div`
  grid-area: footer;

  padding: 1rem 1.5rem;

  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }
`

interface Props {}

const Footer: React.FC<Props> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <FooterStyles>
      <footer>
        <p>Copyright © RMS 2019.</p>
        <Toggle isOn={theme === 'dark'} handleToggle={toggleTheme} />
      </footer>
    </FooterStyles>
  )
}

export default Footer
