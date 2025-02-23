'use client'

import type { NormalizedCacheObject } from '@apollo/client'

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import React from 'react'

import { createHttpLink } from './link.ts'

export function ApolloWrapper({
  children,
  cookie,
}: {
  children: React.ReactNode
  cookie?: null | string
}) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(cookie)}>{children}</ApolloNextAppProvider>
  )
}

function makeClient(cookie?: null | string): ApolloClient<NormalizedCacheObject> {
  const token = cookie && `Bearer ${cookie}`

  const httpLink = createHttpLink(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, token)

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}
