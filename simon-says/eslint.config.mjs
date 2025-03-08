import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "no-console": "off",
    },
  },
  pluginJs.configs.recommended,
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "eslint.validate": ["javascript"],
  },
];