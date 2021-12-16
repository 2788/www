import { isDark } from './color'

describe('isDark', () => {
  it('should work well', () => {
    expect(isDark('ffffff')).toBe(false)
    expect(isDark('#ffffff')).toBe(false)
    expect(isDark('#333333')).toBe(true)
    expect(isDark('#005184')).toBe(true)
  })
})
