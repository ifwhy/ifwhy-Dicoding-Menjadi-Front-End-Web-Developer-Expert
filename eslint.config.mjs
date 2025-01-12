import globals from 'globals';
import daStyle from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  daStyle,
  {
    rules: {
      'semi': ['error', 'always'],
    },
  }
];
