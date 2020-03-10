/**
 * @file unit tests for isURL utils
 * @author yinxulai <yinxulai@qiniu.com>
 */

import { isURL } from './url'

const testDataTable = [
  { url: '', want: false },
  { url: ' ', want: false },
  { url: 'http://', want: false },
  { url: 'http://a.com', want: true },
  { url: 'https://a.com', want: true },
  { url: 'htt://a.com', want: false },
  { url: 'htts://a.com', want: false },
  { url: 'httP://a.com', want: true },
  { url: 'httPs://a.com', want: true },
  { url: 'httP://a.b.c.com', want: true },
  { url: 'httP://a. b.c.com', want: false },
  { url: 'https://aaaaaaaa', want: true },
  { url: 'https://a.com:80', want: true },
  { url: 'https://a.com:80#hash=test', want: true },
  { url: 'https://a.com:80?query=test', want: true },
  { url: 'https://我爱.中国', want: true },
  { url: 'https://我爱中国', want: true },
  { url: 'https://.我爱中国', want: false },
  { url: 'https://我爱中国.', want: false },
  { url: 'https://我 爱中国.', want: false },
  { url: 'https://[2001:DB8:0:23:8:800:200C:417A]', want: true },
  { url: 'https://[2001:DB8:0:23:8:800:200C:417A]:80', want: true },
  { url: 'https://我-爱-中.国', want: true },
  { url: 'https://1.2.3.4', want: true },
  { url: 'https://π', want: true }, // 真的合法,可以访问这个网站看看 http://π.com
  { url: 'https://鿏', want: true }, // 这个字是在晚期（Unicode 10.0.0 时间：2017年6月 ）加入的、很多网站都不支持,实际上是合法汉字
  { url: 'https://a', want: true },
  { url: 'https://a::b', want: false },
  { url: 'https://a..b', want: false },
  { url: 'https://a--b', want: true },
  { url: 'https://a.:b', want: false },
  { url: 'https://a.-:b', want: false },
  { url: 'https://a.--:b', want: false },
  // 几种常见空白符号
  { url: 'https://a\n\nb', want: false },
  { url: 'https://a\r\rb', want: false },
  { url: 'https://a\f\fb', want: false },
  { url: 'https://a\t\tb', want: false },
  { url: 'https://a\b\bb', want: false },
  { url: 'https://a\v\vb', want: false },
  { url: 'https://a\u1680\u1680a', want: false },
  { url: 'https://a\u180e\u180eb', want: false },
  { url: 'https://a\u2000\u2000b', want: false },
  { url: 'https://a\u200a\u200ab', want: false },
  { url: 'https://a\u2028\u2028b', want: false },
  { url: 'https://a\u2029\u2029b', want: false },
  { url: 'https://a\u202f\u202fb', want: false },
  { url: 'https://a\u205f\u205fb', want: false },
  { url: 'https://a\u3000\u3000b', want: false },
  { url: 'https://a\0\0b', want: false }
]

describe('isURL test', () => {
  it('test table data', () => {
    testDataTable.forEach(testData => {
      expect(isURL(testData.url)).toBe(testData.want)
    })
  })
})
