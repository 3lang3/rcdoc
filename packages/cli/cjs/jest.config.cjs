const { join } = require('path');
const { existsSync } = require('fs');
const { ROOT } = require('./shared.cjs');

const BABEL_CONFIG_FILE = join(__dirname, 'babel.config.cjs');
const JEST_FILE_MOCK_FILE = join(__dirname, 'jest.file-mock.cjs');
const JEST_STYLE_MOCK_FILE = join(__dirname, 'jest.style-mock.cjs');

const DEFAULT_CONFIG = {
  // verbose: true,
  transform: {
    '\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: BABEL_CONFIG_FILE }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|styl)$': JEST_STYLE_MOCK_FILE,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      JEST_FILE_MOCK_FILE,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '_site', 'site'],
  transformIgnorePatterns: ['/node_modules/(?!(@rcdoc/cli))/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/demo/**'],
  coverageDirectory: './tests/coverage',
};

function readRootConfig() {
  const ROOT_CONFIG_PATH = join(ROOT, 'jest.config.js');

  if (existsSync(ROOT_CONFIG_PATH)) {
    return require(ROOT_CONFIG_PATH);
  }

  return {};
}

module.exports = {
  ...DEFAULT_CONFIG,
  ...readRootConfig(),
};
