import ReactConfig from "./react.js";
import { FlatCompat } from '@eslint/eslintrc'
import pluginNext from "@next/eslint-plugin-next";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...ReactConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  // ...compat.config({
  //   extends: ['next/core-web-vitals', 'next/typescript'],
  //   rules: {
  //     'react-hooks/exhaustive-deps': 'off',
  //   },
  //   settings: {
  //     next: {
  //       rootDir: ['apps/*/']
  //     }
  //   }
  // })
]
