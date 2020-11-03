/* eslint-disable global-require */

import { FC, SVGAttributes } from 'react'

export enum Industry {
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
  Isp = 'isp'
}

/** 场景解决方案 */
export enum SceneSolution {
  /** 智能视频云 */
  Qavs = 'qavs',
  /** 互动直播 */
  Rtclive = 'rtclive',
  /** 短视频 */
  Plsv = 'plsv',
  /** 私有云存储 */
  Kodoe = 'kodoe',
  /** 视频冷存储 */
  Vcs = 'vcs',
  /** 监控视频边缘存储 */
  Ess = 'ess',
  /** 云存储一体机 */
  Storage = 'storage'
}

/** 行业解决方案 */
export enum IndustrySolution {
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
  Isp = 'isp'
}

/** 行业与其对应的行业解决方案的映射表 */
export const industrySolutionMap = {
  [Industry.Fin]: IndustrySolution.Fin,
  [Industry.Edu]: IndustrySolution.Edu,
  [Industry.Automobile]: IndustrySolution.Automobile,
  [Industry.ECommerce]: IndustrySolution.ECommerce,
  [Industry.IntelligentManufacturing]: IndustrySolution.IntelligentManufacturing,
  [Industry.Social]: IndustrySolution.Social,
  [Industry.Isp]: IndustrySolution.Isp
}

/** 获取行业对应的行业解决方案 */
export function getIndustrySolution(industry: Industry) {
  return industrySolutionMap[industry]
}

export const industryNameMap = {
  [Industry.Edu]: '教育',
  [Industry.Fin]: '金融',
  [Industry.Automobile]: '汽车',
  [Industry.ECommerce]: '电商',
  [Industry.IntelligentManufacturing]: '智能制造',
  [Industry.Social]: '社交',
  [Industry.Isp]: '运营商'
}

export const industryEnNameMap = {
  [Industry.Edu]: 'Education',
  [Industry.Fin]: 'Financial',
  [Industry.Automobile]: 'Automobile',
  [Industry.ECommerce]: 'Retail',
  [Industry.IntelligentManufacturing]: 'Manufacture',
  [Industry.Social]: 'Social',
  [Industry.Isp]: 'Operators'
}

export type Solution = SceneSolution | IndustrySolution

export const Solution = {
  ...SceneSolution,
  ...IndustrySolution
}

export type MapTo<T> = { [s in Solution]: T }

export enum Category {
  Scene = 'scene',
  // eslint-disable-next-line no-shadow
  Industry = 'industry',
}

export const allCategories = [
  Category.Scene,
  Category.Industry
]

export const categoryNameMap = {
  [Category.Scene]: '场景解决方案',
  [Category.Industry]: '行业解决方案'
}

export const categoryEnNameMap = {
  [Category.Scene]: 'Solutions by Scenario',
  [Category.Industry]: 'Solutions by Industry'
}

export const nameMap: MapTo<string> = {
  [Solution.Qavs]: '智能视频云',
  [Solution.Rtclive]: '互动直播',
  [Solution.Plsv]: '短视频',
  [Solution.Kodoe]: '私有云存储',
  [Solution.Vcs]: '视频冷存储',
  [Solution.Ess]: '监控视频边缘存储',
  [Solution.Storage]: '云存储一体机',
  [Solution.Edu]: industryNameMap[Industry.Edu],
  [Solution.Fin]: industryNameMap[Industry.Fin],
  [Solution.Automobile]: industryNameMap[Industry.Automobile],
  [Solution.ECommerce]: industryNameMap[Industry.ECommerce],
  [Solution.IntelligentManufacturing]: industryNameMap[Industry.IntelligentManufacturing],
  [Solution.Social]: industryNameMap[Industry.Social],
  [Solution.Isp]: industryNameMap[Industry.Isp]
}

export const urlMap: MapTo<string | null> = {
  [Solution.Qavs]: '/solutions/qavs',
  [Solution.Rtclive]: '/solutions/rtclive',
  [Solution.Plsv]: '/solutions/plsv',
  [Solution.Kodoe]: '/solutions/kodoe',
  [Solution.Vcs]: '/solutions/vcs',
  [Solution.Ess]: '/solutions/ess',
  [Solution.Storage]: '/solutions/storage',
  [Solution.Edu]: '/solutions/edu',
  [Solution.Fin]: '/solutions/fin',
  [Solution.Automobile]: null,
  [Solution.ECommerce]: '/solutions/ecommerce',
  [Solution.IntelligentManufacturing]: '/solutions/manufacture',
  [Solution.Social]: null,
  [Solution.Isp]: null
}

export const descMap: MapTo<string> = {
  [Solution.Qavs]: '集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案',
  [Solution.Rtclive]: '一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线',
  [Solution.Plsv]: '集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案',
  [Solution.Kodoe]: '为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型',
  [Solution.Vcs]: '专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案',
  [Solution.Ess]: '满足监控视频及图片就近存储、加速传输、倍速播放等关键需求',
  [Solution.Storage]: '开箱即用，预集成 AI 智能服务，低 TCO 的海量存储产品',
  [Solution.Edu]: '以出色的技术能力实现教学全场景覆盖，打造满足不同群体的在线学习解决方案',
  [Solution.Fin]: '帮助金融客户满足监管合规要求，科技创新、流程再造，洞察数据价值',
  [Solution.Automobile]: '助力汽车行业的数字化升级和转型，创新商业模式，数据驱动降本升效',
  [Solution.ECommerce]: '以视频促进转化，用所见带动所得。一站式智能视频云平台，实现场景联动，赋能业务升维',
  [Solution.IntelligentManufacturing]: '帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造',
  [Solution.Social]: '以卓越的大视频能力串联「兴趣-交友-人脉」，解锁社交行业的视频新玩法',
  [Solution.Isp]: '为运营商的中长期架构演进路线提供全方位的技术咨询和一站式方案服务'
}

export const categorySolutionsMap = {
  [Category.Scene]: [Solution.Qavs, Solution.Rtclive, Solution.Plsv, Solution.Kodoe, Solution.Ess, Solution.Storage],
  [Category.Industry]: [
    Solution.Fin, Solution.Edu, Solution.Automobile, Solution.ECommerce,
    Solution.IntelligentManufacturing, Solution.Social, Solution.Isp
  ]
}

export const iconMap: MapTo<FC<SVGAttributes<SVGElement>>> = {
  [Solution.Qavs]: require('./images/scene/qavs.svg').default,
  [Solution.Rtclive]: require('./images/scene/rtclive.svg').default,
  [Solution.Plsv]: require('./images/scene/plsv.svg').default,
  [Solution.Kodoe]: require('./images/scene/kodoe.svg').default,
  [Solution.Vcs]: require('./images/scene/vcs.svg').default,
  [Solution.Ess]: require('./images/scene/ess.svg').default,
  [Solution.Storage]: require('./images/scene/storage.svg').default,
  [Solution.Edu]: require('./images/industry/edu.svg').default,
  [Solution.Fin]: require('./images/industry/fin.svg').default,
  [Solution.Automobile]: require('./images/industry/auto.svg').default,
  [Solution.ECommerce]: require('./images/industry/ec.svg').default,
  [Solution.IntelligentManufacturing]: require('./images/industry/im.svg').default,
  [Solution.Social]: require('./images/industry/social.svg').default,
  [Solution.Isp]: require('./images/industry/isp.svg').default
}

export const allSolutions = allCategories.reduce(
  (solutions, category) => [...solutions, ...categorySolutionsMap[category]],
  [] as Solution[]
)

export function isAvailable(solution: Solution) {
  return urlMap[solution] != null
}

/** 所有**可用**的解决方案（有落地页） */
export const allAvailableSolutions = allSolutions.filter(isAvailable)
