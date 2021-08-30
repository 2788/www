/**
 * @file 梅花接口，申诉为主
 */

import dayjs from 'dayjs'
import * as fetchUtils from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { AppealId, AppealType, AppealStatus } from 'constants/appeal'

const apiPrefix = `${basePrefix}/meihua/api/portal`

interface MeihuaBody {
  code: number
  msg: string
  data: unknown
}

export interface MeihuaApiExceptionBody {
  code: number
  message: string
  data: unknown
}

function isMeihuaBody(body: unknown): body is MeihuaBody {
  return !!body && typeof (body as any).code === 'number'
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
class __MeihuaApiException extends fetchUtils.ApiException<MeihuaApiExceptionBody> {
  constructor(
    meihuaData: MeihuaBody,
    message: string,
    code?: number
  ) {
    super(
      {
        code: meihuaData.code,
        message: meihuaData.msg,
        data: meihuaData.data
      },
      message,
      code
    )
  }
}

// 这里是在定义更精确的类型  FIXME: 这里跟 `fe-core` 的 `ApiException` 不太一样，只能这么绕一下，有点恶心，也许打开方式本来就不对？
// 1、直接 `class { x: number }` 效果等同于 `class { x: number = undefined! }`，而非一般认为的纯粹的类型声明
//   结合关不掉的 `useDefineForClassFields`，会导致子类无法通过这种 re-declare 的方式把父类的字段 overwrite 成更精确的子类型
//   （因为在父类上初始化好的值会被子类在 `super` 过后通过带 `value` 的 `Object.defineProperty` 重新定义并赋值为统一缺省值 `undefined`）
// 2、常规方式 `class XxxApiException<T extends XXX = XXX> {}` 会导致通过 `instanceof XxxApiException` 出来的东西
//   在泛型 `T` 位置的类型变成 `any`，而做不到至少是 `XXX` 的子类型，导致很不好用
// 3、目前版本的 `next.js` 和配置不支持 `class { declare x: number }` 这种语法，也无法通过 `tsconfig` 关闭 `useDefineForClassFields`
// 4、有 `data` 就应该去掉 `response` 或者换成真正的 `Response` 这里只是为了跟 `ApiException` 保持一致以保证全局用法统一
declare class _MeihuaApiException extends __MeihuaApiException {
  // these fields will be inited in super class
  code?: number
  response: { data: MeihuaApiExceptionBody }
  data: MeihuaApiExceptionBody
}
const MeihuaApiException = __MeihuaApiException as typeof _MeihuaApiException

// FIXME: eslint 有毛病
// eslint-disable-next-line space-before-function-paren
function createMeihuaFetch<T extends ((...args: any) => any)>(fetchFn: T): T {
  return ((...args: any) => fetchFn(...args).then(
    (data: unknown) => {
      if (!isMeihuaBody(data)) {
        throw new Error('Fetch failed with invalid response.')
      }

      if (data.code !== 0 && data.code !== 200) {
        throw new MeihuaApiException(data, data.msg, data.code)
      }

      return data.data
    },
    (error: unknown) => {
      if (error instanceof fetchUtils.ApiException && isMeihuaBody(error.data)) {
        // 基础版本的 fetch 抛出的 code 都是 number 类型的 http status code
        const httpStatusCode = error.code as (number | undefined)
        throw new MeihuaApiException(error.data, error.data.msg || error.message, error.data.code || httpStatusCode)
      }
      throw error
    }
  )) as any
}

const fetchJSON: typeof fetchUtils.fetchJSON = createMeihuaFetch(fetchUtils.fetchJSON)
const get: typeof fetchUtils.get = createMeihuaFetch(fetchUtils.get)
const post: typeof fetchUtils.post = createMeihuaFetch(fetchUtils.post)

interface AppealBaseInfo {
  title: string
  type: AppealType
  mobile: string
  email: string
  reason: string
  attaches: string[] // urls
}

export interface CreateAppealOptions extends AppealBaseInfo {
  domains?: string[]
  urls?: string[]
}

export interface AppealInfo extends AppealBaseInfo {
  id: AppealId
  status: AppealStatus
  canRevoke: boolean
  reply: string
  domain?: string
  urls?: string[]
  createdAt: string
  updatedAt: string
}

/** 创建申诉 */
export async function createAppeal({ domains, ...options }: CreateAppealOptions): Promise<void> {
  return post(`${apiPrefix}/appeal`, { ...options, domain: domains })
}

/** 获取历史申诉列表 */
export async function listHistoryAppeals(): Promise<AppealInfo[]> {
  return get(`${apiPrefix}/appeal`)
}

/** 获取申诉详情 */
export async function getAppealInfo(id: AppealId): Promise<AppealInfo | null> {
  const data: (AppealInfo[] | null) = await get(`${apiPrefix}/appeal`, { id })
  return (data && data[0]) ?? null
}

/** 撤销申诉 */
export async function revertAppeal(id: AppealId): Promise<void> {
  return fetchJSON(`${apiPrefix}/appeal?id=${id}`, { method: 'DELETE' })
}

// TODO: 后续应该脱离 meihua 然后集成到 `apis/admin/tools: ${wwwApiPrefix}/tools/upload-token` 里
/** 获取 Kodo 上传 token */
export function getUploadToken(
  /** 有效时长，单位 s */
  maxAge: number
): Promise<string> {
  const putPolicy = JSON.stringify({
    deadline: dayjs().add(maxAge, 'second').unix()
  })
  return fetchUtils.get(`${apiPrefix}/upload-token`, { putPolicy })
}
