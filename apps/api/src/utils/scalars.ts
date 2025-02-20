import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'

export const FileScalar = new GraphQLScalarType({
  description: 'Custom scalar to handle file uploads',
  name: 'File',

  // parseLiteral is not useful for file uploads because they are sent as form-data, not literals.
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error('Upload scalar can only parse string values.')
    }
    return null // Not applicable for file uploads
  },

  // This parseValue function is where you would handle the incoming file
  parseValue(value: any) {
    if (typeof value !== 'object') {
      throw new Error('Upload scalar requires a file object')
    }
    return value // File object with properties like filename, mimetype, createReadStream, etc.
  },

  // serialize is not required for file uploads as we are only processing the incoming value
  serialize() {
    throw new Error('Upload scalar serialization is not supported.')
  },
})
