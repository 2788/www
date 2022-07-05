/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { TimeInfo } from 'apis/mongo-api-client'

export const wwwContentDetailUrlPrefix = 'pgc/detail' // 后面跟 `/:id`

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

export const contentCategories = [
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
  [ContentCategory.Activity]: '极客活动'
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

export interface ContentDetailWithTime extends ContentDetail, TimeInfo {}

export interface Content {
  id: ContentId
  type: ContentType // 种类
  draft: ContentDetailWithTime
  release?: ContentDetailWithTime // 每次刚发布的时候，release 的内容会跟 draft 相同（createdAt 除外）
}

export enum TagCategory {
  Service = 'service',
  Vision = 'vision',
  Intelligence = 'intelligence',
  SDK = 'sdk',
  Solution = 'solution'
}

export const tagCategories = [
  TagCategory.Service,
  TagCategory.Vision,
  TagCategory.Intelligence,
  TagCategory.SDK,
  TagCategory.Solution
]

export const tagCategoryTextMap = {
  [TagCategory.Service]: '基础服务',
  [TagCategory.Vision]: '视觉数据智能',
  [TagCategory.Intelligence]: '机器数据智能',
  [TagCategory.SDK]: 'SDK',
  [TagCategory.Solution]: '解决方案'
} as const

const categoryServiceTags = [
  '对象存储Kodo',
  'CDN',
  '边缘加速',
  '全站加速',
  '云存储一体机',
  '云短信SMS',
  'SSL证书',
  '云主机服务QVM',
  '云数据库'
]

const categoryVisionTags = [
  '视频直播Pili',
  '低延时直播Geek',
  '实时音视频QRTC',
  '视频监控QVS'
]

const categoryIntelligenceTags = [
  '人脸核验',
  '内容审核',
  '票证自动识别OCR',
  '音视频质量分析',
  '视频智能分析',
  '智能语音',
  '智能风控',
  '锐智转码',
  '画质增强'
]

const categorySDKTags = [
  '短视频SDK',
  '直播推流SDK',
  '播放器SDK',
  '美颜特效SDK'
]

const categorySolutionTags = [
  '泛娱乐解决方案',
  '在线教育解决方案',
  '社交解决方案',
  '汽车行业解决方案',
  '基因测序解决方案',
  '电商网购解决方案'
]

export const categoryTagsMap: { [c in TagCategory]: readonly string[] } = {
  [TagCategory.Service]: categoryServiceTags,
  [TagCategory.Vision]: categoryVisionTags,
  [TagCategory.Intelligence]: categoryIntelligenceTags,
  [TagCategory.SDK]: categorySDKTags,
  [TagCategory.Solution]: categorySolutionTags
}
