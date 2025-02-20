import BaseConfig from "./base.js";
import reactCompiler from "eslint-plugin-react-compiler";
import reactPlugin from "eslint-plugin-react";

export default [
  ...BaseConfig,
  reactCompiler.configs.recommended,
  {
    rules: {
      'react-compiler/react-compiler': "warn",
    }
  }
  // {
  //   ...reactPlugin.configs.flat.recommended,
  // },
  // reactPlugin.configs.flat['jsx-runtime']
]
