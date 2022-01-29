module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  rules: {
    // Typescript
    '@typescript-eslint/explicit-function-return-type': 'error',
    'import/prefer-default-export': 'off',

    // disabled until they support the specific value pattern ex : text-color-opacity-[63%]
    'tailwindcss/no-custom-classname': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    // react
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
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
  overrides: [
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          'off',
          { devDependencies: ['**/?(*.)+(spec|test).[jt]s?(x)'] },
        ],
      },
    },
  ],
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
}
