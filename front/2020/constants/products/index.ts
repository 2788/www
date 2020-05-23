/**
 * @file 所有产品信息的定义，全局用同一份保证一致
 * @description 包括 id、展示名、页面地址等
 */

// TODO: 考虑要不要把大类信息（存储与数据湖、基础服务等）也拿进来定义

export enum Product {
  /** 对象存储 Kodo */
  Kodo = 'kodo',
  /** 归档存储 */
  Archive = 'archive',
  /** HDFS */
  Hdfs = 'hdfs',
  /** CDN */
  Cdn = 'cdn',
  /** SSL 证书 */
  Ssl = 'ssl',
  /** 直播 */
  Pili = 'pili',
  /** 云主机 */
  Qvm = 'qvm',
  /** 云短信 */
  Sms = 'sms',
  /** 智能多媒体服务 */
  Dora = 'dora',
  /** 内容安全 */
  Censor = 'censor',
  /** 实时音视频 */
  Rtn = 'rtn',
  /** 短视频 SDK */
  Plsv = 'plsv',
  /** 推流 SDK */
  Plms = 'plms',
  /** 智能日志管理平台 */
  Insight = 'insight',
  /** 机器数据分析平台 */
  Express = 'express'
}

// TODO: 这个再核对一遍
// https://cf.qiniu.io/pages/viewpage.action?pageId=39838262&src=contextnavpagetreemode
export const nameMap = {
  [Product.Kodo]: '对象存储 Kodo',
  [Product.Archive]: '归档存储',
  [Product.Hdfs]: 'HDFS',
  [Product.Cdn]: 'CDN',
  [Product.Ssl]: 'SSL 证书',
  [Product.Pili]: '直播',
  [Product.Qvm]: '云主机',
  [Product.Sms]: '云短信',
  [Product.Dora]: '智能多媒体服务',
  [Product.Censor]: '内容安全',
  [Product.Rtn]: '实时音视频',
  [Product.Plsv]: '短视频 SDK',
  [Product.Plms]: '推流 SDK',
  [Product.Insight]: '智能日志管理平台',
  [Product.Express]: '机器数据分析平台'
}

export const urlMap = {
  [Product.Kodo]: '/products/kodo',
  [Product.Archive]: '/products/kodo', // TODO
  [Product.Hdfs]: null, // 暂未上线
  [Product.Cdn]: '/products/cdn',
  [Product.Ssl]: '/products/ssl',
  [Product.Pili]: '/products/pili',
  [Product.Qvm]: '/products/qvm',
  [Product.Sms]: '/products/sms',
  [Product.Dora]: '/products/dora',
  [Product.Censor]: '/products/censor',
  [Product.Rtn]: '/products/rtn',
  [Product.Plsv]: '/products/plsv',
  [Product.Plms]: '/products/plms',
  [Product.Insight]: '/products/insight',
  [Product.Express]: '/products/express'
}
