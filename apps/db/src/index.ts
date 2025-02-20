import { drizzle } from 'drizzle-orm/node-postgres'

import * as Schemas from './schemas'
import  pg from 'pg'
const { Client } = pg

export const client = new Client({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  user: process.env.DB_USERNAME,
})

export const db = drizzle(client, {
  schema: Schemas
})

export * from './schemas'
