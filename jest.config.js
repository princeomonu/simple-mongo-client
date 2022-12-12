// const ts_preset = require('ts-jest/jest-preset')
// const jest_mongodb = require('@shelf/jest-mongodb')
const { defaults: tsjPreset } = require('ts-jest/presets')
module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/'],    
    transform: tsjPreset.transform,
    rootDir: './test',
    roots: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    coverageDirectory: './coverage',
  };
  