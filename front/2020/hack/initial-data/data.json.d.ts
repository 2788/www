// 展示区域
type DisplayPages = 'www-homepage' | 'www-others'

interface IBanner {
  name: string // 公告名称，类似 id，唯一
  pcImg: string
  mobileImg: string
  effectTime: number // 生效时间，精确到秒
  invalidTime: number // 失效时间，精确到秒
  createTime: number // 创建时间，精确到秒
  editTime: number // 更新时间，精确到秒
  backgroundColor: string // pc 端背景色
  link: string // 跳转链接
  displayPages: DisplayPages[] // 展示区域
}

export declare const globalBannersRes: { data: IBanner[] | null }
