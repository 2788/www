module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // 先收集这些吧，components / pages 先不管，后续给它们加单测的话再收集
  collectCoverageFrom: [
    'apis/**/*.(ts|tsx)',
    'hooks/**/*.(ts|tsx)',
    'utils/**/*.(ts|tsx)'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  setupFiles: [
    '<rootDir>/jest.setup.js'
  ],
  moduleDirectories: ['node_modules', './']
}
