import { splitWithUrl } from './text'

describe('splitWithUrl', () => {
  it('should work well with plain text', () => {
    expect(splitWithUrl('')).toEqual([
      { isUrl: false, content: '' }
    ])
    expect(splitWithUrl('abc')).toEqual([
      { isUrl: false, content: 'abc' }
    ])
    expect(splitWithUrl('http https')).toEqual([
      { isUrl: false, content: 'http https' }
    ])
    expect(splitWithUrl('dhttp://a')).toEqual([
      { isUrl: false, content: 'dhttp://a' }
    ])
    expect(splitWithUrl('abcdhttp://a.com')).toEqual([
      { isUrl: false, content: 'abcdhttp://a.com' }
    ])
  })
  it('should work well with url in text', () => {
    expect(splitWithUrl('地址：https://qiniu.com')).toEqual([
      { isUrl: false, content: '地址：' },
      { isUrl: true, content: 'https://qiniu.com' }
    ])
    expect(splitWithUrl('域名管理，配置管理等CDN相关内容，你可以通过查看以下文档了解：https://developer.qiniu.com/fusion/manual/4939/the-domain-name-to-access')).toEqual([
      { isUrl: false, content: '域名管理，配置管理等CDN相关内容，你可以通过查看以下文档了解：' },
      { isUrl: true, content: 'https://developer.qiniu.com/fusion/manual/4939/the-domain-name-to-access' }
    ])
    expect(splitWithUrl('你可扫码免费体验demo https://www.qiniu.com/products/plsv#demo')).toEqual([
      { isUrl: false, content: '你可扫码免费体验demo ' },
      { isUrl: true, content: 'https://www.qiniu.com/products/plsv#demo' }
    ])
    expect(splitWithUrl('文档（https://developer.qiniu.com/pili/sdk/3731/short-video?ref=www.qiniu.com）')).toEqual([
      { isUrl: false, content: '文档（' },
      { isUrl: true, content: 'https://developer.qiniu.com/pili/sdk/3731/short-video?ref=www.qiniu.com' },
      { isUrl: false, content: '）' }
    ])
  })
  it('should work well with multiple urls in text', () => {
    expect(splitWithUrl('地址 A：https://qiniu.com，地址 B：http://portal.qiniu.com/cdn（点击查看）')).toEqual([
      { isUrl: false, content: '地址 A：' },
      { isUrl: true, content: 'https://qiniu.com' },
      { isUrl: false, content: '，地址 B：' },
      { isUrl: true, content: 'http://portal.qiniu.com/cdn' },
      { isUrl: false, content: '（点击查看）' }
    ])
    expect(splitWithUrl('域名管理，配置管理等CDN相关内容，你可以通过查看以下文档了解：https://developer.qiniu.com/fusion/manual/4939/the-domain-name-to-access')).toEqual([
      { isUrl: false, content: '域名管理，配置管理等CDN相关内容，你可以通过查看以下文档了解：' },
      { isUrl: true, content: 'https://developer.qiniu.com/fusion/manual/4939/the-domain-name-to-access' }
    ])
  })
})
