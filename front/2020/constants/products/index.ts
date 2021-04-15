/**
 * @file 所有产品信息的定义，全局用同一份保证一致
 * @description 包括 id、展示名、页面地址等
 */

import { Landpage, urlMap as landUrlMap } from '../landpage'

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
  /** 云数据库 */
  CloudSql = 'cloudSql',
  /** Ddos */
  Ddos = 'ddos',
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
  /** PCDN */
  Pcdn = 'pcdn',
  /** 直播特效 SDK */
  Plesdk = 'plesdk',
  /** 低延时直播 Geek */
  Geek = 'geek',
  /** 视频智能分析 */
  Vii = 'vii',
  /** 播放器 SDK */
  QnPlayer = 'qnPlayer',
  /** 短视频特效 SDK */
  Svesdk = 'svesdk',
  /** 智能语音 */
  Voice = 'voice'
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
  [Product.CloudSql]: '云数据库',
  [Product.Ddos]: 'DDoS 高防',
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
  [Product.Pcdn]: 'PCDN',
  [Product.Plesdk]: '直播特效 SDK',
  [Product.Geek]: '低延时直播 Geek',
  [Product.Vii]: '视频智能分析',
  [Product.QnPlayer]: '播放器 SDK',
  [Product.Svesdk]: '短视频特效 SDK',
  [Product.Voice]: '智能语音'
} as const

export const urlMap = {
  [Product.Kodo]: '/products/kodo',
  [Product.Archive]: '/products/kodo#storage_type',
  [Product.Hdfs]: null, // 暂未上线
  [Product.Cdn]: '/products/qcdn',
  [Product.Ssl]: '/products/ssl',
  [Product.Pili]: '/products/pili',
  [Product.Qvm]: '/products/qvm',
  [Product.CloudSql]: '/products/cloud-sql',
  [Product.Ddos]: '/products/ddos',
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
  [Product.Pcdn]: '/products/pcdn',
  [Product.Plesdk]: '/products/plesdk',
  [Product.Geek]: '/products/geek',
  [Product.Vii]: '/products/vii',
  [Product.QnPlayer]: '/products/qnplayer',
  [Product.Svesdk]: '/products/svesdk',
  [Product.Voice]: '/products/voice'
} as const

export const priceUrlMap = {
  [Product.Kodo]: '/prices/kodo',
  [Product.Archive]: null,
  [Product.Hdfs]: null,
  [Product.Cdn]: '/prices/qcdn',
  [Product.Ssl]: '/prices/ssl',
  [Product.Pili]: '/prices/pili',
  [Product.Qvm]: '/prices/qvm',
  [Product.CloudSql]: null,
  [Product.Ddos]: null,
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
  [Product.Pcdn]: null,
  [Product.Plesdk]: null,
  [Product.Geek]: null,
  [Product.Vii]: null,
  [Product.QnPlayer]: null,
  [Product.Svesdk]: null,
  [Product.Voice]: null
} as const

export const descMap = {
  [Product.Kodo]: '高可用、易扩展、低成本、一站式、支持边缘存储',
  [Product.Archive]: '极低成本、高可靠性的归档数据存储服务',
  [Product.Hdfs]: '', // 暂未上线

  [Product.Cdn]: '优质节点、可监控、智能调度的内容分发服务',
  [Product.Ssl]: '提供 SSL 证书申请、管理等一站式服务',
  [Product.Pili]: '提供全球化实时流服务和端到端直播场景解决方案',
  [Product.Qvm]: '提供云主机、负载均衡、云数据库、高防等服务',
  [Product.CloudSql]: '高性能、高可靠、可灵活伸缩的数据库托管服务',
  [Product.Ddos]: '拥有可信赖的 DDoS 防护体系，可为不同行业提供多种安全解决方案',
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
  [Product.Pcdn]: '高质量低成本的 P2P CDN 服务，有效提升热点资源的分发效果',
  [Product.Plesdk]: '提供直播推流场景下的美颜滤镜、大眼瘦脸、美妆美形等特效功能',
  [Product.Geek]: '构建了全新的低延时直播互动体验',
  [Product.Vii]: '通过视频、图片、音频的多维理解，实现多媒体内容的管理，搜索和推荐',
  [Product.QnPlayer]: '全自研点直播多媒体播放器',
  [Product.Svesdk]: '',
  [Product.Voice]: '基于语音识别、语音合成、声纹识别、自然语言理解等技术，实现智能语音交互'
} as const

export enum Category {
  Service = 'service',
  Vision = 'vision',
  Intelligence = 'intelligence'
}

export enum SubCategory {
  ServiceStorage = 'service-storage',
  ServiceDistribution = 'service-distribution',
  ServiceBasis = 'service-basis',
  VisionStoDist = 'vision-stoDist',
  VisionPlatform = 'vision-platform',
  VisionLiveBroadcast = 'vision-liveBroadcast',
  IntelligenceStoDist = 'intelligence-stoDist',
  IntelligencePlatform = 'intelligence-platform'
}

export const subCategoryNameMap = {
  [SubCategory.ServiceStorage]: '云存储',
  [SubCategory.ServiceDistribution]: '云分发',
  [SubCategory.ServiceBasis]: '云基础',
  [SubCategory.VisionStoDist]: '存储与分发',
  [SubCategory.VisionPlatform]: '视觉数据分析平台',
  [SubCategory.VisionLiveBroadcast]: '互动直播',
  [SubCategory.IntelligenceStoDist]: '存储与分发',
  [SubCategory.IntelligencePlatform]: '机器数据分析平台'
} as const

// 次级标题链接
export const subCategoryUrlMap: { [s in SubCategory]?: string } = {
  [SubCategory.VisionPlatform]: landUrlMap[Landpage.Dora]
}

export const subCategoryProductsMap: { [s in SubCategory]: readonly Product[] } = {
  [SubCategory.ServiceStorage]: [Product.Kodo, Product.Archive],
  [SubCategory.ServiceDistribution]: [Product.Cdn, Product.Pcdn, Product.Ssl],
  [SubCategory.ServiceBasis]: [Product.Qvm, Product.CloudSql, Product.Ddos, Product.Sms],
  [SubCategory.VisionStoDist]: [Product.Kodo, Product.Cdn],
  [SubCategory.VisionPlatform]: [Product.Dora, Product.Censor, Product.FaceID, Product.Ocr, Product.Vii, Product.Voice],
  [SubCategory.VisionLiveBroadcast]:
    [Product.Pili, Product.Geek, Product.Rtn, Product.Plsv, Product.Plms, Product.QnPlayer, Product.Qvs],
  [SubCategory.IntelligenceStoDist]: [Product.Kodo, Product.Cdn, Product.Hdfs],
  [SubCategory.IntelligencePlatform]: [Product.Express]
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
  Product.CloudSql,
  Product.Ddos,
  Product.Sms
] as const

/** 视觉数据智能 */
export const categoryVision = [
  Product.Dora,
  Product.Censor,
  Product.FaceID,
  Product.Ocr,
  Product.Vii,
  Product.Voice,
  Product.Pili,
  Product.Geek,
  Product.Rtn,
  Product.Plsv,
  Product.Plms,
  Product.QnPlayer,
  Product.Qvs
] as const

/** 机器数据智能 */
export const categoryIntelligence = [
  Product.Express,
  Product.Kodo,
  Product.Archive,
  Product.Hdfs
] as const

export const categorySubCategoriesMap: { [c in Category]: readonly SubCategory[] } = {
  [Category.Service]: [SubCategory.ServiceStorage, SubCategory.ServiceDistribution, SubCategory.ServiceBasis],
  [Category.Vision]: [SubCategory.VisionStoDist, SubCategory.VisionPlatform, SubCategory.VisionLiveBroadcast],
  [Category.Intelligence]:
    [SubCategory.IntelligenceStoDist, SubCategory.IntelligencePlatform]
}

export function getCategoryProducts(category: Category): Product[] {
  return categorySubCategoriesMap[category].reduce(
    (accumulator, current) => [...accumulator, ...subCategoryProductsMap[current]],
    [] as Product[]
  )
}

export const categoryProductsMap: { [c in Category]: readonly Product[] } = {
  [Category.Service]: categoryService,
  [Category.Vision]: categoryVision,
  [Category.Intelligence]: categoryIntelligence
}

export const categoryNameMap = {
  [Category.Service]: '基础能力',
  [Category.Vision]: '智能多媒体数据处理平台',
  [Category.Intelligence]: '机器数据处理平台'
} as const

export const categoryNameMapForMp = {
  [Category.Vision]: '视觉数据智能',
  [Category.Intelligence]: '机器数据智能',
  [Category.Service]: '基础服务'
} as const

export const categoryEnNameMap = {
  [Category.Service]: 'Cloud Essentials',
  [Category.Vision]: 'Media PaaS',
  [Category.Intelligence]: 'Data PaaS'
} as const

export const categories = [
  Category.Vision,
  Category.Intelligence,
  Category.Service
] as const
