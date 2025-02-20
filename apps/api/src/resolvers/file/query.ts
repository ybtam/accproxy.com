import { db, media } from '@apps/db'
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
    media: {
      id: number
    }
  }
> = {
  args: {
    media: {
      type: new GraphQLNonNull(
        new GraphQLInputObjectType({
          fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
          },
          name: 'MediaIdInput',
        }),
      ),
    },
  },
  resolve: async (_, { media: { id } }, context) => {
    const selectMedia = await db.select().from(media).where(eq(media.id, id)).execute()
    if (!selectMedia.length) {
      throw new Error('Media not found')
    }

    return await minIoHandler.presignURL(selectMedia[0].url)
  },
  type: GraphQLString,
}
