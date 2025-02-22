import { db, files } from '@apps/db'
import { eq } from 'drizzle-orm'
import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql/type'

import { MinIoHandler } from './_utils/minio-handler.ts'

const minIoHandler = new MinIoHandler()

export const generatePresignedURL: GraphQLFieldConfig<
  any,
  any,
  {
    file: {
      id: number
    }
  }
> = {
  args: {
    file: {
      type: new GraphQLNonNull(
        new GraphQLInputObjectType({
          fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
          },
          name: 'FileIdInput',
        }),
      ),
    },
  },
  resolve: async (_, { file: { id } }, context) => {
    const selectedFile = await db.select().from(files).where(eq(files.id, id)).execute()
    if (!selectedFile.length) {
      throw new Error('Media not found')
    }

    return ''

    //todo
    // return await minIoHandler.presignURL(selectMedia[0].file)
  },
  type: GraphQLString,
}
