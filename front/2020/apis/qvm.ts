/**
 * @file QVM 相关接口
 */

import { memoize, intersection } from 'lodash'
import { apiHost } from 'constants/api'
import { isYear, avaliableRegions } from 'constants/qvm'
import { timeout } from 'utils'
import { get, post } from 'utils/fetch'
import mockInstanceTypes from './instance-types.json'

const apiPrefix = `${apiHost}/qvm`

export type InstanceType = {
  type: string
  family: string
  family_name: string
  cpu: number
  memory: number
}

export async function getInstanceTypes(): Promise<InstanceType[]> {
  // mock API, TODO: 换成真的接口
  if (typeof window === 'undefined') {
    await timeout(300)
    return mockInstanceTypes
  }
  const res = await get(`${apiPrefix}/v1/open/instance_types`)
  return res.data
}

export const getInstanceTypesWithCache = memoize(getInstanceTypes)

export async function getInstanceTypesByFamily(family: string) {
  const allInstanceTypes = await getInstanceTypesWithCache()
  return allInstanceTypes.filter(
    instanceType => instanceType.family === family
  )
}

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
  // mock API, TODO: 换成真的接口
  if (typeof window === 'undefined') {
    await timeout(300)
    return { data: { infos: [{ atomic_items: [{ price: 2245.5 }] }] } }
  }

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

export type SupportedResourceInfo = {
  value: string // instance type
}

export type AvailableResourceInfo = {
  type: string // "InstanceType"
  supported_resources: {
    supported_resource: SupportedResourceInfo[]
  }
}

export type AvailableZoneInfo = {
  available_resources: {
    available_resources?: AvailableResourceInfo[]
  }
}

export type ResourceAvailableReponse = {
  data: {
    available_zone: AvailableZoneInfo[]
  }
}

/** 指定地区（region），获取该地区可用的 instance type 列表 */
export async function getInstanceTypesByRegion(regionId: string) {
  const response: ResourceAvailableReponse = await post(
    `${apiPrefix}/v1/open/resource_available`,
    {
      region_id: regionId,
      instance_charge_type: 'PrePaid',
      network_category: 'Vpc',
      destination_resource: 'InstanceType'
    },
    {
      headers: {
        'X-Qiniu-Regionid': regionId
      }
    }
  )
  const instanceTypes = response.data.available_zone.reduce(
    (types, zoneInfo) => [...types, ...getInstanceTypesOfZoneInfo(zoneInfo)],
    [] as string[]
  )
  return instanceTypes
}

/** 指定地区（region），获取该地区可用的 instance type 列表（带缓存） */
export const getInstanceTypesByRegionWithCache = memoize(getInstanceTypesByRegion)

function getInstanceTypesOfResourceInfo(resourceInfo: AvailableResourceInfo) {
  return resourceInfo.supported_resources.supported_resource.map(
    resource => resource.value
  )
}

function getInstanceTypesOfZoneInfo(zoneInfo: AvailableZoneInfo) {
  return (zoneInfo.available_resources.available_resources || []).reduce(
    (instanceTypes, resourceInfo) => [...instanceTypes, ...getInstanceTypesOfResourceInfo(resourceInfo)],
    [] as string[]
  )
}

export async function getRegionsByFamily(family: string) {
  const typesOfFamily = (await getInstanceTypesByFamily(family)).map(
    ({ type }) => type
  )
  const typesByRegion = await Promise.all(avaliableRegions.map(
    region => getInstanceTypesByRegionWithCache(region.id)
  ))
  // 区域下的 instance type 与指定 family 下的 instance type 有交集的
  // 就认为该区域有该 family 的机型，即，认为该区域符合要求
  return avaliableRegions.filter(
    (_, i) => {
      const typesOfRegion = typesByRegion[i]
      const typesOfRegionAndFamily = intersection(typesOfRegion, typesOfFamily)
      return typesOfRegionAndFamily.length > 0
    }
  )
}

export const getRegionsByFamilyWithCache = memoize(getRegionsByFamily)
