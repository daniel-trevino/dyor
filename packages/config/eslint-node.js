module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [...require('./eslint-base').plugins],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    ...require('./eslint-base').settings,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  rules: {
    ...require('./eslint-base').rules,
  },
  overrides: require('./eslint-base').overrides,
  ignorePatterns: require('./eslint-base').ignorePatterns,
}
