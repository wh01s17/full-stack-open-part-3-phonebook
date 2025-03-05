import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/dist/**/*", "**/node_modules/**/*"],
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
    plugins: { stylistic },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/linebreak-style": ["error", "unix"],
      "stylistic/quotes": ["error", "single"],
      "stylistic/semi": ["error", "never"],
    },
  },
  pluginJs.configs.recommended,
];
