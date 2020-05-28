/**
 * @file 所有产品信息的定义，全局用同一份保证一致
 * @description 包括 id、展示名、页面地址等
 */

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
  /** 人脸核验 */
  FaceID = 'faceid',
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
  [Product.Pili]: '视频直播',
  [Product.Qvm]: '云主机服务 QVM',
  [Product.Sms]: '云短信 SMS',
  [Product.Dora]: '智能多媒体服务',
  [Product.Censor]: '内容审核',
  [Product.FaceID]: '人脸核验',
  [Product.Rtn]: '实时音视频',
  [Product.Plsv]: '短视频 SDK',
  [Product.Plms]: '直播推流 SDK',
  [Product.Insight]: '智能日志管理平台',
  [Product.Express]: '数据分析平台'
}

export const urlMap = {
  [Product.Kodo]: '/products/kodo',
  [Product.Archive]: '/products/kodo', // TODO
  [Product.Hdfs]: null, // 暂未上线
  [Product.Cdn]: '/products/qcdn',
  [Product.Ssl]: '/products/ssl',
  [Product.Pili]: '/products/pili',
  [Product.Qvm]: '/products/qvm',
  [Product.Sms]: '/products/sms',
  [Product.Dora]: '/products/dora',
  [Product.Censor]: '/products/censor',
  [Product.FaceID]: '/products/faceid',
  [Product.Rtn]: '/products/rtn',
  [Product.Plsv]: '/products/plsv',
  [Product.Plms]: '/products/plms',
  [Product.Insight]: '/products/insight',
  [Product.Express]: '/products/pandora'
}

/** 存储与数据湖 */
export const categoryStorage = [
  Product.Kodo,
  Product.Archive
  // HDFS 还没 ready，这里先不放
] as const

/** 基础服务 */
export const categoryService = [
  Product.Cdn,
  Product.Ssl,
  Product.Pili,
  Product.Qvm,
  Product.Sms
] as const

/** 智能视频 */
export const categoryVideo = [
  Product.Dora,
  Product.Censor,
  Product.FaceID,
  Product.Rtn,
  Product.Plsv,
  Product.Plms
] as const

/** 机器数据智能 */
export const categoryIntelligence = [
  Product.Insight,
  Product.Express
] as const
