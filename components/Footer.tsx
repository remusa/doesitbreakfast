import { Flex } from '@chakra-ui/core'

interface Props {}

const Footer: React.FC<Props> = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Flex
      as='footer'
      paddingX='1.5rem'
      paddingY='1rem'
      justifyContent='space-between'
      align-items='center'
    >
      <p>Copyright © RMS 2020.</p>
      {/* <Toggle isOn={theme === 'dark'} handleToggle={toggleTheme} /> */}
    </Flex>
  )
}

export default Footer
