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
    'plugin:tailwindcss/recommended',
  ],
  plugins: [...require('eslint-configs/eslint-base.js').plugins, 'tailwindcss'],
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
    'react/button-has-type': 'off',

    // next
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off',

    // tailwindcss
    'tailwindcss/classnames-order': [
      'warn',
      {
        callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
      },
    ],
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
  },
  overrides: require('eslint-configs/eslint-base.js').overrides,
  ignorePatterns: require('eslint-configs/eslint-base.js').ignorePatterns,
}
