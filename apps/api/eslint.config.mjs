import baseConfig from '@repo/config-eslint/base.js'

export default [
  ...baseConfig,
  {
    ignores: ['node_modules', 'build', 'postcss.config.js'],
  },
]
