/**
 * @file 图片相关处理函数（基于 dora 图片高级处理能力）
 * @description 参考文档 https://developer.qiniu.com/dora/api/1270/the-advanced-treatment-of-images-imagemogr2
 */

/** 指定宽度等比缩放，单位 px */
export type ScaleOptionsByWidth = { width: number }
/** 指定高度等比缩放，单位 px */
export type ScaleOptionsByHeight = { height: number }
/** 等比缩放使得图片刚好被指定尺寸的区域包含，单位 px */
export type ScaleOptionsContain = { type: 'contain', width: number, height: number }
/** 等比缩放使得图片刚好覆盖指定尺寸的区域，单位 px */
export type ScaleOptionsCover = { type: 'cover', width: number, height: number }

export type ScaleOptions = ScaleOptionsByWidth | ScaleOptionsByHeight | ScaleOptionsContain | ScaleOptionsCover

function isByWidth(options: ScaleOptions): options is ScaleOptionsByWidth {
  return (options as ScaleOptionsByWidth).width != null
}

function isContain(options: ScaleOptions): options is ScaleOptionsContain {
  return (options as ScaleOptionsContain).type === 'contain'
}

function isCover(options: ScaleOptions): options is ScaleOptionsCover {
  return (options as ScaleOptionsCover).type === 'cover'
}

/** 等比缩放 */
export function scaleBy(options: ScaleOptions) {
  const prefix = 'thumbnail'
  if (isContain(options)) return `${prefix}/${options.width}x${options.height}`
  if (isCover(options)) return `${prefix}/!${options.width}x${options.height}r`
  if (isByWidth(options)) return `${prefix}/${options.width}x`
  return `${prefix}/x${options.height}`
}

export type Format = 'jpg' | 'png' | 'webp'

/** 转换为指定格式 */
export function withFormat(format: Format) {
  return `format/${format}`
}

/** 对目标图片（地址）执行指定的操作，返回结果图片（地址） */
export function process(imgUrl: string, ...methods: string[]) {
  const fops = ['imageMogr2', ...methods].join('/')
  const [withoutHash, hash] = imgUrl.split('#')
  const [withoutSearch, search] = withoutHash.split('?')
  const searchWithFops = search ? [search, fops].join('&') : fops
  const withSearch = [withoutSearch, searchWithFops].filter(Boolean).join('?')
  const withHash = [withSearch, hash].filter(Boolean).join('#')
  return withHash
}

/**
 * 图片瘦身
 * https://developer.qiniu.com/dora/1271/image-thin-body-imageslim
 */
export function imageslim(imgUrl: string) {
  return imgUrl + (imgUrl.includes('?') ? '&' : '?') + 'imageslim'
}
