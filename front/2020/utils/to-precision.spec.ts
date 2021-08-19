import toPrecision from './to-precision'

describe('decimal-precision', () => {
  it('should work well', () => {
    expect(toPrecision(0, 2)).toBe('0.00')
    expect(toPrecision(12, 2)).toBe('12.00')
    expect(toPrecision(12.1, 2)).toBe('12.10')
    expect(toPrecision(1.333, 2)).toBe('1.33')
    expect(toPrecision(1.005, 2)).toBe('1.00')
    expect(toPrecision(undefined, 2)).toBe('0.00')
    expect(toPrecision(null, 2)).toBe('0.00')
    expect(toPrecision(NaN, 2)).toBe('0.00')
  })
})
