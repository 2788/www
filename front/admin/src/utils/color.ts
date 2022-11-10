/**
 * @file          color
 * @description   颜色处理或者判断函数
 * @author        renpanpan
 */

import { getPromise } from 'utils/async'

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

function getBase64(img: File, callback: (url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(`${reader.result}`))
  reader.readAsDataURL(img)
}

function getBorderColor(img: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  const height = img.height
  // 取最左边上中下三点px的颜色数据
  const start = ctx.getImageData(0, 0, 1, 1).data as unknown as number[]
  const mid = ctx.getImageData(0, Math.floor(height / 2), 1, 1).data as unknown as number[]
  const end = ctx.getImageData(0, height - 1, 1, 1).data as unknown as number[]
  const red = Math.round((start[0] + mid[0] + end[0]) / 3)
  const green = Math.round((start[1] + mid[1] + end[1]) / 3)
  const blue = Math.round((start[2] + mid[2] + end[2]) / 3)

  return _rgbToHex(red, green, blue)
  // 获取 hex 格式颜色
  function _rgbToHex(r: number, g: number, b: number) {
    return '#' + _componentToHex(r) + _componentToHex(g) + _componentToHex(b)
  }
  function _componentToHex(c: number) {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
}

export function getBgColor(file: File): Promise<string> {
  const { resolve, reject, promise } = getPromise<string>()

  const img = new Image()
  img.style.display = 'none'
  getBase64(file, (url: string) => { img.src = url })

  img.onload = () => {
    const borderColor = getBorderColor(img)
    if (borderColor) {
      resolve(borderColor)
    } else {
      reject()
    }
  }

  return promise
}
