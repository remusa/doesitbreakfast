import { Flex, Text } from '@chakra-ui/core'

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
      <Flex w={150} justify='space-between' flexShrink={0}>
        <Text>Built with </Text>
        <Text color='error'> ❤ </Text>
        <Text>by </Text>
        <Text>
          <a
            href='https://renems.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            RMS
          </a>
        </Text>
        {/* <p>Copyright © RMS 2020.</p> */}
        {/* <Toggle isOn={theme === 'dark'} handleToggle={toggleTheme} /> */}
      </Flex>
    </Flex>
  )
}

export default Footer
