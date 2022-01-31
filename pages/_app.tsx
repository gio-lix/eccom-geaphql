import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../lib/apollo";
import {StoreProvider} from "../context/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={apolloClient}>
          <StoreProvider>
              <Component {...pageProps} />
          </StoreProvider>
      </ApolloProvider>
  )
}

export default MyApp
