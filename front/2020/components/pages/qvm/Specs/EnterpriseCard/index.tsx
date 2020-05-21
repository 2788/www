/**
 * @file 云主机-热销产品规格-企业版卡片
 */

import React, { useState, useMemo } from 'react'
import { urlForQvmBuy } from 'utils/route'
import { useApiWithParams } from 'hooks/api'
import { useOnChange } from 'hooks'
import {
  getInstanceTypesByFamily, getPriceWithDiscount, PriceWithDiscount, GetPriceWithDiscountOptions,
  getInstanceTypesByRegionWithCache as getInstanceTypesByRegion,
  getRegionsByFamilyWithCache as getRegionsByFamily
} from 'apis/qvm'
import { availableDurations, humanizeDuration, avaliableRegions } from 'constants/qvm'
import Button from 'components/UI/Button'

import style from './style.less'

type Detail = {
  name: string
  value: string
}

export type Props = {
  family: string // 实例族
  name: string
  desc: string
  scenes: string[]
  details: Detail[]
}

export default function EnterpriseCard({ family, name, desc, scenes, details }: Props) {

  const scenesView = scenes.map(
    (scene, i) => (
      <li key={i} className={style.scene}>{scene}</li>
    )
  )

  const detailsView = details.map(
    detail => (
      <div key={detail.name} className={style.detail}>
        <p className={style.detailName}>{detail.name}</p>
        <p className={style.detailValue}>{detail.value}</p>
      </div>
    )
  )

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <h4 className={style.name}>
          {name}
          <p className={style.desc}>{desc}</p>
        </h4>
        <div className={style.sceneBlock}>
          适用场景：
          <ul className={style.scenes}>
            {scenesView}
          </ul>
        </div>
        <div className={style.details}>
          {detailsView}
        </div>
      </div>
      <div className={style.priceBlock}>
        <PriceForm family={family} />
      </div>
    </div>
  )
}

type PriceFormProps = {
  family: string
}

function PriceForm({ family }: PriceFormProps) {

  const { $: regions, loading: regionsLoading } = useApiWithParams(
    getRegionsByFamily,
    { params: [family] }
  )

  const [regionId, setRegionId] = useState(avaliableRegions[0].id)

  // regions 数据加载好后默认使用第一项
  useOnChange(() => {
    if (
      regions && regions.length > 0
      && !regions.some(region => region.id === regionId)
    ) {
      setRegionId(regions[0].id)
    }
  }, [regions])

  // TODO: 顺序
  const regionOptions = [
    regionsLoading && (
      <option key="" value="">加载中...</option>
    ),
    ...(regions || []).map(
      ({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      )
    )
  ]

  const [instanceType, setInstanceType] = useState<string | undefined>(undefined)

  const { $: instanceTypesOfFamily } = useApiWithParams(
    getInstanceTypesByFamily,
    { params: [family] }
  )
  const { $: instanceTypesOfRegion } = useApiWithParams(
    getInstanceTypesByRegion,
    { params: [regionId] }
  )

  const instanceTypes = (instanceTypesOfFamily || []).filter(
    type => instanceTypesOfRegion && instanceTypesOfRegion.indexOf(type.type) >= 0
  )

  // TODO: 顺序
  const instanceTypeOptions = [
    <option key="" value="">请选择类型</option>,
    ...(instanceTypes || []).map(
      ({ type, cpu, memory }) => (
        <option key={type} value={type}>{cpu} 核 {memory} G</option>
      )
    )
  ]

  // instanceTypes 数据加载好后默认使用第一项
  useOnChange(() => {
    if (
      instanceTypes && instanceTypes.length > 0
      && !instanceTypes.some(item => item.type === instanceType)
    ) {
      setInstanceType(instanceTypes[0].type)
    }
  }, [instanceTypes])

  const [duration, setDuration] = useState(12)

  const durationOptions = availableDurations.map(
    d => (
      <option key={d} value={d}>{humanizeDuration(d)}</option>
    )
  )

  const buyUrl = urlForQvmBuy({
    region_id: regionId,
    instance_type: instanceType,
    buymonth: duration
  })

  const buyUrlWithNoParams = urlForQvmBuy()

  const priceOptions = useMemo(
    () => ({ regionId, instanceType, duration }),
    [regionId, instanceType, duration]
  )

  const { $: priceWithDiscount, loading } = useApiWithParams(
    getPrice,
    { params: [priceOptions] }
  )

  return (
    <form className={style.priceForm} action={buyUrl} method="GET" target="_blank">
      <label className={style.formItem}>
        <span className={style.text}>地域</span>
        <select
          name="region"
          className={style.ctrl}
          value={regionId}
          onChange={e => setRegionId(e.target.value)}
        >{regionOptions}</select>
      </label>
      <label className={style.formItem}>
        <span className={style.text}>CPU 内存</span>
        <select
          name="instanceType"
          className={style.ctrl}
          value={instanceType}
          onChange={e => setInstanceType(e.target.value)}
        >{instanceTypeOptions}</select>
      </label>
      <label className={style.formItem}>
        <span className={style.text}>购买时长</span>
        <select
          name="duration"
          className={style.ctrl}
          value={duration}
          onChange={e => setDuration(parseInt(e.target.value, 10))}
        >{durationOptions}</select>
      </label>
      <PriceInfo loading={loading} info={priceWithDiscount} />
      <Button className={style.buyBtn} type="primary" htmlType="submit">立即选配</Button>
      <a target="_blank" rel="noopener" href={buyUrlWithNoParams} className={style.moreOptions}>
        查看更多配置选项
      </a>
    </form>
  )
}

type PriceInfoProps = {
  loading: boolean
  info: PriceWithDiscount | null
}

function PriceInfo({ loading, info }: PriceInfoProps) {
  if (loading) {
    return <div className={style.priceInfo + ' ' + style.loading}>正在计算价格...</div>
  }
  if (!info) {
    return <div className={style.priceInfo}></div>
  }
  return (
    <div className={style.priceInfo}>
      <strong className={style.price}>￥{info.price.toFixed(2)}</strong>
      {info.discount > 0 && <span className={style.discount}>优惠￥{info.discount.toFixed(2)}</span>}
    </div>
  )
}

async function getPrice({ regionId, instanceType, duration }: Partial<GetPriceWithDiscountOptions>) {
  if (!regionId || !instanceType || !duration) return null
  return getPriceWithDiscount({ regionId, instanceType, duration })
}
