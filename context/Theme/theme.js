import { createGlobalStyle } from 'styled-components'

export const defaultTheme = {
  white: '#fff',
  black: '#000',
}

export const lightTheme = {
  ...defaultTheme,

  background: defaultTheme.white,
  font: defaultTheme.black,
}

export const darkTheme = {
  ...defaultTheme,

  background: defaultTheme.black,
  font: defaultTheme.white,
}

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Barlow&display=swap');

    html {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        transition: all 0.3s linear;
        height: 100vh;
        /* align-items: center; */
        margin: 0;
        padding: 0;
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.font};
        font-family: "Barlow", 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 2;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body > * {
        color: ${props => props.theme.colorFont};
    }

    h1, h2, h3, h4, h5, h6 {
        /* font-family: 'Barlow', sans-serif; */
        cursor: default;
    }

    button {
        outline: none;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    p {
        text-align: center;
    }
`
