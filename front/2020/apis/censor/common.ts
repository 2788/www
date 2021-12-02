import { apiPrefix as basePrefix } from 'constants/api'

export const apiPrefix = `${basePrefix}/ai`

export const failedMsg = '任务失败，请稍后重试'

// 图片/视频地址可能是以 `/` 开头的路径，这里转为为完整 URL 以方便接口处理
export function getFullUrl(url: string) {
  const { protocol, host } = window.location
  // 本地开发的时候，图片是本地地址，没法发给 censor 处理，这里替换为测试环境对应的地址
  const realHost = /^localhost/.test(host) ? 'www-2020.dev.qiniu.io' : host
  return (
    url[0] === '/'
    ? `${protocol}//${realHost}${url}`
    : url
  )
}
