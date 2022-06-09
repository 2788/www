/**
 * @file 图片相关工具函数
 * @desc -
 */

import { luminanceOfRGB } from './color'

/**
 * 计算给定图片亮度，通过均匀选取多个点计算平均亮度，
 * 结果为 `[0, 1]` 间的数字，数字越大则认为图片亮度越高，反之亮度越低；
 * 注意若图片 URL 与当前页面不同域，需要允许跨域访问（通过设置响应头中的 `access-control-allow-origin`）
 */
export function luminanceOf(
  /** 图片 URL */
  imgUrl: string,
  /** （一维上的）采样数，如设置 10，则总共会取 10*10=100 个点 */
  sampleNum = 20
) {
  return new Promise<number>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imgUrl
    img.onerror = reject

    img.onload = () => {
      const { width, height } = img
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      // 对坐标值进行处理，确保其为 [0, limit) 区间内的整数
      function normalize(v: number, limit: number) {
        v = Math.floor(v)
        if (v < 0) v = 0
        if (v >= limit) v = limit - 1
        return v
      }

      let sumOfLuminance = 0
      sampleNum = Math.min(sampleNum, width, height)
      const stepX = width / (sampleNum - 1)
      const stepY = height / (sampleNum - 1)

      for (let i = 0; i < sampleNum; i++) {
        for (let j = 0; j < sampleNum; j++) {
          const x = normalize(stepX * i, width)
          const y = normalize(stepY * j, height)
          const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
          sumOfLuminance += luminanceOfRGB(r, g, b)
        }
      }
      const averageLuminance = sumOfLuminance / (sampleNum ** 2)
      resolve(averageLuminance)
    }
  })
}
