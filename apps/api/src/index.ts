import { client } from '@apps/db'
import { createInlineSigningKeyProvider, useJWT } from '@graphql-yoga/plugin-jwt'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import {useSchemaByContext} from '@envelop/core'
import {getSchema} from "./utils/schema-builder";

const bootstrap = async () => {
  await client.connect()

  const yoga = createYoga({
    plugins: [
      useJWT({
        reject: {
          invalidToken: false,
          missingToken: false,
        },
        singingKeyProviders: [createInlineSigningKeyProvider(process.env.JWT_TOKEN!)],
        tokenVerification: {
          algorithms: ['HS256'],
          issuer: process.env.TOKEN_ISSUER,
        },
      }),
      useSchemaByContext(getSchema)
    ],
  })
  const server = createServer(yoga)

  server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql')
  })
}

bootstrap()
