/**
 * @file 常用校验函数
 */

export const textNotEmpty = (msg = '不可为空') => (input: string) => (
  !input.trim() && msg
)

export const textOfPattern = (pattern: RegExp, msg = '输入格式错误') => (input: string) => (
  !pattern.test(input) && msg
)
