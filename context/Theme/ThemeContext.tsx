import {
  CSSReset,
  theme,
  ThemeProvider as ChakraThemeProvider,
} from '@chakra-ui/core'
import { css, Global } from '@emotion/core'
import { createContext } from 'react'

interface IContext {
  theme: any
  // toggleTheme: () => void
}

const ThemeContext = createContext({} as IContext)

interface IProps {
  children: any
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <>
        <CSSReset />
        <Global
          styles={css`
            /* @import url('https://fonts.googleapis.com/css?family=Barlow&display=swap');
            @import url('../../public/Barlow-Regular.woff2');
            @font-face {
              font-family: 'Barlow';
              src: url('../../public/Barlow-Regular.woff2') format('woff2');
              font-weight: normal;
              font-style: normal;
            } */
          `}
        />
        {children}
      </>
    </ChakraThemeProvider>
  )
}

export { ThemeContext, ThemeProvider }
