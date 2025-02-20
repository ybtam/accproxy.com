import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql/type'

export const gqlUserType = (name: string) =>
  new GraphQLObjectType({
    fields: {
      email: { type: GraphQLString },
      firstName: { type: GraphQLString },
      id: { type: GraphQLInt },
      lastName: { type: GraphQLString },
      token: { type: GraphQLString },
    },
    name,
  })
