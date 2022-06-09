/**
 * @file          color
 * @description   颜色处理或者判断函数
 * @author        renpanpan
 */

/**
 * 给定 R、G、B 计算相对亮度
 * 详见 https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function luminanceOfRGB(r: number, g: number, b: number) {
  function normalize(v: number) {
    v /= 255
    if (v <= 0.03928) return v / 12.92
    return ((v + 0.055) / 1.055) ** 2.4
  }
  [r, g, b] = [r, g, b].map(normalize)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** 判断给定色值（形如 `#f0f0f0`）是否为暗色 */
export function isDark(color: string) {
  color = color.startsWith('#') ? color.substring(1) : color
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  return luminanceOfRGB(r, g, b) < 0.5
}
