/**
 * @file QVM 相关接口
 */

import { memoize } from 'lodash'
import { apiHost } from 'constants/api'
import { isYear } from 'constants/qvm'
import { get, post } from 'utils/fetch'

const apiPrefix = `${apiHost}/qvm`

export type SpecStarterConfigItem = {
  family_name: string
  family_desc: string[]
  ecs_spec: string
  disk_spec: string
  ip_spec: string
  price: number
  buy_link: string
}

export type SpecEnterpriseConfigGroup = {
  title: string
  items: SpecEnterpriseConfigItem[]
}

export type SpecEnterpriseConfigItem = {
  family_name: string
  family_desc: string

  scenario_desc: string[] // 适用场景
  extra_infos: Array<{
    // CPU内存比等
    title: string
    info: string
  }> // 固定数量 4

  ecs_classes: {
    [regioin_id: string]: string[] // 地域 -> 可售卖主机规格列表
  }
}

export type SpecRegion = {
  region_id: string
  local_name: string
}

export type SpecECSSpec = {
  value: string // e.g. ecs.n1.small
  name: string // 2 核 2G
}

export type SpecRes = {
  starter: SpecStarterConfigItem[] // 入门版配置中直接返回价格
  enterprise: SpecEnterpriseConfigGroup[] // 企业版配置不包括价格，价格需要通过询价接口查询
  components: {
    regions: SpecRegion[]
    buy_months: number[]
    ecs_classes: SpecECSSpec[] // 主机规格代码 -> 规格名称
  }
}

export async function getSpecs(): Promise<SpecRes> {
  const body = await get(`${apiPrefix}/v1/open/www/specs`)
  return body.data
}

export const getSpecsWithCahe = memoize(getSpecs)

export async function getStarterSpecs() {
  const specs = await getSpecsWithCahe()
  return specs.starter
}

export async function getEnterpriseSpecs() {
  const specs = await getSpecsWithCahe()
  return specs.enterprise
}

// QVM 一些业务元信息
export type MetaInfo = {
  regionMap: { [id: string]: string }
  instanceTypeMap: { [value: string]: string }
  durations: number[]
}

export const getMetaInfo = memoize(async () => {
  const { regions, buy_months, ecs_classes } = (await getSpecsWithCahe()).components
  const regionMap = regions.reduce(
    (map, item) => ({ ...map, [item.region_id]: item.local_name }),
    {} as { [id: string]: string }
  )
  const instanceTypeMap = ecs_classes.reduce(
    (map, item) => ({ ...map, [item.value]: item.name }),
    {} as { [value: string]: string }
  )
  const metaInfo: MetaInfo = {
    regionMap,
    instanceTypeMap,
    durations: buy_months
  }
  return metaInfo
})

export type GetPriceOptions = {
  regionId: string
  instanceType: string
  duration: number
  byYear?: boolean
}

export type GetPriceRes = {
  data: {
    infos: Array<{
      atomic_items: Array<{
        price: number
      }>
    }>
  }
}

export async function getPriceInfo(
  { regionId, instanceType, duration, byYear }: GetPriceOptions
): Promise<GetPriceRes> {
  const periodInfo = getPeriodInfo(duration, byYear)
  const infoItem = {
    resource_type: 'instance',
    item_info: { instance_type: instanceType }
  }
  const info = {
    region_id: regionId,
    order_type: 'create',
    amount: 1,
    cost_charge_mode: 'PayByInstance',
    cost_charge_type: 'PrePaid',
    cost_period: periodInfo.period,
    cost_period_unit: periodInfo.periodUnit,
    info_items: [infoItem]
  }
  return post(`${apiPrefix}/v1/open/price`, {
    infos: [info]
  })
}

export async function getPrice(options: GetPriceOptions) {
  const ret = await getPriceInfo(options)
  return ret.data.infos[0].atomic_items[0].price
}

export type GetPriceWithDiscountOptions = Omit<GetPriceOptions, 'byYear'>

export type PriceWithDiscount = {
  price: number
  discount: number
}

// 本接口默认返回的价格都是包含时长优惠的，例如机型 x，包月单价 100 元，
// 包年正常价格应该是 `100*12=1200`，但是我们包年一般有大约 8 折的优惠，
// 因此，询价参数指定时长是包年的时候，返回的价格是折后价 960 元。
// 因此，用户选择包年时，界面上要达到体现包年优惠的效果（参考 QVM 询价页面 `https://portal.qiniu.com/qvm/vm/instance/create`），
// 即同时显示原价和包年折扣，应该调用两次该接口，一次指定包年，一次指定包月，然后将 `包月单价*12` 之后作为原价展示，突出优惠力度。
export async function getPriceWithDiscount(options: GetPriceWithDiscountOptions): Promise<PriceWithDiscount> {
  const price = await getPrice(options)
  const priceWithNoDiscount = { price, discount: 0 }
  if (!isYear(options.duration)) {
    return priceWithNoDiscount
  }
  try {
    const priceWithDiscount = await getPrice({ ...options, byYear: true })
    return {
      price: priceWithDiscount,
      discount: price - priceWithDiscount
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('get price by year failed:', e)
    return priceWithNoDiscount
  }
}

function getPeriodInfo(duration: number, byYear = false) {
  const infoByMonth = { period: duration, periodUnit: 'Month' }
  return (
    byYear && isYear(duration)
    ? { period: Math.floor(duration / 12), periodUnit: 'Year' }
    : infoByMonth
  )
}
