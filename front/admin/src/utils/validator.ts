/**
 * admin 特有的校验，其他公共校验使用admin-base/common/utils/validator
 */
import { createValidator, textPattern } from 'admin-base/common/utils/validator'
import { httpUrl } from 'admin-base/common/constants/pattern'

const productLink = /^\/products\/[a-zA-Z-_0-9#]+$/
const inSiteLink = /^\/.+$/

export const textHttp = createValidator((v: string) => textPattern(httpUrl)(v, '链接格式错误'))
export const textProductLink = createValidator((v: string) => textPattern(productLink)(v, '链接格式错误'))
export const textNoticeLink = createValidator((v: string) => (httpUrl.test(v) || inSiteLink.test(v) ? '' : '链接格式错误'))
export const textColor = createValidator((v: string) => textPattern(/^#[0-9a-zA-Z]{6}$/)(v, '颜色格式错误'))
