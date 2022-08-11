/**
 * @file uts of url utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { startsWithPath } from './url'

describe('startsWithPath', () => {
  it('should work well', () => {
    expect(startsWithPath('ab', 'abcd')).toBeFalsy()
    expect(startsWithPath('abcd', 'ab')).toBeFalsy()
    expect(startsWithPath('ab-cd', 'ab')).toBeFalsy()

    expect(startsWithPath('a', 'a')).toBeTruthy()
    expect(startsWithPath('a/bc', 'a')).toBeTruthy()
    expect(startsWithPath('a/bc', '/a')).toBeTruthy()
    expect(startsWithPath('a/bc', 'a/')).toBeTruthy()
    expect(startsWithPath('a/bc', '/a/')).toBeTruthy()
    expect(startsWithPath('/a/bc', 'a')).toBeTruthy()
    expect(startsWithPath('/a/bc', '/a')).toBeTruthy()
    expect(startsWithPath('/a/bc', 'a/')).toBeTruthy()
    expect(startsWithPath('/a/bc', '/a/')).toBeTruthy()
    expect(startsWithPath('a/bc/', 'a')).toBeTruthy()
    expect(startsWithPath('a/bc/', '/a')).toBeTruthy()
    expect(startsWithPath('a/bc/', 'a/')).toBeTruthy()
    expect(startsWithPath('a/bc/', '/a/')).toBeTruthy()
    expect(startsWithPath('/a/bc/', 'a')).toBeTruthy()
    expect(startsWithPath('/a/bc/', '/a')).toBeTruthy()
    expect(startsWithPath('/a/bc/', 'a/')).toBeTruthy()
    expect(startsWithPath('/a/bc/', '/a/')).toBeTruthy()

    expect(startsWithPath('', '')).toBeTruthy()
    expect(startsWithPath('/', '')).toBeTruthy()
    expect(startsWithPath('', '/')).toBeTruthy()
    expect(startsWithPath('/', '/')).toBeTruthy()

    expect(startsWithPath('a///', 'a')).toBeTruthy()
    expect(startsWithPath('a', 'a///')).toBeTruthy()
  })
})
