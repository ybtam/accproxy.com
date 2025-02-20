import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import * as MediaMutations from '../resolvers/file/mutations'
import * as MediaQuery from '../resolvers/file/query'
import * as UserAuthMutations from '../resolvers/user/auth/mutation'
import { me } from '../resolvers/user/auth/query'
import { entities, mutations, queries } from './drizzle-schema'
import { FileScalar } from './scalars'

export default function schemaBuilder(): GraphQLSchema {
  return new GraphQLSchema({
    mutation: new GraphQLObjectType({
      fields: {
        ...UserAuthMutations,
        ...MediaMutations,
        ...MediaQuery,
        ...mutations,
      },
      name: 'Mutation',
    }),
    query: new GraphQLObjectType({
      fields: {
        me,
        ...queries,
      },
      name: 'Query',
    }),
    // todo refine types
    types: [...Object.values(entities.types), ...Object.values(entities.inputs), FileScalar],
  })
}
