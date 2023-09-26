/**
 * @file 产品相关 admin 接口
 */

import { uniq } from 'lodash'

import { get, getCode } from 'utils/fetch'
import { ReplaceBy } from 'utils/type'
import { ignoreProductPriceError } from 'constants/env'
import { Product } from 'constants/products'
import { NewsType } from 'constants/products/news'
import { ComponentName } from 'constants/products/components'
import { BannerButton, ButtonClickWebLink, ButtonClickConsult } from 'hooks/product-btn'

import { get as mongoGet, mongoApiPrefix, handleResponseData, listAll } from '.'

export interface IPage {
  id: string
  name: string
  link: string
}

// 获取产品页面信息
export function getPages(): Promise<IPage[]> {
  return get(mongoApiPrefix + '/www-product-page')
    .then(res => handleResponseData(res))
}

export interface INews {
  _id: string // 唯一标识（mongo ObjectID），由 mongo-api 自动生成
  product: string // 所在产品页
  type: NewsType // 动态类型
  title: string  // 标题
  desc: string  // 描述
  releaseTime: number  // 发布时间
  link: string // 详情链接
  createTime: number // 创建时间
  editTime: number // 更新时间
}

export interface INewsResponse {
  count: number
  data: INews[]
}

export interface INewsOptions {
  limit?: number
  offset?: number
  product?: string
  type?: NewsType
}

// 获取产品动态信息
export async function getNews({ limit = 4, offset = 0, product, type }: INewsOptions): Promise<INewsResponse> {
  const queryOpt = product === undefined && type === undefined
    ? {}
    : {
      query: JSON.stringify({ product, type })
    }
  const options = { ...queryOpt, limit, offset, sort: '-releaseTime' }
  const res = await get(mongoApiPrefix + '/www-product-news', options)
  return {
    count: res.count || 0,
    data: handleResponseData(res)
  }
}

export interface IPrice {
  product: string // 所在产品页,一个产品页只能有一个价格页，唯一性 key
  fileName: string // 文件名称
  fileUrl: string // 文件内容 url
  creator: string // 创建者
  modifier: string // 更改者
  createdAt: number // 创建时间，精确到秒
  updatedAt: number // 更新时间，精确到秒
}

// 获取产品价格页内容，先获取文件地址，再根据地址获取内容
export async function getPriceFileContent(product: Product): Promise<string> {
  try {
    const price: IPrice = await get(mongoApiPrefix + '/www-product-price/' + product)
    const text: string = await fetch(price.fileUrl).then((r: Response) => r.text())
    return text
  } catch (e) {
    // FIXME: 已配置但出错了依然会进这个分支误导人
    if (ignoreProductPriceError) {
      return '该产品未配置价格详情，可找 @yinxulai 配置'
    }
    throw e
  }
}

export interface SectionsConfig {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string

  component: {
    /** 组件名称，组件被 Section 包裹 */
    name: ComponentName
    /** 组件参数 */
    props: unknown
  }
}

/** 产品描述 */
export interface ProductDesc {
  /** 长描述，用于产品页 banner、meta 标签 description 等 */
  detail: string
  /** 短描述 */
  brief: string
}

/** 产品图标 */
export interface ProductIcons {
  /** 线框（默认） */
  line: string
  /** 线框（小） */
  lineSmall: string
  /** 毛玻璃（默认） */
  glass: string
}

/** 产品基本信息 */
export interface ProductInfo {
  /** 产品页相对路径，全局唯一，同时用作产品 id */
  path: string
  /** 产品名字，全局唯一 */
  name: string

  /** 产品页标题 */
  title: string
  /** 关键字列表、产品标签 */
  keywords: string[]
  /** 产品描述 */
  desc: ProductDesc

  /** 产品图标 */
  icon: ProductIcons
}

export interface MongoProductInfo extends ProductInfo {
  /** 产品页 banner 配置 */
  banner?: {
    bgImgUrl: {
      large: string
      small?: string
    }
    bgColor: string
    /** 是否为浅色风格（默认深色风格）；浅色风格对应深色按钮和深色文字，深色风格反之 */
    light: boolean
    buttons: BannerButton[]
  } | null
  /** 产品页底部使用引导模块 */
  usageGuide?: {
    title: string
    desc?: string
    button: {
      text: string
      click: ButtonClickWebLink | ButtonClickConsult
    }
  } | null
  /** 产品页组件列表配置 */
  sections: SectionsConfig[]
}

export type ProductPageInfo = ReplaceBy<MongoProductInfo, {
  banner: NonNullable<MongoProductInfo['banner']>
}>

// TODO: 后续用新的 mongo api 直接裁剪
function getProductBaseInfo({ banner, sections, usageGuide, ...productInfo }: MongoProductInfo): ProductInfo {
  return productInfo
}

export function hasProductPage(info: MongoProductInfo): info is ProductPageInfo {
  return info.banner != null && info.sections.length > 0
}

async function getMongoProductInfo(path: string) {
  try {
    return await mongoGet<MongoProductInfo>('www-product-info', path)
  } catch (err) {
    if (Number(getCode(err)) === 404) {
      return null
    }
    throw err
  }
}

/** 获取产品基本信息 */
export async function getProductInfo(path: string): Promise<ProductInfo | null> {
  const info = await getMongoProductInfo(path)
  return info == null ? null : getProductBaseInfo(info)
}

/** 把产品页所需信息补充完整，主要包括相关产品模块里的其他产品信息等 */
export async function normalizeProductPageRelatedComponentProps(info: ProductPageInfo): Promise<void> {
  for (const section of info.sections) {
    if (section.component.name !== ComponentName.Related) {
      continue
    }

    const relatedProps = section.component.props as any
    // eslint-disable-next-line no-await-in-loop
    const relatedProductInfos = await listProductInfos(relatedProps.products)
    relatedProductInfos.forEach((relatedInfo, index) => {
      if (relatedInfo == null) {
        throw new Error(`找不到该产品 ${relatedProps.products[index].path}`)
      }
    })
    relatedProps.productInfos = relatedProductInfos
  }
}

export async function getProductPageInfo(path: string): Promise<ProductPageInfo | null> {
  const info = await getMongoProductInfo(path)

  if (info == null || !hasProductPage(info)) {
    return null
  }

  await normalizeProductPageRelatedComponentProps(info)

  return info
}

async function listAllMongoProductInfos(ids?: string[]) {
  if (ids && ids.length === 0) {
    return []
  }

  return listAll<MongoProductInfo>(
    'www-product-info',
    ids ? { query: { path: { $in: uniq(ids) } } } : undefined
  )
}

export async function listProductInfos(ids: string[]): Promise<ProductInfo[]> {
  const list = await listAllMongoProductInfos(ids)
  return ids.map(path => {
    const productInfo = list.find(info => info.path === path)
    if (productInfo == null) {
      throw new Error(`找不到该产品：${productInfo}`)
    }
    return getProductBaseInfo(productInfo)
  })
}

export async function getProductInfoMap<T extends string>(ids: T[]): Promise<{ [P in T]: ProductInfo }> {
  const productInfos = await listProductInfos(ids)
  return Object.assign({}, ...productInfos.map(info => ({ [info.path]: info })))
}

export async function listAllProductPagePaths(): Promise<string[]> {
  const list = await listAllMongoProductInfos()
  return list
    .filter(hasProductPage)
    .map(({ path }) => path)
}
