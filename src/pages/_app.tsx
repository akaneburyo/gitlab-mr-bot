import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import 'ui/styles/globals.css'
import theme from 'ui/styles/theme'

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default app
