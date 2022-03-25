/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export const wwwContentDetailUrlPrefix = 'https://www.qiniu.com/pgc/detail' // 后面跟 `/:id`

export const uploadBucketKeyPrefix = 'pgc/admin/content' // 后面跟 `/:timestamp/:file-name-with-suffix`

export type ContentId = string

export enum ContentType {
  Article = 'article', // 图文
  Video = 'video',
  File = 'file'
}

export const contentTypes = [
  ContentType.Article,
  ContentType.Video,
  ContentType.File
]

export const contentTypeTextMap = {
  [ContentType.Article]: '图文',
  [ContentType.Video]: '视频',
  [ContentType.File]: '文件'
} as const

export enum ContentCategory {
  Solution = 'solution',
  Case = 'case',
  Technology = 'technology',
  News = 'news',
  Activity = 'activity'
}

export const contentCategorys = [
  ContentCategory.Activity,
  ContentCategory.Case,
  ContentCategory.News,
  ContentCategory.Solution,
  ContentCategory.Technology
]

export const contentCategoryTextMap = {
  [ContentCategory.Solution]: '产品方案',
  [ContentCategory.Case]: '案例分享',
  [ContentCategory.Technology]: '技术道场',
  [ContentCategory.News]: '新闻动态',
  [ContentCategory.Activity]: '线下活动'
} as const

export enum UserLimitType {
  SignedIn = 'signedIn',
  MobilePhoneVerified = 'mobilePhoneVerified'
}

export const userLimitTypes = [
  UserLimitType.SignedIn,
  UserLimitType.MobilePhoneVerified
]

export const userLimitTypeTextMap = {
  [UserLimitType.SignedIn]: '需要登录',
  [UserLimitType.MobilePhoneVerified]: '需要手机号验证通过'
} as const

export interface UserLimit {
  preview: UserLimitType[] // TODO: 预览
  view: UserLimitType[] // 网站上看完整内容
  download: UserLimitType[] // 下载
}

export interface ContentDetail {
  title: string
  category: ContentCategory // 类别
  description: string // 摘要
  posterUrl: string // 封面
  keywords: string[] // 标签 & 关键字
  userLimit: UserLimit
  content: string // type 决定是 url 还是 markdown 还是啥
}

export interface ContentDetailWithTime extends ContentDetail {
  createdAt: number
  updatedAt: number
}

export interface Content {
  id: ContentId
  type: ContentType // 种类
  draft: ContentDetailWithTime
  release?: ContentDetailWithTime // 每次刚发布的时候，release 的内容会跟 draft 相同（createdAt 除外）
}
