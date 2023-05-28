module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  transform: {
    '^.+\\.ts$': 'esbuild-jest',
    '^.+\\.js$': 'esbuild-jest',
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
}
