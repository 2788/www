import { scaleBy, withFormat, process } from './dora-img'

describe('scaleBy', () => {
  it('should scale well by width', () => {
    expect(scaleBy({ width: 100 })).toBe('thumbnail/100x')
    expect(scaleBy({ width: 0 })).toBe('thumbnail/0x')
  })
  it('should scale well by height', () => {
    expect(scaleBy({ height: 100 })).toBe('thumbnail/x100')
    expect(scaleBy({ height: 0 })).toBe('thumbnail/x0')
  })
  it('should scale well with type contain', () => {
    expect(scaleBy({ type: 'contain', width: 100, height: 100 })).toBe('thumbnail/100x100')
    expect(scaleBy({ type: 'contain', width: 300, height: 400 })).toBe('thumbnail/300x400')
  })
  it('should scale well with type cover', () => {
    expect(scaleBy({ type: 'cover', width: 100, height: 100 })).toBe('thumbnail/!100x100r')
    expect(scaleBy({ type: 'cover', width: 300, height: 400 })).toBe('thumbnail/!300x400r')
  })
})

describe('withFormat', () => {
  it('should work well', () => {
    expect(withFormat('jpg')).toBe('format/jpg')
    expect(withFormat('png')).toBe('format/png')
    expect(withFormat('webp')).toBe('format/webp')
  })
})

describe('process', () => {
  it('should work well', () => {
    expect(process('https://www.qiniu.com/foo.jpg', withFormat('jpg'))).toBe('https://www.qiniu.com/foo.jpg?imageMogr2/format/jpg')
    expect(process('//www.qiniu.com/foo.jpg', withFormat('jpg'))).toBe('//www.qiniu.com/foo.jpg?imageMogr2/format/jpg')
    expect(process('/foo.jpg', withFormat('jpg'))).toBe('/foo.jpg?imageMogr2/format/jpg')
    expect(process('foo.jpg', withFormat('jpg'))).toBe('foo.jpg?imageMogr2/format/jpg')
    expect(process('./foo.jpg', withFormat('jpg'))).toBe('./foo.jpg?imageMogr2/format/jpg')
  })
  it('should work well with multiple methods', () => {
    expect(process('foo.jpg', scaleBy({ width: 100 }), withFormat('jpg'))).toBe('foo.jpg?imageMogr2/thumbnail/100x/format/jpg')
    expect(process('https://www.qiniu.com/foo.jpg', withFormat('jpg'), scaleBy({ type: 'cover', width: 100, height: 200 }))).toBe('https://www.qiniu.com/foo.jpg?imageMogr2/format/jpg/thumbnail/!100x200r')
  })
  it('should work well on url with search or hash', () => {
    expect(process('foo.jpg?bar=1', withFormat('png'))).toBe('foo.jpg?bar=1&imageMogr2/format/png')
    expect(process('https://www.qiniu.com/foo.jpg?bar=1&baz=abc#qux', withFormat('png'), scaleBy({ type: 'cover', width: 100, height: 200 }))).toBe('https://www.qiniu.com/foo.jpg?bar=1&baz=abc&imageMogr2/format/png/thumbnail/!100x200r#qux')
  })
})
