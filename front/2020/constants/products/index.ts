import { Landpage, urlMap as landpageUrlMap } from 'constants/landpage'
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
  /** 云数据库 */
  CloudSql = 'cloudSql',
  /** Ddos */
  Ddos = 'ddos',
  /** 云短信 */
  Sms = 'sms',
  /** 智能多媒体服务 */
  Dora = 'dora',
  /** 音视频处理 */
  DoraAudio = 'doraAudio',
  /** 图片处理 */
  DoraImage = 'doraImage',
  /** 内容审核 */
  Censor = 'censor',
  /** 人脸核验 */
  FaceID = 'faceid',
  /** 智能风控 */
  RiskControl = 'riskcontrol',
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
  /** AI 开放市场 */
  OpenAPI = 'openapi',
  /** 票证自动识别（OCR） */
  Ocr = 'ocr',
  /** 全站加速 */
  Dcdn = 'dcdn',
  /** 边缘加速 */
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
  Voice = 'voice',
  /** 存储一体机 */
  Storage = 'storage',
  /** 锐智转码 */
  Avsmart = 'avsmart',
  /** 美颜特效 SDK */
  Beautysdk = 'beautysdk',
  /** 语音合成 */
  Tts = 'tts',
  /** Web 应用防火墙 */
  WAF = 'waf',
  /** 音画质量分析 */
  Qoe = 'qoe',
  /** 专有云计算 */
  Qec = 'qec',
  /** 文档处理 */
  Document = 'document',
  /** 画质增强 */
  Enhancement = 'enhancement'
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
  [Product.DoraAudio]: '音视频处理',
  [Product.DoraImage]: '图片处理',
  [Product.Censor]: '内容审核',
  [Product.FaceID]: '人脸核验',
  [Product.RiskControl]: '智能风控',
  [Product.Rtn]: '实时音视频 QRTC',
  [Product.Plsv]: '短视频 SDK',
  [Product.Plms]: '直播推流 SDK',
  [Product.Insight]: '智能日志管理平台',
  [Product.Express]: '机器数据分析平台 Pandora',
  [Product.Qvs]: '视频监控 QVS',
  [Product.OpenAPI]: 'AI 开放市场',
  [Product.Ocr]: '票证自动识别 OCR',
  [Product.Dcdn]: '全站加速',
  [Product.Pcdn]: '边缘加速',
  [Product.Plesdk]: '直播特效 SDK',
  [Product.Geek]: '低延时直播 Geek',
  [Product.Vii]: '视频智能分析',
  [Product.QnPlayer]: '播放器 SDK',
  [Product.Svesdk]: '短视频特效 SDK',
  [Product.Voice]: '智能语音',
  [Product.Storage]: '云存储一体机',
  [Product.Avsmart]: '锐智转码 2.0',
  [Product.Beautysdk]: '美颜特效 SDK',
  [Product.Tts]: '语音合成',
  [Product.WAF]: 'Web 应用防火墙',
  [Product.Qoe]: '音画质量分析',
  [Product.Qec]: '专有云计算',
  [Product.Document]: '文档处理',
  [Product.Enhancement]: '画质增强'
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
  [Product.DoraAudio]: '/products/dora#functions',
  [Product.DoraImage]: '/products/dora#functions',
  [Product.Censor]: '/products/censor',
  [Product.FaceID]: '/products/faceid',
  [Product.RiskControl]: '/products/risk-control',
  [Product.Rtn]: '/products/rtn',
  [Product.Plsv]: '/products/plsv',
  [Product.Plms]: '/products/plms',
  [Product.Insight]: '/products/insight',
  [Product.Express]: '/products/pandora',
  [Product.Qvs]: '/products/qvs',
  [Product.OpenAPI]: '/products/openapi',
  [Product.Ocr]: '/products/ocr',
  [Product.Dcdn]: '/products/dcdn',
  [Product.Pcdn]: '/products/pcdn',
  [Product.Plesdk]: '/products/plesdk',
  [Product.Geek]: '/products/geek',
  [Product.Vii]: '/products/vii',
  [Product.QnPlayer]: '/products/qnplayer',
  [Product.Svesdk]: '/products/svesdk',
  [Product.Voice]: '/products/voice',
  [Product.Storage]: '/products/storage',
  [Product.Avsmart]: '/products/avsmart',
  [Product.Beautysdk]: '/products/beautysdk',
  [Product.Tts]: '/products/tts',
  [Product.WAF]: '/products/waf',
  [Product.Qoe]: '/products/qoe',
  [Product.Qec]: '/products/qec',
  [Product.Document]: '/products/document',
  [Product.Enhancement]: '/products/enhancement'
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
  [Product.DoraAudio]: null,
  [Product.DoraImage]: null,
  [Product.Censor]: '/prices/censor',
  [Product.FaceID]: '/prices/faceid',
  [Product.RiskControl]: '/prices/risk-control',
  [Product.Rtn]: '/prices/rtc',
  [Product.Plsv]: '/prices/plsv',
  [Product.Plms]: null,
  [Product.Insight]: null,
  [Product.Express]: null,
  [Product.Qvs]: '/prices/qvs',
  [Product.OpenAPI]: '/prices/openapi',
  [Product.Ocr]: '/prices/ocr',
  [Product.Dcdn]: null,
  [Product.Pcdn]: null,
  [Product.Plesdk]: null,
  [Product.Geek]: null,
  [Product.Vii]: '/prices/vii',
  [Product.QnPlayer]: null,
  [Product.Svesdk]: null,
  [Product.Voice]: '/prices/voice',
  [Product.Storage]: null,
  [Product.Avsmart]: null,
  [Product.Beautysdk]: null,
  [Product.Tts]: '/prices/tts',
  [Product.WAF]: null,
  [Product.Qoe]: null,
  [Product.Qec]: null,
  [Product.Document]: null,
  [Product.Enhancement]: null
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
  [Product.DoraAudio]: '提供高性能的转码、切片、分段、拼接、截帧、水印等音视频处理接口',
  [Product.DoraImage]: '提供高可用的图片格式转换、缩放、裁剪、旋转、水印、拼接等图片处理接口',
  [Product.Censor]: '提供图片、视频等内容的审核服务，精准识别过滤色情、暴恐、敏感人物等违规内容',
  [Product.Rtn]: '基于 WebRTC 的一站式解决方案，零基础搭建音视频平台',
  [Product.Plsv]: '集合视频拍摄、编辑、上传等全套功能，快速打造手机 Vlog 制作神器',
  [Product.Plms]: '支持手机端 RTMP & QUIC 推流，简单易上手，马上开播',
  [Product.FaceID]: '利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证',
  [Product.RiskControl]: '精准识别业务风险和欺诈问题，助力企业建立全流程风控体系',
  [Product.Qvs]: '面向视频监控设备提供视频流接入、存储、分发服务',

  [Product.Insight]: '海量异构数据采集，秒级实时日志检索，高效智能业务洞察',
  [Product.Express]: '助力企业探索数据、创造价值、预见未来',
  // TODO 需要加入到顶部导航或者相关产品再补充
  [Product.OpenAPI]: 'AI 开放市场是一个开放平台，提供图片，文本，音频，视频等智能数据处理服务',
  [Product.Ocr]: '提供车险保单识别，营业执照识别等票证识别服务，帮助解决信息结构化问题',
  [Product.Dcdn]: '简单配置即可实现全站资源的加速',
  [Product.Pcdn]: '高质量低成本的 P2P CDN 服务，有效提升热点资源的分发效果',
  [Product.Plesdk]: '提供直播推流场景下的美颜滤镜、大眼瘦脸、美妆美形等特效功能',
  [Product.Geek]: '构建了全新的低延时直播互动体验',
  [Product.Vii]: '通过视频、图片、音频的多维理解，实现多媒体内容的管理，搜索和推荐',
  [Product.QnPlayer]: '全自研点直播多媒体播放器',
  [Product.Svesdk]: '',
  [Product.Voice]: '基于语音识别、语音合成、声纹识别、自然语言理解等技术，实现智能语音交互',
  [Product.Storage]: '开箱即用，预集成 AI 智能服务，低 TCO 的海量存储产品',
  [Product.Avsmart]: '更低的码率，更清晰的画质',
  [Product.Beautysdk]: '丰富多样的美颜特效功能，广泛应用于各类图像、视频与互动直播等场景',
  [Product.Tts]: '采用先进的深度神经网络模型技术，将文本转化成拟人化语音',
  [Product.WAF]: '有效防御各类 OWASP 常见 Web 攻击并过滤海量恶意 CC 攻击',
  [Product.Qoe]: '领先的基于深度学习的智能音画质量分析系统',
  [Product.Qec]: '针对企业级市场使用特点，为客户量身打造的开放、统一、可信的云计算平台',
  [Product.Document]: '基于文档预览，文档转换，文档翻译等技术，对文档实现智能处理',
  [Product.Enhancement]: '基于七牛领先的深度学习技术，提供视频画质增强服务'
} as const

export enum Category {
  Service = 'service',
  Media = 'media',
  Data = 'data'
}

export enum SubCategory {
  Storage = 'storage',
  Distribution = 'distribution',
  Basis = 'basis',
  Audio = 'audio',
  LiveBroadcast = 'liveBroadcast',
  Dora = 'dora',
  Sdk = 'sdk',
  Platform = 'platform'
}

export const subCategoryNameMap = {
  [SubCategory.Storage]: '云存储',
  [SubCategory.Distribution]: '云分发',
  [SubCategory.Basis]: '云基础',
  [SubCategory.Audio]: '音视频点播',
  [SubCategory.LiveBroadcast]: '直播与实时互动',
  [SubCategory.Dora]: '智能多媒体服务',
  [SubCategory.Sdk]: '客户端 SDK',
  [SubCategory.Platform]: '机器数据分析平台'
} as const

// 次级标题链接
export const subCategoryUrlMap: { [s in SubCategory]?: string } = {
  [SubCategory.Dora]: urlMap[Product.Dora],
  [SubCategory.Sdk]: landpageUrlMap[Landpage.Sdk]
}

// 定价次级标题链接
export const subCategoryUrlMapForPrice: { [s in SubCategory]?: string } = {
  [SubCategory.Dora]: priceUrlMap[Product.Dora]
}

export type ProductData = {
  product: Product
  name: string
  desc: string
  url: string | null
}

export type PartialProductData = Product | {
  product: Product
  name?: string
  desc?: string
  url?: string | null
}

export function normalizeProduct(val: Product | PartialProductData): ProductData {
  if (typeof val === 'string') {
    return {
      product: val,
      name: nameMap[val],
      desc: descMap[val],
      url: urlMap[val]
    }
  }
  return { name: nameMap[val.product], desc: descMap[val.product], url: urlMap[val.product], ...val }
}

export const subCategoryProductsMap: { [s in SubCategory]: PartialProductData[] } = {
  [SubCategory.Storage]: [Product.Kodo, Product.Archive, Product.Storage, Product.Hdfs],
  [SubCategory.Distribution]: [Product.Cdn, Product.Dcdn, Product.Pcdn, Product.Ssl],
  [SubCategory.Basis]: [Product.Qvm, Product.Qec, Product.CloudSql, Product.Ddos, Product.WAF, Product.Sms],
  [SubCategory.Audio]: [
    { product: Product.Kodo, name: '音视频存储', desc: '为音视频多媒体数据提供高可靠、高可用和高性能的对象存储服务' },
    Product.DoraAudio,
    { product: Product.Cdn, name: '点播加速', desc: '通过全方位的 CDN 质量监控和智能节点调度，提供音视频点播优化加速服务' }
  ],
  [SubCategory.LiveBroadcast]: [Product.Pili, Product.Geek, Product.Rtn, Product.Qvs],
  [SubCategory.Dora]: [
    Product.DoraImage, Product.Document, Product.Avsmart, Product.Censor,
    Product.FaceID, Product.Ocr, Product.Vii, Product.Voice, Product.Qoe,
    Product.RiskControl, Product.Enhancement, Product.OpenAPI
  ],
  [SubCategory.Sdk]: [Product.Plsv, Product.Plms, Product.QnPlayer, Product.Beautysdk],
  [SubCategory.Platform]: [Product.Express]
}

export const categorySubCategoriesMap: { [c in Category]: readonly SubCategory[] } = {
  [Category.Service]: [SubCategory.Storage, SubCategory.Distribution, SubCategory.Basis],
  [Category.Media]: [
    SubCategory.Audio, SubCategory.LiveBroadcast, SubCategory.Dora,
    SubCategory.Sdk, SubCategory.Storage, SubCategory.Distribution
  ],
  [Category.Data]: [SubCategory.Storage, SubCategory.Platform]
}

export function getSubCategoryProducts(category: Category, subCategory: SubCategory) {
  // 二级目录云存储在不同一级目录下，内部的产品不一样，所以这边特殊处理一下
  if (subCategory === SubCategory.Storage) {
    switch (category) {
      case Category.Service:
        return [Product.Kodo, Product.Archive]
      case Category.Media:
        return [Product.Kodo, Product.Storage]
      case Category.Data:
        return [Product.Kodo, Product.Hdfs]
      default:
        // 默认返回全部的云存储产品
        return subCategoryProductsMap[subCategory]
    }
  }
  // 二级目录云分发在不同一级目录下，内部的产品不一样，所以这边特殊处理一下
  if (subCategory === SubCategory.Distribution) {
    switch (category) {
      case Category.Media:
        return [Product.Cdn, Product.Dcdn, Product.Pcdn]
      default:
        // 默认返回全部的云分发产品
        return subCategoryProductsMap[subCategory]
    }
  }
  return subCategoryProductsMap[subCategory]
}

export function getCategoryProducts(category: Category): PartialProductData[] {
  return categorySubCategoriesMap[category].reduce(
    (accumulator, current) => [...accumulator, ...subCategoryProductsMap[current]],
    [] as PartialProductData[]
  )
}

export const subcategoriesForPrice: SubCategory[] = [
  SubCategory.Storage, SubCategory.LiveBroadcast, SubCategory.Dora,
  SubCategory.Sdk, SubCategory.Basis, SubCategory.Distribution
]

/** 视觉数据智能 */
export const categoryMedia = [
  Product.Dora,
  Product.Censor,
  Product.FaceID,
  Product.Ocr,
  Product.Vii,
  Product.Voice,
  Product.RiskControl,
  Product.OpenAPI,
  Product.Pili,
  Product.Geek,
  Product.Rtn,
  Product.Plsv,
  Product.Plms,
  Product.QnPlayer,
  Product.Qvs,
  Product.Tts
] as const

export const categoryNameMap = {
  [Category.Service]: '基础能力',
  [Category.Media]: '多媒体数据处理平台及服务',
  [Category.Data]: '机器数据处理平台'
} as const

export const categoryNameMapForMp = {
  [Category.Media]: '视觉数据智能',
  [Category.Data]: '机器数据智能',
  [Category.Service]: '基础服务'
} as const

export const categoryEnNameMap = {
  [Category.Service]: 'Cloud Essentials',
  [Category.Media]: 'Media PaaS',
  [Category.Data]: 'Data PaaS'
} as const

export const categories = [
  Category.Media,
  Category.Data,
  Category.Service
] as const

