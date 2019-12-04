import { createContext } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import useDarkMode from '../../hooks/useDarkMode'
import { darkTheme, GlobalStyle, lightTheme } from './theme'

interface IContext {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IContext)

interface IProps {
  children: HTMLElement
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode()
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  if (!componentMounted) {
    return <div />
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={currentTheme}>
        <>
          <GlobalStyle />
          {children}
        </>
      </StyledProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
