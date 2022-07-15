import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  transform: {
    '^.+.(ts)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.ts',
    '!src/main.ts',
    '!**/*.enum.ts',
    '!**/*.interface.ts',
    '!**/*.module.ts',
  ],
  testPathIgnorePatterns: ['node_modules'],
  coveragePathIgnorePatterns: ['node_modules'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  coverageReporters: ['text', 'lcov'],
  reporters: ['default'],
};

export default jestConfig;
