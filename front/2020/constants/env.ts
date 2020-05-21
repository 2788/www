/**
 * @file 配置的环境变量，具体值见 .env & .env.<enviroment> 文件
 * @description 相关文档 https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables
 */

/** API Host */
export const apiHost = process.env.NEXT_PUBLIC_API_HOST

/** 搜索时指定的站点名（site name） */
export const siteNameForSearch = process.env.NEXT_PUBLIC_SITE_NAME_FOR_SEARCH
