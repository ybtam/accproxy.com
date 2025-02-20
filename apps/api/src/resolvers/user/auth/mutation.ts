import { db, users } from '@apps/db'
import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql/error/index.js'
import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type'
import jwt from 'jsonwebtoken'

import { inputs } from '../../../utils/drizzle-schema.ts'
import { gqlUserType } from './outputs.ts'
import { hashPassword, validatePassword } from './utlis.ts'

export const login: GraphQLFieldConfig<any, any, { values: { email: string; password: string } }> =
  {
    args: {
      values: {
        type: new GraphQLNonNull(
          new GraphQLInputObjectType({
            fields: {
              email: { type: new GraphQLNonNull(GraphQLString) },
              password: { type: new GraphQLNonNull(GraphQLString) },
            },
            name: 'LoginInput',
          }),
        ),
      },
    },
    resolve: async (_, { values }) => {
      const selectUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, values.email))
        .execute()

      if (!selectUsers.length) {
        throw new GraphQLError('Invalid email or password')
      }

      const user = selectUsers[0]

      if (!(await validatePassword(values.password, user.password))) {
        throw new GraphQLError('Invalid email or password')
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN as string, {
        issuer: 'qms.pawpaw.tech', //todo move it to env
        subject: 'user',
      })

      return {
        ...user,
        token,
      }
    },
    type: gqlUserType('LoginOutput'),
  }

export const register: GraphQLFieldConfig<any, any, { values: typeof users.$inferInsert }> = {
  args: {
    values: {
      type: inputs.UsersInsertInput,
    },
  },
  resolve: async (_, { values }) => {
    const user = await db.select().from(users).where(eq(users.email, values.email)).execute()

    if (user.length) {
      throw new GraphQLError('Email already exists')
    }

    const newUser = (
      await db
        .insert(users)
        .values({
          ...values,
          password: await hashPassword(values.password),
        })
        .returning()
    )[0]

    if (!newUser) {
      throw new GraphQLError('Error creating users')
    }

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_TOKEN as string, {
      issuer: 'qms.pawpaw.tech',
      subject: 'user',
    })

    return {
      ...newUser,
      token,
    }
  },
  type: gqlUserType('RegisterOutput'),
}
