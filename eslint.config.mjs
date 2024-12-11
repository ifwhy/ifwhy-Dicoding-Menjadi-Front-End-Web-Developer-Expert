import globals from "globals";
import daStyle from "da-style";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  daStyle,

  {
    rules: {
      "semi": ["error", "always"],
    },
  }
];