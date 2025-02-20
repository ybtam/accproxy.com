import nextjsConfig from '@repo/config-eslint/next.js'

export default [
  ...nextjsConfig,
  {
    ignores: ['node_modules', 'build', 'postcss.config.js'],
  },
]
