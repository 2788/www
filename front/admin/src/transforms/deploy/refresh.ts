/**
 * @file 缓存刷新相关
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ValidationResult, ValidationErrorObject } from 'formstate-x'

import { pathRule } from 'constants/deploy/refresh'

export function validatePath(path: string): Exclude<ValidationResult, ValidationErrorObject> {
  if (path === '') { // 首页
    return
  }

  if (path === '/') {
    return '不能直接刷新 /'
  }

  if (/\s/.test(path)) {
    return '不能有空白符'
  }

  if (path.includes('?') || path.includes('#')) {
    return '暂不支持刷新带 ? 或 # 的路径'
  }

  if (!pathRule.test(path)) {
    return '路径不正确'
  }
}
