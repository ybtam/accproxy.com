import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

import { auth } from '../auth'
import { apolloClient } from './client.ts'

export const { getClient } = registerApolloClient(async () => {
  const session = await auth()

  return apolloClient(session?.user?.token)
})
