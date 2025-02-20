import { db } from '@apps/db'
import { buildSchema } from 'drizzle-graphql'

export const { entities } = buildSchema(db, {
  relationsDepthLimit: 1,
})

export const inputs = entities.inputs

export const {...mutations } = entities.mutations

export const { ...queries } = entities.queries
