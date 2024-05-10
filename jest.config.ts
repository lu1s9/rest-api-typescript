import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    detectOpenHandles: true,
    maxWorkers: 1,

    verbose: true,
    forceExit: true,
    resetMocks: true,
    restoreMocks: true,
    clearMocks: true
};

export default config;
