/**
 * @file 配置的环境变量，具体值见 .env & .env.<enviroment> 文件
 * @description 相关文档 https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables
 */

/** API Host */
export const apiHost = process.env.NEXT_PUBLIC_API_HOST!

/** SSO Host */
export const ssoHost = process.env.NEXT_PUBLIC_SSO_HOST!

/** SSO 登录的 client ID */
export const ssoClientID = process.env.NEXT_PUBLIC_SSO_CLIENT_ID!

/** 搜索时指定的站点名（site name） */
export const siteNameForSearch = process.env.NEXT_PUBLIC_SITE_NAME_FOR_SEARCH!
