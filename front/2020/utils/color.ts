/**
 * @file          color
 * @description   颜色处理或者判断函数
 * @author        renpanpan
 */

// 判断颜色是否为暗色
export function isDark(color: string) {
  // YIQ equation from http://24ways.org/2010/calculating-color-contrast
  color = color.startsWith('#') ? color.substring(1) : color
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq < 128
}
