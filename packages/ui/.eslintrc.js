module.exports = {
  ...require('config/eslint-next'),
  rules: {
    ...require('config/eslint-next').rules,
    // Typescript
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
