/**
 * @file 广告平台相关接口
 * @desc 详见 https://cf.qiniu.io/pages/viewpage.action?pageId=87497553#id-%E5%B9%BF%E5%91%8A%E4%BD%8D%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE-8.%E6%A0%B9%E6%8D%AE%E5%B9%BF%E5%91%8A%E4%BD%8Dcode%E6%9F%A5%E8%AF%A2%E5%BD%93%E5%89%8D%E7%94%9F%E6%95%88%E7%9A%84%E5%B9%BF%E5%91%8A%E4%BD%8D%E7%B4%A0%E6%9D%90(%E5%A4%96%E9%83%A8%E5%AF%B9%E6%8E%A5)
 */

import { get } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { Product } from 'constants/products'

const apiPrefix = `${basePrefix}/thallo/v1`

/** 接口响应体的形状 */
interface RespBody<T> {
  code: number
  message: string
  data?: T
}

/** /thallo-message 接口响应体中的 `data` */
interface MessageData {
  /** 广告位 code */
  advert_code: string
  /** 投放 ID */
  advert_serving_id: string
  /** 广告位名 */
  advert_name: string
  /** JSON 格式字符串，存放广告位中所有的元素信息 */
  elements_json_string: string
}

/** 所有广告位元素的类型 */
export enum ElementType {
  /** 图片 */
  Image = 1,
  /** 文字 */
  Text = 2,
  /** 跳转链接 */
  Link = 3
}

/** 图片元素的信息 */
export interface ImageElement {
  /** 图片地址 */
  value: string
  /** 图片 alt 属性 */
  imgAlt: string
  /** 图片 title 属性 */
  imgTitle: string
  /** 默认填充色 */
  imgColorFill: string
}

/** 文字元素的信息 */
export interface TextElement {
  /** 文字内容 */
  value: string
}

/** 跳转链接元素的信息 */
export interface LinkElement {
  /** 跳转链接 */
  value: string
}

/** 元素信息 */
export type AdvertElement = ImageElement | TextElement | LinkElement

/** 元素的原始信息 */
export type RawAdvertElement = AdvertElement & {
  id: string
  /** 元素类型 */
  type: ElementType
  /** 元素在广告位中的字段名 */
  field: string
}

/** 处理后对外的广告位信息 */
export interface AdvertInfo<Elements = unknown> {
  /** 广告位 code */
  code: string
  /** 广告位名称 */
  name: string
  /** 投放 ID */
  servingId: string
  /** 广告位中的所有元素 */
  elements: Elements
}

/** 获取指定广告位的信息，把元素列表处理成以 field 为 key，元素为 value 的对象 */
async function getAdvertInfo<
  Elements extends { [key in Field]: AdvertElement },
  Field extends keyof Elements = keyof Elements
>(code: string): Promise<AdvertInfo<Elements>> {
  const body: RespBody<MessageData> = await get(`${apiPrefix}/thallo-message`, { code })
  if (body.code !== 200) {
    throw new Error(`Get elements failed, code: ${body.code}, message: ${body.message}`)
  }
  const data = body.data!
  const elementList: RawAdvertElement[] = JSON.parse(data.elements_json_string)
  const elements: Record<string, AdvertElement> = {}
  elementList.forEach(element => {
    elements[element.field] = element
  })
  return {
    code: data.advert_code,
    name: data.advert_name,
    servingId: data.advert_serving_id,
    elements: elements as Elements
  }
}

/** 获取一批广告位的信息，并忽略其中出错或无意义项 */
async function getAdvertList<
  Elements extends { [key in Field]: AdvertElement },
  Field extends keyof Elements = keyof Elements
>(codes: string[]) {
  const advertList = await Promise.all(codes.map(
    code => getAdvertInfo<Elements>(code).catch(() => {
      // eslint-disable-next-line no-console
      console.warn(`Get advert-info for ${code} failed.`)
      return null
    })
  ))
  return advertList.filter(item => item != null) as Array<AdvertInfo<Elements>>
}

/** 首页 Banner 广告位信息 */
export interface HomePageBanner {
  /** PC端图片 */
  pPic: ImageElement
  /** 标题 */
  txt: TextElement
  /** 副标题 */
  subTxt: TextElement
  /** 跳转链接 */
  url: LinkElement
  /** button标题 */
  bTxt: TextElement
  /** 移动端图片 */
  mPic: ImageElement
}

/** 获取首页 Banner 列表 */
export async function getHomePageBanners() {
  const codes = [1, 2, 3, 4, 5, 6].map(i => `www-homepage_banner-${i}`)
  return getAdvertList<HomePageBanner>(codes)
}

/** 首页 Banner 下方活动广告位信息 */
export interface HomePageActivity {
  /** 标题 */
  txt: TextElement
  /** 副标题 */
  subTxt: TextElement
  /** 图片 */
  icon: ImageElement
  /** 跳转链接 */
  url: LinkElement
  /** 标签 */
  cornerTxt: TextElement
}

/** 获取首页 Banner 下方活动列表 */
export async function getHomePageActivities() {
  const codes = [1, 2, 3, 4].map(i => `www-homepage_button-${i}`)
  return getAdvertList<HomePageActivity>(codes)
}

/** 产品页 Banner 下方通知（新闻动态 & 福利活动） */
export interface ProductPageNotice {
  /** 标题 */
  txt: TextElement
  /** 跳转链接 */
  url: LinkElement
}

/**
 * `Product` 到“广告位 code 中产品代号（`productCode`）”的映射，后者用于拼接产品页面上的广告位 code
 * 如某产品页面下“新闻动态 & 福利活动”对应的广告位 code：
 * - `www-pd-${productCode}_news-text-${i}`
 * - `www-pd-${productCode}_mkt-text-${i}`
 * 添加新产品时，这里的 code 定义需要与广告投放的同学确认下，原则上每个产品对应的
 * `productCode` 应当与该产品路由（`/product/${name}`）中的 `name` 一致。
 * 关于广告投放平台：https://cf.qiniu.io/pages/viewpage.action?pageId=80465650
 * TODO: 核对确认地址一致后移除
 */
export const productCodeMap = {
  [Product.Kodo]: 'kodo',
  [Product.Dora]: 'dora',
  [Product.Cdn]: 'qcdn',
  [Product.Storage]: 'storage',
  [Product.Pili]: 'pili',
  [Product.Geek]: 'geek',
  [Product.Rtn]: 'rtn',
  [Product.Qvs]: 'qvs',
  [Product.Dcdn]: 'dcdn',
  [Product.Pcdn]: 'pcdn',
  [Product.Document]: 'document',
  [Product.Avsmart]: 'avsmart',
  [Product.Censor]: 'censor',
  [Product.FaceID]: 'faceid',
  [Product.Ocr]: 'ocr',
  [Product.Vii]: 'vii',
  [Product.Voice]: 'voice',
  [Product.Qoe]: 'qoe',
  [Product.RiskControl]: 'risk-control',
  [Product.Enhancement]: 'enhancement',
  [Product.OpenAPI]: 'openapi',
  [Product.Plsv]: 'plsv',
  [Product.Plms]: 'plms',
  [Product.QnPlayer]: 'qnplayer',
  [Product.Beautysdk]: 'beautysdk',
  [Product.CloudSql]: 'cloud-sql',
  [Product.Ddos]: 'ddos',
  [Product.Plesdk]: 'plesdk',
  [Product.Qec]: 'qec',
  [Product.Qvm]: 'qvm',
  [Product.Sms]: 'sms',
  [Product.Ssl]: 'ssl',
  [Product.Svesdk]: 'svesdk',
  [Product.Tts]: 'tts',
  [Product.WAF]: 'waf',
  [Product.QApp]: 'qapp'
}

/** 获取产品页 Banner 下方通知列表（新闻动态 & 福利活动） */
export async function getProductPageNotices(product: keyof typeof productCodeMap) {
  const productCode = productCodeMap[product]
  const newsCodes = [1, 2, 3, 4].map(i => `www-pd-${productCode}_news-text-${i}`)
  const mktCodes = [1, 2, 3, 4].map(i => `www-pd-${productCode}_mkt-text-${i}`)
  const [news, mkts] = await Promise.all([
    getAdvertList<ProductPageNotice>(newsCodes),
    getAdvertList<ProductPageNotice>(mktCodes)
  ])
  return { news, mkts }
}

export interface PgcHomePageActivity {
  /** PC端图片 */
  pPic: ImageElement
  /** 跳转链接 */
  url: LinkElement
}

/** pgc 首页右侧广告 */
export async function getPgcHomePageActivities() {
  const codes = [1, 2].map(i => `www-pgc-index_right-${i}`)
  return getAdvertList<PgcHomePageActivity>(codes)
}
