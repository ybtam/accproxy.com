import { ApolloClient, InMemoryCache } from '@apollo/client'

import { createHttpLink } from './link.ts'

export const apolloClient = (cookie?: null | string) => {
  const token = cookie && `Bearer ${cookie}`

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink(process.env.GRAPHQL_ENDPOINT!, token),
  })
}
