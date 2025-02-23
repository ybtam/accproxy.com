import { GraphQLObjectType, GraphQLSchema } from 'graphql/type'

import * as FileMutations from '../resolvers/file/mutations'
import * as FileQuery from '../resolvers/file/query'
import * as UserAuthMutations from '../resolvers/user/auth/mutation'
import * as UserAuthQuery from '../resolvers/user/auth/query'
import {entities, inputs, mutations, queries} from './drizzle-schema'
import { FileScalar } from './scalars'
import {Maybe} from "@envelop/types";
import {GraphQLFieldConfig, ThunkObjMap} from "graphql/type/definition";

const types = [...Object.values(entities.types), ...Object.values(inputs), FileScalar]

const schemaBuilder = <TSource, TContext>(props: {mutations: ThunkObjMap<GraphQLFieldConfig<TSource, TContext>>, queries: ThunkObjMap<GraphQLFieldConfig<TSource, TContext>> }) => new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: props.mutations,
    name: 'Mutation',
  }),
  query: new GraphQLObjectType({
    fields: props.queries,
    name: 'Query',
  }),
  types
})

const authSchema = {
  mutations: {
    ...FileMutations,
    ...FileQuery,
    ...mutations,
  },
  queries: {
    ...UserAuthQuery,
    ...queries,
  }
}

const publicSchema = {
  mutations: {
    ...UserAuthMutations,
  },
  queries: {
    ...UserAuthQuery,
  }
}

export function getSchema(context: Maybe<{
  jwt?: object,
  req?: { headers?: { [key: string]: string } }
}>): GraphQLSchema {
  if (
    context?.req?.headers?.['developer-token'] === process.env.DEV_TOKEN
  ) {
    return schemaBuilder({
      mutations: {
        ...authSchema.mutations,
        ...publicSchema.mutations,
      },
      queries: {
        ...authSchema.queries,
        ...publicSchema.queries,
      }
    })
  }

  if (context?.jwt) {
    return schemaBuilder(authSchema)
  }

  return schemaBuilder(publicSchema)
}
