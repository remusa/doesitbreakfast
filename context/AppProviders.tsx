import React from 'react'
import { ThemeProvider } from './Theme/ThemeContext'

interface Props {
  children: HTMLElement | any
}

const AppProviders: React.FC<Props> = ({ children }) => <ThemeProvider>{children}</ThemeProvider>

export default AppProviders
