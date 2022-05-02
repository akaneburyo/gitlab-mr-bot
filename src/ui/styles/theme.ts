import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
  main: 'Roboto',
}

const theme = extendTheme({
  colors,
  fonts,
  components: {
    Input: {
      defaultProps: {
        variant: 'flushed',
        focusBorderColor: 'teal.400',
      },
    },
    Button: {
      defaultProps: { variant: 'outline', colorScheme: 'teal' },
    },
  },
})

export default theme
