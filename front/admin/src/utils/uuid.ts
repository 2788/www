/**
 * @file uuid
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { v4 as generateUuidV4 } from 'uuid'

// 生成格式跟 mongo-api 的 _id 类似的 uuid
// uuid v4 参考：https://datatracker.ietf.org/doc/html/rfc4122#section-4.4
export function generateUuidId(): string {
  const chars = generateUuidV4().split('')
  chars[14] = '-'
  chars[19] = '-'
  return chars.filter(char => char !== '-').slice(0, 24).join('')
}
