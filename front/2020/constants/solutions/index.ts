import { FC, SVGAttributes } from 'react'

/* eslint-disable global-require */
export enum Solution {
  /** 智能视频云 */
  Qavs = 'qavs',
  /** 短视频 */
  Plsv = 'plsv',
  /** 私有云 */
  Kodoe = 'kodoe',
  /** 视频冷存储 */
  Vcs = 'vcs',
  /** 监控视频 */
  Ess = 'ess',
  /** 教育行业 */
  Edu = 'edu',
  /** 金融行业 */
  Fin = 'fin'
}

export type MapTo<T> = { [s in Solution]: T }

export const allSolutions = [
  Solution.Qavs, Solution.Plsv, Solution.Kodoe, Solution.Vcs,
  Solution.Ess, Solution.Edu, Solution.Fin
]

export enum Category {
  Scene = 'scene',
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
  [Solution.Plsv]: '短视频',
  [Solution.Kodoe]: '私有云存储',
  [Solution.Vcs]: '视频冷存储',
  [Solution.Ess]: '监控视频边缘存储',
  [Solution.Edu]: '教育',
  [Solution.Fin]: '金融'
}

export const urlMap: MapTo<string> = {
  [Solution.Qavs]: '/solutions/qavs',
  [Solution.Plsv]: '/solutions/plsv',
  [Solution.Kodoe]: '/solutions/kodoe',
  [Solution.Vcs]: '/solutions/vcs',
  [Solution.Ess]: '/solutions/ess',
  [Solution.Edu]: '/solutions/edu',
  [Solution.Fin]: '/solutions/fin'
}

export const descMap: MapTo<string> = {
  [Solution.Qavs]: '集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案',
  [Solution.Plsv]: '集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案',
  [Solution.Kodoe]: '为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型',
  [Solution.Vcs]: '专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案',
  [Solution.Ess]: '满足监控视频及图片就近存储、加速传输、倍速播放等关键需求',
  [Solution.Edu]: '以出色的技术能力实现教学全场景覆盖，打造满足不同群体的在线学习解决方案',
  [Solution.Fin]: '帮助金融客户满足监管合规要求，科技创新、流程再造，洞察数据价值'
}

export const categorySolutionsMap = {
  [Category.Scene]: [Solution.Qavs, Solution.Plsv, Solution.Kodoe, Solution.Vcs],
  [Category.Industry]: [Solution.Ess, Solution.Edu, Solution.Fin]
}

export const iconMap: MapTo<FC<SVGAttributes<SVGElement>>> = {
  [Solution.Qavs]: require('./images/scene/qavs.svg').default,
  [Solution.Plsv]: require('./images/scene/plsv.svg').default,
  [Solution.Kodoe]: require('./images/scene/kodoe.svg').default,
  [Solution.Vcs]: require('./images/scene/vcs.svg').default,
  [Solution.Ess]: require('./images/industry/ess.svg').default,
  [Solution.Edu]: require('./images/industry/ess.svg').default, // TODO: 补充教育的 icon
  [Solution.Fin]: require('./images/industry/ess.svg').default // TODO: 补充金融的 icon
}
