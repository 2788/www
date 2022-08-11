/* eslint-disable quote-props */

// you can do test setup here
jest.mock('rc-animate', () => props => props.children)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

process.env = {
  NODE_ENV: 'test',
  WWW_HOST: 'http://www-2020.dev.qiniu.io',
  WWW_SOURCE_HOST: 'http://www-source.dev.qiniu.io',
  ...process.env
}
