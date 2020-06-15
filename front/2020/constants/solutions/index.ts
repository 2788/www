import { FC } from 'react'

/* eslint-disable global-require */
export enum Solution {
  // 智能视频云
  Qavs = 'qavs',
  // 短视频
  Plsv = 'plsv',
  // 私有云
  Kodoe = 'kodoe',
  // 视频冷存储
  Vcs = 'vcs',
  // 监控视频
  Ess = 'ess'
}

export enum Category {
  Scene = 'scene',
  Industry = 'industry',
}

export const categoryNameMap = {
  [Category.Scene]: '场景解决方案',
  [Category.Industry]: '行业解决方案'
}

export const nameMap = {
  [Solution.Qavs]: '智能视频云解决方案',
  [Solution.Plsv]: '短视频解决方案',
  [Solution.Kodoe]: '私有云存储解决方案',
  [Solution.Vcs]: '视频冷存储解决方案',
  [Solution.Ess]: '监控视频边缘存储解决方案'
}

export const urlMap = {
  [Solution.Qavs]: '/solutions/qavs',
  [Solution.Plsv]: '/solutions/plsv',
  [Solution.Kodoe]: '/solutions/kodoe',
  [Solution.Vcs]: '/solutions/vcs',
  [Solution.Ess]: '/solutions/ess'
}

export const descMap = {
  [Solution.Qavs]: '集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案',
  [Solution.Plsv]: '集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案',
  [Solution.Kodoe]: '为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型',
  [Solution.Vcs]: '专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案',
  [Solution.Ess]: '满足监控视频及图片就近存储、加速传输、倍速播放等关键需求'
}

export const category = {
  [Category.Scene]: [Solution.Qavs, Solution.Plsv, Solution.Kodoe, Solution.Vcs],
  [Category.Industry]: [Solution.Ess]
}

export const iconMap: { [key in Solution]: FC } = {
  [Solution.Qavs]: require('./images/scene/qavs.svg').default,
  [Solution.Plsv]: require('./images/scene/plsv.svg').default,
  [Solution.Kodoe]: require('./images/scene/kodoe.svg').default,
  [Solution.Vcs]: require('./images/scene/vcs.svg').default,
  [Solution.Ess]: require('./images/industry/ess.svg').default
}
