import { match, max, matchNameAndKeywords } from './match'

describe('match', () => {
  it('should work well', () => {
    expect(match('', '')).toBe(true)
    expect(match('abc', '')).toBe(true)
    expect(match('abc', 'a')).toBe(true)
    expect(match('abc', 'abc')).toBe(true)
    expect(match('abc', 'abcd')).toBe(false)
    expect(match('', 'abcd')).toBe(false)
    expect(match('对象存储', '存储')).toBe(true)
    expect(match('存储', '对象存储')).toBe(false)
  })
  it('should work case-insensitively', () => {
    expect(match('ABC', 'a')).toBe(true)
    expect(match('abc', 'A')).toBe(true)
    expect(match('Abc', 'aBC')).toBe(true)
  })
})

describe('max', () => {
  it('should work well', () => {
    expect(max([1, 2, 5, 4, 3], v => v)).toBe(5)
    expect(max([1, 2, 5, 4, 3], v => v)).toBe(5)
    expect(max(['abc', 'a', 'abcde', 'bc'], v => v.length)).toBe('abcde')
  })
})

describe('matchNameAndKeywords', () => {
  const input = 'abcd'
  const notMatched = { name: 'abcde', keywords: ['abcdef'] }
  const nameMatched = { name: 'abc', keywords: ['foo'] }
  const keywordsMatched = { name: 'bar', keywords: ['abc'] }
  const nameFullyMatched = { name: 'abcd', keywords: ['bar'] }
  const keywordsFullyMatched = { name: 'foo', keywords: ['abcd'] }
  it('should work well', () => {
    expect(matchNameAndKeywords(input, [])).toBe(undefined)
    expect(matchNameAndKeywords(input, [notMatched])).toBe(undefined)
    expect(matchNameAndKeywords(input, [nameMatched])).toMatchObject(nameMatched)
    expect(matchNameAndKeywords(input, [keywordsMatched])).toMatchObject(keywordsMatched)
    expect(matchNameAndKeywords(input, [nameMatched, nameFullyMatched])).toMatchObject(nameFullyMatched)
    expect(matchNameAndKeywords(input, [keywordsMatched, keywordsFullyMatched])).toMatchObject(keywordsFullyMatched)
    expect(matchNameAndKeywords(input, [nameMatched, keywordsFullyMatched])).toMatchObject(keywordsFullyMatched)
    expect(matchNameAndKeywords(input, [
      keywordsMatched,
      nameFullyMatched,
      nameMatched
    ])).toMatchObject(nameFullyMatched)
  })
})
