/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  coverageDirectory: '../coverage',
  verbose: true,
  globalSetup: './tests/setup/jest.setup.ts',
  globalTeardown: './tests/teardown/jest.teardown.ts',
  setupFilesAfterEnv: [
    './tests/setupAfterEnv.ts',
  ]
};
