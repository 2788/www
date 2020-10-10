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
  Cdn = 'qcdn',
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
  Express = 'express',
  /** 视频监控 */
  Qvs = 'qvs',
  /** Open API */
  OpenAPI = 'openapi',
  /** 票证自动识别（OCR） */
  Ocr = 'ocr',
  /** 存储一体机 */
  Storage = 'storage',
  /** PCDN */
  Pcdn = 'pcdn',
  /** 直播特效 SDK */
  Plesdk = 'plesdk',
}

// TODO: 这个再核对一遍
// https://cf.qiniu.io/pages/viewpage.action?pageId=39838262&src=contextnavpagetreemode
export const nameMap = {
  [Product.Kodo]: '对象存储 Kodo',
  [Product.Archive]: '归档存储',
  [Product.Hdfs]: 'HDFS',
  [Product.Cdn]: 'CDN',
  [Product.Ssl]: 'SSL 证书',
  [Product.Pili]: '视频直播 Pili',
  [Product.Qvm]: '云主机服务 QVM',
  [Product.Sms]: '云短信 SMS',
  [Product.Dora]: '智能多媒体服务',
  [Product.Censor]: '内容审核',
  [Product.FaceID]: '人脸核验',
  [Product.Rtn]: '实时音视频',
  [Product.Plsv]: '短视频 SDK',
  [Product.Plms]: '直播推流 SDK',
  [Product.Insight]: '智能日志管理平台',
  [Product.Express]: '机器数据分析平台 Pandora',
  [Product.Qvs]: '视频监控 QVS',
  [Product.OpenAPI]: 'Open API',
  [Product.Ocr]: '票证自动识别 OCR',
  [Product.Storage]: '云存储一体机',
  [Product.Pcdn]: 'PCDN',
  [Product.Plesdk]: '直播特效 SDK'
} as const

export const urlMap = {
  [Product.Kodo]: '/products/kodo',
  [Product.Archive]: '/products/kodo#storage_type',
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
  [Product.Express]: '/products/pandora',
  [Product.Qvs]: '/products/qvs',
  [Product.OpenAPI]: '/products/openapi',
  [Product.Ocr]: '/products/ocr',
  [Product.Storage]: '/products/storage',
  [Product.Pcdn]: '/products/pcdn',
  [Product.Plesdk]: '/products/plesdk'
} as const

export const priceUrlMap = {
  [Product.Kodo]: '/prices/kodo',
  [Product.Archive]: null,
  [Product.Hdfs]: null,
  [Product.Cdn]: '/prices/qcdn',
  [Product.Ssl]: '/prices/ssl',
  [Product.Pili]: '/prices/pili',
  [Product.Qvm]: '/prices/qvm',
  [Product.Sms]: '/prices/sms',
  [Product.Dora]: '/prices/dora',
  [Product.Censor]: '/prices/censor',
  [Product.FaceID]: '/prices/faceid',
  [Product.Rtn]: '/prices/rtc',
  [Product.Plsv]: '/products/plsv#price',
  [Product.Plms]: null,
  [Product.Insight]: null,
  [Product.Express]: null,
  [Product.Qvs]: '/prices/qvs',
  [Product.OpenAPI]: '/prices/openapi',
  [Product.Ocr]: null,
  [Product.Storage]: null,
  [Product.Pcdn]: null,
  [Product.Plesdk]: null
} as const

export const descMap = {
  [Product.Kodo]: '高可用、易扩展、低成本、一站式、支持边缘存储',
  [Product.Archive]: '极低成本、高可靠性的归档数据存储服务',
  [Product.Hdfs]: '', // 暂未上线

  [Product.Cdn]: '优质节点、可监控、智能调度的内容分发服务',
  [Product.Ssl]: '提供 SSL 证书申请、管理等一站式服务',
  [Product.Pili]: '提供全球化实时流服务和端到端直播场景解决方案',
  [Product.Qvm]: '提供云主机、负载均衡、云数据库、高防等服务',
  [Product.Sms]: '致力于为用户提供快捷高效的通信服务能力',

  [Product.Dora]: '提供云端图片、音视频基础处理、丰富的人工智能服务',
  [Product.Censor]: '提供图片、视频等内容的审核服务，精准识别过滤色情、暴恐、敏感人物等违规内容',
  [Product.Rtn]: '基于 WebRTC 的一站式解决方案，零基础搭建音视频平台',
  [Product.Plsv]: '集合视频拍摄、编辑、上传等全套功能，快速打造手机 Vlog 制作神器',
  [Product.Plms]: '支持手机端 RTMP & QUIC 推流，简单易上手，马上开播',
  [Product.FaceID]: '利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证',
  [Product.Qvs]: '面向视频监控设备提供视频流接入、存储、分发服务',

  [Product.Insight]: '海量异构数据采集，秒级实时日志检索，高效智能业务洞察',
  [Product.Express]: '助力企业探索数据、创造价值、预见未来',
  // TODO 需要加入到顶部导航再补充
  [Product.OpenAPI]: '',
  [Product.Ocr]: '提供车险保单识别，营业执照识别等票证识别服务，帮助解决信息结构化问题',
  [Product.Storage]: '开箱即用，预集成 AI 智能服务，低 TCO 的海量存储产品',
  [Product.Pcdn]: '高质量低成本的 P2P CDN 服务，有效提升热点资源的分发效果',
  [Product.Plesdk]: ''
} as const

export enum Category {
  Service = 'service',
  Vision = 'vision',
  Intelligence = 'intelligence'
}

/** 基础服务 */
export const categoryService = [
  Product.Qvm,
  Product.Kodo,
  Product.Archive,
  Product.Cdn,
  Product.Pcdn,
  Product.Ssl,
  Product.Pili,
  Product.Sms,
  Product.Storage
] as const

/** 智能视频 */
export const categoryVideo = [
  Product.Dora,
  Product.Censor,
  Product.FaceID,
  Product.Ocr,
  Product.Pili,
  Product.Rtn,
  Product.Plsv,
  Product.Plms,
  Product.Qvs
] as const

/** 机器数据智能 */
export const categoryIntelligence = [
  Product.Express,
  Product.Kodo,
  Product.Archive,
  Product.Hdfs
] as const

export const categoryProductsMap: { [c in Category]: readonly Product[] } = {
  [Category.Service]: categoryService,
  [Category.Vision]: categoryVideo,
  [Category.Intelligence]: categoryIntelligence
}

export const categoryNameMap = {
  [Category.Service]: '基础服务',
  [Category.Vision]: '视觉数据智能',
  [Category.Intelligence]: '机器数据智能'
} as const

export const categoryEnNameMap = {
  [Category.Service]: 'Cloud Essentials',
  [Category.Vision]: 'CV Data Intelligence',
  [Category.Intelligence]: 'Machine Data Intelligence'
} as const

export const categories = [
  Category.Service,
  Category.Vision,
  Category.Intelligence
] as const
