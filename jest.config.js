/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/repo/users/users.mongo.model.ts',
    'src/app.ts',
    'src/index.ts',
    'src/router/user.router.ts',
  ],
};
