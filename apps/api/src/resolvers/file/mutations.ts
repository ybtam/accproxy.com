import { db, files } from '@apps/db'
import { GraphQLFieldConfig } from 'graphql/type'
import path from 'node:path'
import sharp from 'sharp'

import { entities } from '../../utils/drizzle-schema.ts'
import { FileScalar } from '../../utils/scalars.ts'
import { MinIoHandler } from './_utils/minio-handler.ts'

const minIoHandler = new MinIoHandler()

export const uploadFile: GraphQLFieldConfig<any, any, { file: File }> = {
  args: {
    file: {
      type: FileScalar,
    },
  },
  resolve: async (_, { file }, context) => {
    return {}
  },
  type: entities.types.FilesItem,
}
