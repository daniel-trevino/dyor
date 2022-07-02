module.exports = {
  ...require('./jest-common'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  coveragePathIgnorePatterns: [],
}
