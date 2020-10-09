import { useQueryValue } from './url'

// 渠道信息
//
// utm_source 渠道
// 示例链接：https://www.qiniu.com?utm_source=易签链&utm_content=手机号,姓名
export function useSource() {
  const [source] = useQueryValue('utm_source', '')

  return source
}
