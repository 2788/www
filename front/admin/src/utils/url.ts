/**
 * @file url utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

/** 路径前缀匹配，比如 `/a` 能匹配 `/a` `/a/` `/a/b` 但不匹配 `/ab` */
export function startsWithPath(target: string, prefix: string): boolean {
  if (!prefix.startsWith('/')) {
    prefix = '/' + prefix
  }
  prefix = prefix.replace(/\/*$/, '')

  if (!target.startsWith('/')) {
    target = '/' + target
  }

  return (
    target === prefix
    || target.startsWith(prefix) && target.slice(prefix.length)[0] === '/'
  )
}
