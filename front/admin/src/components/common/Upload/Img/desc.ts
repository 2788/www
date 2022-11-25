/**
 * @file 描述相关工具函数
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { gcd } from 'utils/math'

/** 默认文件体积限制，单位为 KB */
export const defaultMaxFileSize = 500

/** 阈值，宽高比数字过大无意义 */
const aspectRatioLimit = 32

/** 推荐显示尺寸 */
function getRecommendedDimension(width: number, height: number): string {
  return `推荐尺寸 ${width} × ${height} px`
}

/** 宽高比 */
function getAspectRatio(width: number, height: number): string {
  const hcf = gcd(width, height) // 最大公约数
  const widthRatio = width / hcf
  const heightRatio = height / hcf
  return widthRatio < aspectRatioLimit && heightRatio < aspectRatioLimit
    ? `${widthRatio}:${heightRatio}`
    : ''
}

/** 处理 KB 和 MB */
function getFileSize(size: number): [string, string] {
  if (size < 1024) {
    return [String(size), 'KB']
  }

  const mb = size / 1024
  const mbText = Number.isInteger(mb) ? String(mb) : mb.toFixed(1)
  return [mbText, 'MB']
}

/** 文件体积限制 */
function getFileSizeLimit(maxSize: number | undefined): string {
  if (!maxSize) {
    return ''
  }

  const [size, unit] = getFileSize(maxSize)
  return `最大 ${size} ${unit}`
}

export default function getDesc(
  width: number | undefined,
  height: number | undefined,
  maxFileSize = defaultMaxFileSize
): string {
  let boxDesc = ''
  if (width && height) {
    boxDesc += getRecommendedDimension(width, height)

    const ratio = getAspectRatio(width, height)
    if (ratio) {
      boxDesc += ` (${ratio})`
    }
  }

  const sizeDesc = getFileSizeLimit(maxFileSize)

  return [boxDesc, sizeDesc].filter(Boolean).join('，')
}
