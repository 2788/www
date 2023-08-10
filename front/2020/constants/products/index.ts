/**
 * @file 所有产品信息的定义，全局用同一份保证一致
 * @description 包括 id、展示名、页面地址等
 */

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { Landpage, urlMap as landpageUrlMap } from 'constants/landpage'

import kodoLargeIconUrl from './icons/large/kodo.png'
import qcdnLargeIconUrl from './icons/large/qcdn.png'
import sslLargeIconUrl from './icons/large/ssl.png'
import piliLargeIconUrl from './icons/large/pili.png'
import qvmLargeIconUrl from './icons/large/qvm.png'
import cloudSqlLargeIconUrl from './icons/large/cloud-sql.png'
import ddosLargeIconUrl from './icons/large/ddos.png'
import smsLargeIconUrl from './icons/large/sms.png'
import doraLargeIconUrl from './icons/large/dora.png'
import doraImageLargeIconUrl from './icons/large/dora-image.png'
import censorLargeIconUrl from './icons/large/censor.png'
import faceidLargeIconUrl from './icons/large/faceid.png'
import rtnLargeIconUrl from './icons/large/rtn.png'
import plsvLargeIconUrl from './icons/large/plsv.png'
import plmsLargeIconUrl from './icons/large/plms.png'
import qvsLargeIconUrl from './icons/large/qvs.png'
import openapiLargeIconUrl from './icons/large/openapi.png'
import ocrLargeIconUrl from './icons/large/ocr.png'
import dcdnLargeIconUrl from './icons/large/dcdn.png'
import pcdnLargeIconUrl from './icons/large/pcdn.png'
import geekLargeIconUrl from './icons/large/geek.png'
import qnPlayerLargeIconUrl from './icons/large/qn-player.png'
import voiceLargeIconUrl from './icons/large/voice.png'
import storageLargeIconUrl from './icons/large/storage.png'
import avsmartLargeIconUrl from './icons/large/avsmart.png'
import beautysdkLargeIconUrl from './icons/large/beautysdk.png'
import wafLargeIconUrl from './icons/large/waf.png'
import qoeLargeIconUrl from './icons/large/qoe.png'
import qecLargeIconUrl from './icons/large/qec.png'
import enhancementLargeIconUrl from './icons/large/enhancement.png'
import qappLargeIconUrl from './icons/large/qapp.png'
import qnvsLargeIconUrl from './icons/large/qnvs.png'

/** @deprecated 参考 `/apis/admin/product.ts` 的 `getProductInfo` */
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
  // RiskControl = 'riskcontrol',
  /** 实时音视频 */
  Rtn = 'rtn',
  /** 短视频 SDK */
  Plsv = 'plsv',
  /** 推流 SDK */
  Plms = 'plms',
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
  // Vii = 'vii',
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
  // Document = 'document',
  /** 画质增强 */
  Enhancement = 'enhancement',
  /** 容器轻应用平台 */
  QApp = 'qapp',
  /** 号码认证服务 */
  Qnvs = 'qnvs'
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
  [Product.Rtn]: '实时音视频 QRTC',
  [Product.Plsv]: '短视频 SDK',
  [Product.Plms]: '直播推流 SDK',
  [Product.Qvs]: '视频监控 QVS',
  [Product.OpenAPI]: 'AI 开放市场',
  [Product.Ocr]: '票证自动识别 OCR',
  [Product.Dcdn]: '全站加速',
  [Product.Pcdn]: '边缘加速',
  [Product.Plesdk]: '直播特效 SDK',
  [Product.Geek]: '低延时直播 Geek',
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
  [Product.Enhancement]: '画质增强',
  [Product.QApp]: '容器轻应用平台',
  [Product.Qnvs]: '号码认证服务'
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
  [Product.Rtn]: '/products/rtn',
  [Product.Plsv]: '/products/plsv',
  [Product.Plms]: '/products/plms',
  [Product.Qvs]: '/products/qvs',
  [Product.OpenAPI]: '/products/openapi',
  [Product.Ocr]: '/products/ocr',
  [Product.Dcdn]: '/products/dcdn',
  [Product.Pcdn]: '/products/pcdn',
  [Product.Plesdk]: '/products/plesdk',
  [Product.Geek]: '/products/geek',
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
  [Product.Enhancement]: '/products/enhancement',
  [Product.QApp]: '/products/qapp',
  [Product.Qnvs]: '/products/qnvs'
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
  [Product.Rtn]: '/prices/rtc',
  [Product.Plsv]: '/prices/plsv',
  [Product.Plms]: null,
  [Product.Qvs]: '/prices/qvs',
  [Product.OpenAPI]: '/prices/openapi',
  [Product.Ocr]: '/prices/ocr',
  [Product.Dcdn]: null,
  [Product.Pcdn]: null,
  [Product.Plesdk]: null,
  [Product.Geek]: null,
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
  [Product.Enhancement]: null,
  [Product.QApp]: '/prices/qapp',
  [Product.Qnvs]: '/prices/qnvs'
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
  [Product.Qvs]: '面向视频监控设备提供视频流接入、存储、分发服务',

  // TODO 需要加入到顶部导航或者相关产品再补充
  [Product.OpenAPI]: 'AI 开放市场是一个开放平台，提供图片，文本，音频，视频等智能数据处理服务',
  [Product.Ocr]: '提供车险保单识别，营业执照识别等票证识别服务，帮助解决信息结构化问题',
  [Product.Dcdn]: '简单配置即可实现全站资源的加速',
  [Product.Pcdn]: '高质量低成本的 P2P CDN 服务，有效提升热点资源的分发效果',
  [Product.Plesdk]: '提供直播推流场景下的美颜滤镜、大眼瘦脸、美妆美形等特效功能',
  [Product.Geek]: '构建了全新的低延时直播互动体验',
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
  [Product.Enhancement]: '基于七牛领先的深度学习技术，提供视频画质增强服务',
  [Product.QApp]: '为多媒体开发客户提供稳定、可靠、弹性、轻量的容器应用平台，实现业务容器化',
  [Product.Qnvs]: '为 APP 开发者提供一键登录及号码认证的快捷服务'
} as const

export const iconMap = {
  [Product.Kodo]: require('./icons/default/kodo.svg').default,
  [Product.Archive]: require('./icons/default/archive.svg').default,
  [Product.Hdfs]: require('./icons/default/hdfs.svg').default,
  [Product.Cdn]: require('./icons/default/cdn.svg').default,
  [Product.Ssl]: require('./icons/default/ssl.svg').default,
  [Product.Pili]: require('./icons/default/pili.svg').default,
  [Product.Qvm]: require('./icons/default/qvm.svg').default,
  [Product.Ddos]: require('./icons/default/ddos.svg').default,
  [Product.Sms]: require('./icons/default/sms.svg').default,
  [Product.Dora]: require('./icons/default/dora.svg').default,
  [Product.DoraAudio]: require('./icons/default/dora-audio.svg').default,
  [Product.DoraImage]: require('./icons/default/dora-image.svg').default,
  [Product.Censor]: require('./icons/default/censor.svg').default,
  [Product.FaceID]: require('./icons/default/faceid.svg').default,
  [Product.Rtn]: require('./icons/default/rtn.svg').default,
  [Product.Plsv]: require('./icons/default/plsv.svg').default,
  [Product.Plms]: require('./icons/default/plms.svg').default,
  [Product.Qvs]: require('./icons/default/qvs.svg').default,
  [Product.OpenAPI]: require('./icons/default/openapi.svg').default,
  [Product.Ocr]: require('./icons/default/ocr.svg').default,
  [Product.Dcdn]: require('./icons/default/dcdn.svg').default,
  [Product.Pcdn]: require('./icons/default/pcdn.svg').default,
  [Product.Plesdk]: require('./icons/default/plesdk.svg').default,
  [Product.CloudSql]: require('./icons/default/cloud-sql.svg').default,
  [Product.Geek]: require('./icons/default/geek.svg').default,
  [Product.QnPlayer]: require('./icons/default/qnplayer.svg').default,
  [Product.Svesdk]: null,
  [Product.Voice]: require('./icons/default/voice.svg').default,
  [Product.Storage]: require('./icons/default/storage.svg').default,
  [Product.Avsmart]: require('./icons/default/avsmart.svg').default,
  [Product.Beautysdk]: require('./icons/default/beautysdk.svg').default,
  [Product.WAF]: require('./icons/default/waf.svg').default,
  [Product.Tts]: require('./icons/default/tts.svg').default,
  [Product.Qoe]: require('./icons/default/qoe.svg').default,
  [Product.Qec]: require('./icons/default/qec.svg').default,
  [Product.Enhancement]: null,
  [Product.QApp]: require('./icons/default/qapp.svg').default,
  [Product.Qnvs]: require('./icons/default/qnvs.svg').default
}

export const smallIconMap = {
  [Product.Kodo]: require('./icons/small/kodo.svg').default,
  [Product.Archive]: require('./icons/small/archive.svg').default,
  [Product.Hdfs]: require('./icons/small/hdfs.svg').default,
  [Product.Cdn]: require('./icons/small/cdn.svg').default,
  [Product.Ssl]: require('./icons/small/ssl.svg').default,
  [Product.Pili]: require('./icons/small/pili.svg').default,
  [Product.Qvm]: require('./icons/small/qvm.svg').default,
  [Product.Ddos]: require('./icons/small/ddos.svg').default,
  [Product.Sms]: require('./icons/small/sms.svg').default,
  [Product.Dora]: require('./icons/small/dora.svg').default,
  [Product.DoraAudio]: require('./icons/small/dora-audio.svg').default,
  [Product.DoraImage]: require('./icons/small/dora-image.svg').default,
  [Product.Censor]: require('./icons/small/censor.svg').default,
  [Product.FaceID]: require('./icons/small/faceid.svg').default,
  [Product.Rtn]: require('./icons/small/rtn.svg').default,
  [Product.Plsv]: require('./icons/small/plsv.svg').default,
  [Product.Plms]: require('./icons/small/plms.svg').default,
  [Product.Qvs]: require('./icons/small/qvs.svg').default,
  [Product.OpenAPI]: require('./icons/small/openapi.svg').default,
  [Product.Ocr]: require('./icons/small/ocr.svg').default,
  [Product.Dcdn]: require('./icons/small/dcdn.svg').default,
  [Product.Pcdn]: require('./icons/small/pcdn.svg').default,
  [Product.Plesdk]: require('./icons/small/plesdk.svg').default,
  [Product.CloudSql]: require('./icons/small/cloud-sql.svg').default,
  [Product.Geek]: require('./icons/small/geek.svg').default,
  [Product.QnPlayer]: require('./icons/small/qnplayer.svg').default,
  [Product.Svesdk]: null,
  [Product.Voice]: require('./icons/small/voice.svg').default,
  [Product.Storage]: require('./icons/small/storage.svg').default,
  [Product.Avsmart]: require('./icons/small/avsmart.svg').default,
  [Product.Beautysdk]: require('./icons/small/beautysdk.svg').default,
  [Product.WAF]: require('./icons/small/waf.svg').default,
  [Product.Tts]: require('./icons/small/tts.svg').default,
  [Product.Qoe]: require('./icons/small/qoe.svg').default,
  [Product.Qec]: require('./icons/small/qec.svg').default,
  [Product.Enhancement]: null,
  [Product.QApp]: require('./icons/small/qapp.svg').default,
  [Product.Qnvs]: require('./icons/small/qnvs.svg').default
}

export const largeIconMap: Record<Product, string | null> = {
  [Product.Kodo]: kodoLargeIconUrl,
  [Product.Archive]: null,
  [Product.Hdfs]: null,
  [Product.Cdn]: qcdnLargeIconUrl,
  [Product.Ssl]: sslLargeIconUrl,
  [Product.Pili]: piliLargeIconUrl,
  [Product.Qvm]: qvmLargeIconUrl,
  [Product.CloudSql]: cloudSqlLargeIconUrl,
  [Product.Ddos]: ddosLargeIconUrl,
  [Product.Sms]: smsLargeIconUrl,
  [Product.Dora]: doraLargeIconUrl,
  [Product.DoraAudio]: null,
  [Product.DoraImage]: doraImageLargeIconUrl,
  [Product.Censor]: censorLargeIconUrl,
  [Product.FaceID]: faceidLargeIconUrl,
  [Product.Rtn]: rtnLargeIconUrl,
  [Product.Plsv]: plsvLargeIconUrl,
  [Product.Plms]: plmsLargeIconUrl,
  [Product.Qvs]: qvsLargeIconUrl,
  [Product.OpenAPI]: openapiLargeIconUrl,
  [Product.Ocr]: ocrLargeIconUrl,
  [Product.Dcdn]: dcdnLargeIconUrl,
  [Product.Pcdn]: pcdnLargeIconUrl,
  [Product.Plesdk]: null,
  [Product.Geek]: geekLargeIconUrl,
  [Product.QnPlayer]: qnPlayerLargeIconUrl,
  [Product.Svesdk]: null,
  [Product.Voice]: voiceLargeIconUrl,
  [Product.Storage]: storageLargeIconUrl,
  [Product.Avsmart]: avsmartLargeIconUrl,
  [Product.Beautysdk]: beautysdkLargeIconUrl,
  [Product.Tts]: null,
  [Product.WAF]: wafLargeIconUrl,
  [Product.Qoe]: qoeLargeIconUrl,
  [Product.Qec]: qecLargeIconUrl,
  [Product.Enhancement]: enhancementLargeIconUrl,
  [Product.QApp]: qappLargeIconUrl,
  [Product.Qnvs]: qnvsLargeIconUrl
}

export enum Category {
  Service = 'service',
  Media = 'media'
}

export enum SubCategory {
  Storage = 'storage',
  Distribution = 'distribution',
  Basis = 'basis',
  Audio = 'audio',
  LiveBroadcast = 'liveBroadcast',
  Dora = 'dora',
  Sdk = 'sdk'
}

export const subCategoryNameMap = {
  [SubCategory.Storage]: '云存储',
  [SubCategory.Distribution]: '云分发',
  [SubCategory.Basis]: '云基础',
  [SubCategory.Audio]: '音视频点播',
  [SubCategory.LiveBroadcast]: '直播与实时互动',
  [SubCategory.Dora]: '智能多媒体服务',
  [SubCategory.Sdk]: '客户端 SDK'
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

// TODO：之后把这些函数都挪走，不放在 constant 里
/**
 * 通过 product path 反查 `Product`
 * @deprecated 因 `Product` 已废弃，尽量避免使用
 */
export function getProduct(productPath: string): Product | null {
  const products = Object.keys(urlMap) as Product[]
  const target = products.find(product => {
    const url = urlMap[product]
    return !!(url && url.replace(/#.*/, '').replace(/\?.*/, '') === `/products/${productPath}`)
  })
  return target ?? null
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

function isProduct(data: PartialProductData): data is Product {
  return typeof data !== 'object'
}

export const subCategoryProductsMap: { [s in SubCategory]: PartialProductData[] } = {
  [SubCategory.Storage]: [Product.Kodo, Product.Archive, Product.Storage, Product.Hdfs],
  [SubCategory.Distribution]: [Product.Cdn, Product.Dcdn, Product.Pcdn, Product.Ssl],
  [SubCategory.Basis]: [
    Product.Qvm, Product.Qec, Product.CloudSql, Product.Ddos, Product.WAF, Product.Sms, Product.Qnvs
  ],
  [SubCategory.Audio]: [
    // TODO: 尝试弄成一个跟 Product.Kodo 配置几乎一样的真·Product 简化这里的逻辑
    { product: Product.Kodo, name: '音视频存储', desc: '为音视频多媒体数据提供高可靠、高可用和高性能的对象存储服务' },
    Product.DoraAudio,
    // TODO: 尝试弄成一个跟 Product.Cdn 配置几乎一样的真·Product 简化这里的逻辑
    { product: Product.Cdn, name: '点播加速', desc: '通过全方位的 CDN 质量监控和智能节点调度，提供音视频点播优化加速服务' }
  ],
  [SubCategory.LiveBroadcast]: [Product.Pili, Product.Geek, Product.Rtn, Product.Qvs],
  [SubCategory.Dora]: [
    Product.DoraImage, Product.Avsmart, Product.Censor,
    Product.FaceID, Product.Ocr, Product.Voice, Product.Qoe,
    Product.Enhancement, Product.OpenAPI
  ],
  [SubCategory.Sdk]: [Product.Plsv, Product.Plms, Product.QnPlayer, Product.Beautysdk]
}

export const categorySubCategoriesMap: { [c in Category]: readonly SubCategory[] } = {
  [Category.Service]: [SubCategory.Storage, SubCategory.Distribution, SubCategory.Basis],
  [Category.Media]: [
    SubCategory.Audio, SubCategory.LiveBroadcast, SubCategory.Dora,
    SubCategory.Sdk, SubCategory.Storage, SubCategory.Distribution
  ]
}

export function getSubCategoryProducts(category: Category, subCategory: SubCategory) {
  // 二级目录云存储在不同一级目录下，内部的产品不一样，所以这边特殊处理一下
  if (subCategory === SubCategory.Storage) {
    switch (category) {
      case Category.Service:
        return [Product.Kodo, Product.Archive]
      case Category.Media:
        return [Product.Kodo, Product.Storage]
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

export const subCategoriesForPrice: SubCategory[] = [
  SubCategory.Storage, SubCategory.LiveBroadcast, SubCategory.Dora,
  SubCategory.Sdk, SubCategory.Basis, SubCategory.Distribution
]

export interface ProductDataForPrice extends ProductData {
  priceUrl: string
}

export const subCategoryProductDatasForPrice = subCategoriesForPrice.map(subCategory => {
  const productDatas = subCategoryProductsMap[subCategory]
    .map((productData: PartialProductData) => {
      if (!isProduct(productData)) {
        return null
      }

      const url = priceUrlMap[productData]
      if (url == null) {
        return null
      }

      const productDataForPrice: ProductDataForPrice = {
        ...normalizeProduct(productData),
        priceUrl: url
      }

      return productDataForPrice
    })
    .filter(Boolean) as ProductDataForPrice[]
  return productDatas.length === 0 ? null : [subCategory, productDatas] as const
}).filter(Boolean) as Array<[SubCategory, ProductDataForPrice[]]>

/** 视觉数据智能 */
export const categoryMedia = [
  Product.Dora,
  Product.Censor,
  Product.FaceID,
  Product.Ocr,
  Product.Voice,
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
  [Category.Media]: '多媒体数据处理平台及服务'
} as const

export const categoryNameMapForMp = {
  [Category.Media]: '视觉数据智能',
  [Category.Service]: '基础服务'
} as const

export const categoryEnNameMap = {
  [Category.Service]: 'Cloud Essentials',
  [Category.Media]: 'Media PaaS'
} as const

export const categories = [
  Category.Media,
  Category.Service
] as const
