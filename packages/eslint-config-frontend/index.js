module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'next',
    'turbo',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [...require('eslint-configs/eslint-base.js').plugins],
  settings: {
    ...require('eslint-configs/eslint-base.js').settings,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    ...require('eslint-configs/eslint-base.js').rules,
    // common-rules
    'no-param-reassign': 'off',

    // react
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-props-no-spreading': ['warn', { html: 'ignore' }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    // next
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off',
  },
  overrides: require('eslint-configs/eslint-base.js').overrides,
  ignorePatterns: require('eslint-configs/eslint-base.js').ignorePatterns,
}
