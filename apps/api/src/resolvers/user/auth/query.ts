import { db, users } from '@apps/db'
//todo figure out jwt stuff
import { eq } from 'drizzle-orm'
import { GraphQLFieldConfig, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql/type'

import { Context, JwtContext } from '../../../interfaces/jwt.ts'

export const me: GraphQLFieldConfig<any, Context> = {
  resolve: async (source, args, { jwt }) => {
    if (!jwt?.payload?.userId) {
      return undefined
    }

    const selectUsers = await db
      .select({
        email: users.email,
        firstName: users.firstName,
        id: users.id,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.id, jwt.payload.userId))
      .execute()

    if (!selectUsers.length) {
      return undefined
    }

    return selectUsers[0]
  },
  type: new GraphQLObjectType({
    fields: {
      email: { type: GraphQLString },
      firstName: { type: GraphQLString },
      id: { type: GraphQLInt },
      lastName: { type: GraphQLString },
    },
    name: 'Me',
  }),
}
