/* eslint-disable global-require */

import { FC, SVGAttributes } from 'react'

import rtcliveLargeIconUrl from './images/large/rtclive.png'
import plsvLargeIconUrl from './images/large/plsv.png'
import EntliveLargeIconUrl from './images/large/entlive.png'
import kodoeLargeIconUrl from './images/large/kodoe.png'
import essLargeIconUrl from './images/large/ess.png'
import storageLargeIconUrl from './images/large/storage.png'
import eduLargeIconUrl from './images/large/edu.png'
import finLargeIconUrl from './images/large/fin.png'
import autoLargeIconUrl from './images/large/auto.png'
import ecLargeIconUrl from './images/large/ec.png'
import imLargeIconUrl from './images/large/im.png'
import socialLargeIconUrl from './images/large/social.png'
import genLargeIconUrl from './images/large/gen.png'
import entertainmentLargeIconUrl from './images/large/entertainment.png'
import ApaasLargeIconUrl from './images/large/apaas.png'

export enum Solution {
  /** 金融行业 */
  Fin = 'fin',
  /** 教育行业 */
  Edu = 'edu',
  /** 汽车行业 */
  Automobile = 'auto',
  /** 电商行业 */
  ECommerce = 'ec',
  /** 智能制造行业 */
  IntelligentManufacturing = 'im',
  /** 社交行业 */
  Social = 'social',
  /** 运营商行业 */
  Isp = 'isp',
  /** 基因测序行业 */
  Gene = 'gene',
  /** 泛娱乐行业 */
  Entertainment = 'entertainment',
  /** 智能视频云 */
  Qavs = 'qavs',
  /** 互动直播 */
  Rtclive = 'rtclive',
  /** 短视频 */
  Plsv = 'plsv',
  /** 企业直播 */
  Entlive = 'entlive',
  /** 私有云存储 */
  Kodoe = 'kodoe',
  /** 视频冷存储 */
  Vcs = 'vcs',
  /** 监控视频边缘存储 */
  Ess = 'ess',
  /** 云存储一体机 */
  Storage = 'storage',
  /** 新媒体 */
  Medium = 'medium',
  /** 低代码音视频工厂 */
  Apaas = 'Apaas'
}

export enum Category {
  Media = 'media',
  LowCode = 'lowCode',
  Storage = 'storage',
  Industry = 'industry',
  Consumer = 'consumer'
}

export const categories = [
  Category.Media,
  Category.LowCode,
  Category.Storage,
  Category.Industry,
  Category.Consumer
] as const

export const categoryNameMap = {
  [Category.Media]: '音视频解决方案',
  [Category.LowCode]: '低代码解决方案',
  [Category.Storage]: '存储解决方案',
  [Category.Industry]: '行业解决方案',
  [Category.Consumer]: '消费互联网解决方案'
} as const

export const categoryNameMapForMp = {
  [Category.Media]: '音视频',
  [Category.LowCode]: '低代码',
  [Category.Storage]: '存储',
  [Category.Industry]: '行业',
  [Category.Consumer]: '消费互联网'
} as const

export const categoryEnNameMap = {
  [Category.Media]: 'Solutions by Media',
  [Category.LowCode]: 'Solutions by LowCode',
  [Category.Storage]: 'Solutions by Storage',
  [Category.Industry]: 'Solutions by Industry',
  [Category.Consumer]: 'Solutions by Consumer Internet'
} as const

export const categorySolutionsMap = {
  [Category.Media]: [Solution.Rtclive, Solution.Plsv, Solution.Entlive],
  [Category.LowCode]: [Solution.Apaas],
  [Category.Storage]: [Solution.Kodoe, Solution.Ess, Solution.Storage],
  [Category.Industry]: [
    Solution.Fin, Solution.Automobile, Solution.Gene, Solution.IntelligentManufacturing,
    Solution.Medium, Solution.Isp
  ],
  [Category.Consumer]: [Solution.Entertainment, Solution.Social, Solution.ECommerce, Solution.Edu]
}

// todo：目前 ts 工作区版本当使用联合类型时，作为函数的成员也将被类型化为联合类型，因此对于 map 之类的方法会产生多种类型，
// 例如：期望 (val:Type1 | Type2) => any 实际则是 (val:Type1) => any || (val:Type1) => any，无法兼容
// 后续等 ts 升级到 4.2 之后可以改为在 categorySolutionsMap as const 即可
export const industrySolutions = categorySolutionsMap[Category.Industry] as [
  Solution.Fin, Solution.Automobile, Solution.Gene, Solution.IntelligentManufacturing,
  Solution.Medium, Solution.Isp
]

export type IndustrySolution = (typeof industrySolutions)[number]

export type MapTo<T> = { [s in Solution]: T }

export const industryNameMap: { [s in IndustrySolution]: string } = {
  [Solution.Fin]: '金融',
  [Solution.Automobile]: '汽车',
  [Solution.Gene]: '基因测序',
  [Solution.IntelligentManufacturing]: '智能制造',
  [Solution.Medium]: '新媒体',
  [Solution.Isp]: '运营商'
} as const

export const industryEnNameMap = {
  [Solution.Fin]: 'Financial',
  [Solution.Automobile]: 'Automobile',
  [Solution.Gene]: 'Gene',
  [Solution.IntelligentManufacturing]: 'Manufacture',
  [Solution.Medium]: 'Medium',
  [Solution.Isp]: 'Isp'
} as const

export const nameMap: MapTo<string> = {
  ...industryNameMap,
  [Solution.Edu]: '在线教育',
  [Solution.ECommerce]: '电商网购',
  [Solution.Social]: '社交',
  [Solution.Entertainment]: '泛娱乐',
  [Solution.Qavs]: '智能视频云',
  [Solution.Rtclive]: '互动直播',
  [Solution.Plsv]: '短视频',
  [Solution.Entlive]: '企业直播',
  [Solution.Kodoe]: '私有云存储',
  [Solution.Vcs]: '视频冷存储',
  [Solution.Ess]: '监控视频边缘存储',
  [Solution.Storage]: '云存储一体机',
  [Solution.Apaas]: '音视频低代码工厂'
} as const

export const urlMap: MapTo<string | null> = {
  [Solution.Qavs]: '/solutions/qavs',
  [Solution.Rtclive]: '/solutions/rtclive',
  [Solution.Plsv]: '/solutions/plsv',
  [Solution.Entlive]: '/solutions/ent-live',
  [Solution.Kodoe]: '/solutions/kodoe',
  [Solution.Vcs]: '/solutions/vcs',
  [Solution.Ess]: '/solutions/ess',
  [Solution.Storage]: '/solutions/storage',
  [Solution.Edu]: '/solutions/edu-online',
  [Solution.Fin]: '/solutions/fin',
  [Solution.Automobile]: '/solutions/automobile',
  [Solution.ECommerce]: '/solutions/ecommerce',
  [Solution.IntelligentManufacturing]: '/solutions/manufacture',
  [Solution.Social]: '/solutions/social',
  [Solution.Isp]: null,
  [Solution.Gene]: '/solutions/gene',
  [Solution.Entertainment]: '/solutions/entertainment',
  [Solution.Medium]: null,
  [Solution.Apaas]: '/solutions/apaas'
} as const

export const descMap: MapTo<string> = {
  [Solution.Qavs]: '集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案',
  [Solution.Rtclive]: '一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线',
  [Solution.Plsv]: '集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案',
  [Solution.Entlive]: '多场景通用、0开发接入的直播解决方案',
  [Solution.Kodoe]: '为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型',
  [Solution.Vcs]: '专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案',
  [Solution.Ess]: '满足监控视频及图片就近存储、加速传输、倍速播放等关键需求',
  [Solution.Storage]: '开箱即用，预集成 AI 智能服务，低 TCO 的海量存储产品',
  [Solution.Edu]: '一站式在线教育解决方案，打造高清、实时、智能的教学体验',
  [Solution.Fin]: '帮助金融客户满足监管合规要求，科技创新、流程再造，洞察数据价值',
  [Solution.Automobile]: '连接海量汽车出行数据，助力汽车产业加速迈入智能、网联和共享时代',
  [Solution.ECommerce]: '提供一站式图片处理及音视频服务，实现电商多场景联动，助力业务增长',
  [Solution.IntelligentManufacturing]: '帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造',
  [Solution.Social]: '七牛云提供社交解决方案，助力快速构建社交平台和应用',
  [Solution.Isp]: '为运营商的中长期架构演进路线提供全方位的技术咨询和一站式方案服务',
  [Solution.Gene]: '集计算和存储为一体的一站式基因测序解决方案',
  [Solution.Entertainment]: '丰富的内容生产工具和音视频服务，助力企业快速构建泛娱乐应用',
  [Solution.Medium]: '',
  [Solution.Apaas]: '提供易接入、强扩展、高效部署和覆盖多场景的音视频服务，助力企业快速搭建业务平台'
} as const

// 32px的icon，默认除导航栏均为该类型
export const iconMap: MapTo<FC<SVGAttributes<SVGElement>> | null> = {
  [Solution.Qavs]: require('./images/default/qavs.svg').default,
  [Solution.Rtclive]: require('./images/default/rtclive.svg').default,
  [Solution.Plsv]: require('./images/default/plsv.svg').default,
  [Solution.Entlive]: require('./images/default/entlive.svg').default,
  [Solution.Kodoe]: require('./images/default/kodoe.svg').default,
  [Solution.Vcs]: require('./images/default/vcs.svg').default,
  [Solution.Ess]: require('./images/default/ess.svg').default,
  [Solution.Storage]: require('./images/default/storage.svg').default,
  [Solution.Edu]: require('./images/default/edu.svg').default,
  [Solution.Fin]: require('./images/default/fin.svg').default,
  [Solution.Automobile]: require('./images/default/auto.svg').default,
  [Solution.ECommerce]: require('./images/default/ec.svg').default,
  [Solution.IntelligentManufacturing]: require('./images/default/im.svg').default,
  [Solution.Social]: require('./images/default/social.svg').default,
  [Solution.Isp]: require('./images/default/isp.svg').default,
  [Solution.Gene]: require('./images/default/gen.svg').default,
  [Solution.Entertainment]: require('./images/default/entertainment.svg').default,
  [Solution.Medium]: null,
  [Solution.Apaas]: require('./images/default/apaas.svg').default
} as const

// 24px的icon，导航栏使用
export const smallIconMap: MapTo<FC<SVGAttributes<SVGElement>> | null> = {
  [Solution.Qavs]: require('./images/small/qavs.svg').default,
  [Solution.Rtclive]: require('./images/small/rtclive.svg').default,
  [Solution.Plsv]: require('./images/small/plsv.svg').default,
  [Solution.Entlive]: require('./images/small/entlive.svg').default,
  [Solution.Kodoe]: require('./images/small/kodoe.svg').default,
  [Solution.Vcs]: require('./images/small/vcs.svg').default,
  [Solution.Ess]: require('./images/small/ess.svg').default,
  [Solution.Storage]: require('./images/small/storage.svg').default,
  [Solution.Edu]: require('./images/small/edu.svg').default,
  [Solution.Fin]: require('./images/small/fin.svg').default,
  [Solution.Automobile]: require('./images/small/auto.svg').default,
  [Solution.ECommerce]: require('./images/small/ec.svg').default,
  [Solution.IntelligentManufacturing]: require('./images/small/im.svg').default,
  [Solution.Social]: require('./images/small/social.svg').default,
  [Solution.Isp]: require('./images/small/isp.svg').default,
  [Solution.Gene]: require('./images/small/gen.svg').default,
  [Solution.Entertainment]: require('./images/small/entertainment.svg').default,
  [Solution.Medium]: null,
  [Solution.Apaas]: require('./images/small/apaas.svg').default
} as const

// 96px 的 icon，相关推荐用
export const largeIconMap: MapTo<string | null> = {
  [Solution.Qavs]: null,
  [Solution.Rtclive]: rtcliveLargeIconUrl,
  [Solution.Plsv]: plsvLargeIconUrl,
  [Solution.Entlive]: EntliveLargeIconUrl,
  [Solution.Kodoe]: kodoeLargeIconUrl,
  [Solution.Vcs]: null,
  [Solution.Ess]: essLargeIconUrl,
  [Solution.Storage]: storageLargeIconUrl,
  [Solution.Edu]: eduLargeIconUrl,
  [Solution.Fin]: finLargeIconUrl,
  [Solution.Automobile]: autoLargeIconUrl,
  [Solution.ECommerce]: ecLargeIconUrl,
  [Solution.IntelligentManufacturing]: imLargeIconUrl,
  [Solution.Social]: socialLargeIconUrl,
  [Solution.Isp]: null,
  [Solution.Gene]: genLargeIconUrl,
  [Solution.Entertainment]: entertainmentLargeIconUrl,
  [Solution.Medium]: null,
  [Solution.Apaas]: ApaasLargeIconUrl
}

export const allSolutions = categories.reduce(
  (solutions, category) => [...solutions, ...categorySolutionsMap[category]],
  [] as Solution[]
)

export function isAvailable(solution: Solution) {
  return urlMap[solution] != null
}

/** 所有**可用**的解决方案（有落地页） */
export const allAvailableSolutions = allSolutions.filter(isAvailable)
