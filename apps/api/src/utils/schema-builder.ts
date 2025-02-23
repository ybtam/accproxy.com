import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import * as FileMutations from '../resolvers/file/mutations'
import * as FileQuery from '../resolvers/file/query'
import * as UserAuthMutations from '../resolvers/user/auth/mutation'
import * as UserAuthQuery from '../resolvers/user/auth/query'
import {entities, inputs, mutations, queries} from './drizzle-schema'
import { FileScalar } from './scalars'
import {DefaultContext, Maybe} from "@envelop/types";

const types = [...Object.values(entities.types), ...Object.values(inputs), FileScalar]

export function getSchema(context : Maybe<DefaultContext>): GraphQLSchema {
  if (context?.jwt) {
    return new GraphQLSchema({
      mutation: new GraphQLObjectType({
        fields: {
          ...FileMutations,
          ...FileQuery,
          ...mutations,
        },
        name: 'Mutation',
      }),
      query: new GraphQLObjectType({
        fields: {
          ...UserAuthQuery,
          ...queries,
        },
        name: 'Query',
      }),
      types
    })
  }

  return new GraphQLSchema({
    mutation: new GraphQLObjectType({
      fields: {
        ...UserAuthMutations,
      },
      name: 'Mutation',
    }),
    query: new GraphQLObjectType({
      fields: {
        ...UserAuthQuery
      },
      name: 'Query',
    }),
    types
  })
}
