module.exports = {
  ...require('config/eslint-frontend'),
  rules: {
    ...require('config/eslint-frontend').rules,
    // Typescript
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
