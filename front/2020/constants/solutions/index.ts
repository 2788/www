/* eslint-disable global-require */

import { FC, SVGAttributes } from 'react'

import rtcliveLargeIconUrl from './images/large/rtclive.png'
import plsvLargeIconUrl from './images/large/plsv.png'
import entliveLargeIconUrl from './images/large/entlive.png'
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
import apaasLargeIconUrl from './images/large/apaas.png'
import avatarLargeIconUrl from './images/large/avatar.png'

/** @deprecated 参考 `/apis/admin/solution.ts` 的 `getSolutionInfo` */
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
  EntLive = 'entlive',
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
  Apaas = 'Apaas',
  /** 虚拟数字人 */
  Avatar = 'avatar',
  /** 互动营销 */
  InteractMkt = 'interact-mkt',
  /** 统一消息触达 */
  Message = 'message',
  /** 秀场/赛事直播 */
  ShowLive = 'showlive',
  /** 图片处理分发加速 */
  Image = 'image',
  /** 家居视联网 */
  SmartHome = 'smarthome',
  /** 智慧幼教 */
  KindergartenMonitoring = 'kindergarten-monitoring',
  /** 车载智能 */
  VehicleIntelligence = 'vehicle-intelligence',
  /** 智能剪辑 */
  CmediaProduction = 'cmedia-production',
  /** 智能媒资 */
  MediaManagement = 'media-management',
  /** VR 直播 */
  VrLive = 'vrlive'
}

export enum Category {
  Media = 'media',
  LowCode = 'lowCode',
  Storage = 'storage',
  Industry = 'industry',
  Consumer = 'consumer',
  SocialEntertainment = 'social-entertainment',
  VideoMarketing = 'video-marketing',
  VideoNetworking = 'video-networking',
  SmartNewMedia = 'smart-new-media',
  Metaverse = 'metaverse'
}

export const categories: Category[] = [
  Category.VideoMarketing,
  Category.SocialEntertainment,
  Category.VideoNetworking,
  Category.SmartNewMedia,
  Category.Metaverse
]

export const categoryNameMap = {
  [Category.Media]: '音视频解决方案',
  [Category.LowCode]: '低代码解决方案',
  [Category.Storage]: '存储解决方案',
  [Category.Industry]: '行业解决方案',
  [Category.Consumer]: '消费互联网解决方案',
  [Category.VideoMarketing]: '视频营销',
  [Category.SocialEntertainment]: '社交娱乐',
  [Category.VideoNetworking]: '视联网',
  [Category.SmartNewMedia]: '智能新媒体',
  [Category.Metaverse]: '元宇宙'
} as const

export const categoryNameMapForMp = {
  [Category.Media]: '音视频',
  [Category.LowCode]: '低代码',
  [Category.Storage]: '存储',
  [Category.Industry]: '行业',
  [Category.Consumer]: '消费互联网',
  [Category.VideoMarketing]: '视频营销',
  [Category.SocialEntertainment]: '社交娱乐',
  [Category.VideoNetworking]: '视联网',
  [Category.SmartNewMedia]: '智能新媒体',
  [Category.Metaverse]: '元宇宙'
} as const

export const categoryEnNameMap = {
  [Category.Media]: 'Solutions by Media',
  [Category.LowCode]: 'Solutions by LowCode',
  [Category.Storage]: 'Solutions by Storage',
  [Category.Industry]: 'Solutions by Industry',
  [Category.Consumer]: 'Solutions by Consumer Internet',
  [Category.VideoMarketing]: 'Solutions by Video Marketing',
  [Category.SocialEntertainment]: 'Solutions by Social Entertainment',
  [Category.VideoNetworking]: 'Solutions by Video Networking',
  [Category.SmartNewMedia]: 'Solutions by Smart New Media',
  [Category.Metaverse]: 'Solutions by Metaverse'
} as const

export const categoryDescMap = {
  [Category.VideoMarketing]: '覆盖营销、带货、企业培训、活动直播等场景，帮助企业快速集成和接入直播服务，实现内容生产、直播数据域流量闭环。',
  [Category.SocialEntertainment]: '为移动社交娱乐平台提供集图片处理、音视频点播、直播与互动、音视频处理、存储与分发等服务的一站式解决方案。',
  [Category.VideoNetworking]: '为视联网提供集音视频云管理、计算引擎、场景感知分析、云编解码及存储等服务的一站式解决方案。',
  [Category.SmartNewMedia]: '为智能新媒体平台提供音视频内容制作服务，兼顾低延时、高吞吐、高精度的一站式解决方案。',
  [Category.Metaverse]: '提供虚拟数字人、虚拟空间音视频服务，助力元宇宙企业技术及应用落地，打造沉浸式虚拟空间。'
} as const

export const categorySolutionsMap = {
  [Category.Media]: [Solution.Rtclive, Solution.Plsv, Solution.EntLive, Solution.Avatar],
  [Category.LowCode]: [Solution.Apaas],
  [Category.Storage]: [Solution.Kodoe, Solution.Ess, Solution.Storage],
  [Category.Industry]: [
    Solution.Fin, Solution.Automobile, Solution.Gene, Solution.IntelligentManufacturing,
    Solution.Medium, Solution.Isp
  ],
  [Category.Consumer]: [Solution.Entertainment, Solution.Social, Solution.ECommerce, Solution.Edu],
  [Category.VideoMarketing]: [Solution.EntLive, Solution.InteractMkt, Solution.Message],
  [Category.SocialEntertainment]: [Solution.Plsv, Solution.ShowLive, Solution.Image],
  [Category.VideoNetworking]: [Solution.SmartHome, Solution.KindergartenMonitoring, Solution.VehicleIntelligence],
  [Category.SmartNewMedia]: [Solution.CmediaProduction, Solution.MediaManagement],
  [Category.Metaverse]: [Solution.Avatar, Solution.VrLive]
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
  [Solution.EntLive]: '企业直播',
  [Solution.Kodoe]: '私有云存储',
  [Solution.Vcs]: '视频冷存储',
  [Solution.Ess]: '监控视频边缘存储',
  [Solution.Storage]: '云存储一体机',
  [Solution.Apaas]: '音视频低代码工厂',
  [Solution.Avatar]: '数字人解决方案',
  [Solution.InteractMkt]: '互动营销',
  [Solution.Message]: '统一消息触达',
  [Solution.ShowLive]: '秀场/赛事直播',
  [Solution.Image]: '图片处理分发加速',
  [Solution.SmartHome]: '家居视联网',
  [Solution.KindergartenMonitoring]: '智慧幼教',
  [Solution.VehicleIntelligence]: '车载智能',
  [Solution.CmediaProduction]: '智能剪辑',
  [Solution.MediaManagement]: '智能媒资',
  [Solution.VrLive]: 'VR 直播'
} as const

export const urlMap: MapTo<string | null> = {
  [Solution.Qavs]: '/solutions/qavs',
  [Solution.Rtclive]: '/solutions/rtclive',
  [Solution.Plsv]: '/solutions/plsv',
  [Solution.EntLive]: '/solutions/ent-live',
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
  [Solution.Apaas]: '/solutions/apaas',
  [Solution.Avatar]: '/solutions/avatar',
  [Solution.InteractMkt]: '/solutions/interact-mkt',
  [Solution.Message]: '/solutions/message',
  [Solution.ShowLive]: '/solutions/showlive',
  [Solution.Image]: '/solutions/image',
  [Solution.SmartHome]: '/solutions/smarthome',
  [Solution.KindergartenMonitoring]: '/solutions/kindergarten-monitoring',
  [Solution.VehicleIntelligence]: '/solutions/vehicle-intelligence',
  [Solution.CmediaProduction]: '/solutions/cmedia-production',
  [Solution.MediaManagement]: '/solutions/media-management',
  [Solution.VrLive]: '/solutions/vrlive'
} as const

/**
 * TODO: 不应该放 `constants` 里，并且不应该添加 host、更不应该把 host 写死成线上的
 * 现在这么干是因为测试环境数据不全，影响线下测试环境预览效果，最近测试环境比较重要
 */
export function getUrl(solution: Solution, isFullUrl = true): string | null {
  const url = urlMap[solution]
  return url && isFullUrl
    ? `https://www.qiniu.com${url}`
    : url
}

export const descMap: MapTo<string> = {
  [Solution.Qavs]: '集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案',
  [Solution.Rtclive]: '一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线',
  [Solution.Plsv]: '集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案',
  [Solution.EntLive]: '多场景通用、0 开发接入的直播解决方案',
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
  [Solution.Apaas]: '提供易接入、强扩展、高效部署和覆盖多场景的音视频服务，助力企业快速搭建业务平台',
  [Solution.Avatar]: '适用于多场景的虚拟数字人解决方案',
  [Solution.InteractMkt]: '面向互动营销的低代码解决方案',
  [Solution.Message]: '提供了包括短信等多种消息触达客户通道，支持预设消息内容与变量，以进行针对性促活',
  [Solution.ShowLive]: '一站式构建泛娱乐直播服务',
  [Solution.Image]: '提供图片的上传、存储、处理和分发加速的全链路解决方案',
  [Solution.SmartHome]: '为家居物联设备提供音视频低代码接入能力',
  [Solution.KindergartenMonitoring]: '为幼儿教育行业提供一站式远程看护服务，保障儿童健康成长',
  [Solution.VehicleIntelligence]: '连接海量汽车出行数据，助力汽车产业加速迈入智能、网联和共享时代',
  [Solution.CmediaProduction]: '将音视频和深度学习技术应用于海量原始素材剪辑的人工智能解决方案',
  [Solution.MediaManagement]: 'AI 技术与云媒资的有机结合',
  [Solution.VrLive]: 'VR 直播，元宇宙时代下的沉浸式直播服务，身临其境般体验'
} as const

// 32px的icon，默认除导航栏均为该类型
export const iconMap: MapTo<FC<SVGAttributes<SVGElement>> | null> = {
  [Solution.Qavs]: require('./images/default/qavs.svg').default,
  [Solution.Rtclive]: require('./images/default/rtclive.svg').default,
  [Solution.Plsv]: null, // require('./images/default/plsv.svg').default, // TODO: 恢复 icon 但需要检查 /mp/solutions 效果
  [Solution.EntLive]: null, // require('./images/default/entlive.svg').default, // TODO: 恢复 icon 但需要检查 /mp/solutions 效果
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
  [Solution.Apaas]: require('./images/default/apaas.svg').default,
  [Solution.Avatar]: null, // require('./images/default/avatar.svg').default, // TODO: 恢复 icon 但需要检查 /mp/solutions 效果
  [Solution.InteractMkt]: null,
  [Solution.Message]: null,
  [Solution.ShowLive]: null,
  [Solution.Image]: null,
  [Solution.SmartHome]: null,
  [Solution.KindergartenMonitoring]: null,
  [Solution.VehicleIntelligence]: null,
  [Solution.CmediaProduction]: null,
  [Solution.MediaManagement]: null,
  [Solution.VrLive]: null
} as const

// 24px的icon，导航栏使用
export const smallIconMap: MapTo<FC<SVGAttributes<SVGElement>> | null> = {
  [Solution.Qavs]: require('./images/small/qavs.svg').default,
  [Solution.Rtclive]: require('./images/small/rtclive.svg').default,
  [Solution.Plsv]: require('./images/small/plsv.svg').default,
  [Solution.EntLive]: require('./images/small/entlive.svg').default,
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
  [Solution.Apaas]: require('./images/small/apaas.svg').default,
  [Solution.Avatar]: require('./images/small/avatar.svg').default,
  [Solution.InteractMkt]: null,
  [Solution.Message]: null,
  [Solution.ShowLive]: null,
  [Solution.Image]: null,
  [Solution.SmartHome]: null,
  [Solution.KindergartenMonitoring]: null,
  [Solution.VehicleIntelligence]: null,
  [Solution.CmediaProduction]: null,
  [Solution.MediaManagement]: null,
  [Solution.VrLive]: null
} as const

// 96px 的 icon，相关推荐用
export const largeIconMap: MapTo<string | null> = {
  [Solution.Qavs]: null,
  [Solution.Rtclive]: rtcliveLargeIconUrl,
  [Solution.Plsv]: plsvLargeIconUrl,
  [Solution.EntLive]: entliveLargeIconUrl,
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
  [Solution.Apaas]: apaasLargeIconUrl,
  [Solution.Avatar]: avatarLargeIconUrl,
  [Solution.InteractMkt]: null,
  [Solution.Message]: null,
  [Solution.ShowLive]: null,
  [Solution.Image]: null,
  [Solution.SmartHome]: null,
  [Solution.KindergartenMonitoring]: null,
  [Solution.VehicleIntelligence]: null,
  [Solution.CmediaProduction]: null,
  [Solution.MediaManagement]: null,
  [Solution.VrLive]: null
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
