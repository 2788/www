/**
 * @file 配置的环境变量，具体值见 .env & .env.<enviroment> 文件
 * @description 相关文档 https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables
 */

export const isDev = process.env.NODE_ENV === 'development'

/** 站点 Host */
export const host = must('host', process.env.NEXT_PUBLIC_HOST)

/** API Host */
export const apiHost = must('apiHost', process.env.NEXT_PUBLIC_API_HOST)

/** asset Host */
export const assetHost = must('assetHost', process.env.NEXT_PUBLIC_ASSET_HOST)

/** SSO Host */
export const ssoHost = must('ssoHost', process.env.NEXT_PUBLIC_SSO_HOST)

/** SSO 登录的 client ID */
export const ssoClientID = must('ssoClientID', process.env.NEXT_PUBLIC_SSO_CLIENT_ID)

/** 搜索时指定的站点名（site name） */
export const siteNameForSearch = must('siteNameForSearch', process.env.NEXT_PUBLIC_SITE_NAME_FOR_SEARCH)

/** 活动站 Host */
export const marketingHost = must('marketingHost', process.env.NEXT_PUBLIC_MARKETING_HOST)

/** ECUG Host */
export const ecugHost = must('ecugHost', process.env.NEXT_PUBLIC_ECUG_HOST)

/** 文件上传名的前缀，如 `kodo-admin/` （meihua 专用） */
export const meihuaUploadPrefix = must('meihuaUploadPrefix', process.env.NEXT_PUBLIC_MEIHUA_UPLOAD_PREFIX)

/** 构建时间（时间戳），注意该值不来自 .env.* 文件，而是在 next.config.js 中配置（从而动态获得当前时间） */
export const builtAt = parseInt(must('builtAt', process.env.NEXT_PUBLIC_BUILT_AT), 10)

/** 是否忽略错误信息（产品价格页专用） */
export const ignoreProductPriceError = must('ignoreProductPriceError', process.env.NEXT_PUBLIC_IGNORE_PRODUCT_PRICE_ERROR) === 'true'

/** 内容站内链 Host */
export const pgcContentMdEmbedHost = must('pgcContentMdEmbedHost', process.env.NEXT_PUBLIC_PGC_CONTENT_MD_EMBED_HOST)

function must(name: string, variable?: string): string {
  if (variable == null) {
    throw new Error(`Invalid value for environment variable ${name}, you need to configure it in env file`)
  }
  return variable
}
