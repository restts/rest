export default {
  displayName: 'monads',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/monads',
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text'],
  collectCoverageFrom: [
    '<rootDir>/src/lib/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
