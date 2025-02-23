import { ApolloError } from '@apollo/client'
import { graphql } from '@repo/graphql-code-gen'
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import 'next-auth/jwt'

import { apolloClient } from '../graphql'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id?: string
      token?: null | string
    }
  }

  interface User {
    firstName?: null | string
    id?: string
    token?: null | string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: null | string
    userId?: string
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token
        token.userId = user.id
      }

      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
          token: token.token,
        },
      }
    },
  },
  providers: [
    Credentials({
      authorize: async credentials => {
        const client = apolloClient()

        try {
          const { data } = await client.mutate({
            mutation: graphql(`
              mutation Login($values: LoginInput!) {
                login(values: $values) {
                  id
                  firstName
                  token
                  email
                }
              }
            `),
            variables: {
              values: {
                email: credentials.email as string,
                password: credentials.password as string,
              },
            },
          })

          return data?.login
            ? {
                ...data?.login,
                id: `${data?.login?.id}`,
              }
            : null
        } catch (error) {
          if (error instanceof ApolloError) {
            console.log(error)
          }
          return null
        }
      },
      credentials: {
        email: {},
        password: {},
        role: {},
      },
    }),
  ],
})
