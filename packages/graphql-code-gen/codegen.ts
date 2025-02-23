import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {

  ignoreNoDocuments: true,
  generates: {
    './schema.graphql': {
      schema: [{
        'http://localhost:4000/graphql': {
          headers: {
            'developer-token': process.env.DEV_TOKEN ?? ''
          }
        }
      }],
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      },
    },
    'src/': {
      schema: './schema.graphql',
      preset: 'client',
      documents: [
          '../../apps/**/web/src/**/*.tsx',
          '../../apps/**/web/src/**/*.ts',
          '../sdk/src/**/*.ts',
          '../sdk/src/**/*.tsx',
      ]
    },
  }
}
export default config
