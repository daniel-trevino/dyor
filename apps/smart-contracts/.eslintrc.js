module.exports = {
  ...require('config/eslint-node'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    indent: 'off',
  },
}
