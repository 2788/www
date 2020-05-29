/**
 * @file 配置的环境变量，具体值见 .env & .env.<enviroment> 文件
 * @description 相关文档 https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables
 */

/** API Host */
export const apiHost = must('apiHost', process.env.NEXT_PUBLIC_API_HOST)

/** SSO Host */
export const ssoHost = must('ssoHost', process.env.NEXT_PUBLIC_SSO_HOST)

/** SSO 登录的 client ID */
export const ssoClientID = must('ssoClientID', process.env.NEXT_PUBLIC_SSO_CLIENT_ID)

/** 搜索时指定的站点名（site name） */
export const siteNameForSearch = must('siteNameForSearch', process.env.NEXT_PUBLIC_SITE_NAME_FOR_SEARCH)

/** 内容审核接口调用时的审核类型，在测试环境没有广告模块，带广告参数调用接口会报错，这里进行配置 */
export const censorScenes = must('censorScenes', process.env.NEXT_PUBLIC_CENSOR_SCENES)

function must(name: string, variable?: string): string {
  if (!variable) {
    throw new Error(`Invalid value for environment variable ${name}, you need to configure it in env file`)
  }
  return variable
}
