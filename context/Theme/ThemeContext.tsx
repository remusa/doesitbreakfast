import { CSSReset, theme, ThemeProvider as ChakraThemeProvider } from '@chakra-ui/core'
import { createContext } from 'react'

interface IContext {
  theme: any
  // toggleTheme: () => void
}

const ThemeContext = createContext({} as IContext)

interface IProps {
  children: HTMLElement
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <>
        <CSSReset />
        {children}
      </>
    </ChakraThemeProvider>
  )
}

export { ThemeContext, ThemeProvider }
