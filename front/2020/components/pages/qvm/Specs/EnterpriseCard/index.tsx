/**
 * @file 云主机-热销产品规格-企业版卡片
 */

import React, { useState, useMemo } from 'react'
import { urlForQvmBuy } from 'utils/route'
import { useApiWithParams } from 'hooks/api'
import { getPriceWithDiscount, PriceWithDiscount, GetPriceWithDiscountOptions, MetaInfo } from 'apis/qvm'
import { humanizeDuration, regionIdSorter } from 'constants/qvm'
import Button from 'components/UI/Button'
import Link from 'components/Link'

import style from './style.less'

export type Props = {
  name: string
  desc: string
  scenes: string[] // 适用场景
  details: Array<{
    // CPU内存比等
    title: string
    info: string
  }>
  instanceTypesByRegions: { [regionId: string]: string[] }
  metaInfo: MetaInfo
}

export default function EnterpriseCard(props: Props) {

  const scenesView = props.scenes.map(
    (scene, i) => (
      <li key={i} className={style.scene}>{scene}</li>
    )
  )

  const detailsView = props.details.map(
    detail => (
      <div key={detail.title} className={style.detail}>
        <p className={style.detailName}>{detail.title}</p>
        <p className={style.detailValue}>{detail.info}</p>
      </div>
    )
  )

  const formView = props.metaInfo && (
    <PriceForm {...props} metaInfo={props.metaInfo} />
  )

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <h4 className={style.name}>
          {props.name}
          <p className={style.desc}>{props.desc}</p>
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
        {formView}
      </div>
    </div>
  )
}

function PriceForm({ instanceTypesByRegions, metaInfo }: Props & { metaInfo: MetaInfo }) {

  const { regionMap, instanceTypeMap, durations } = metaInfo

  const regionIds = Object.keys(instanceTypesByRegions).sort(regionIdSorter)
  const [regionId, setRegionId] = useState(regionIds[0])
  const regionOptions = regionIds.map(id => (
    <option key={id} value={id}>{regionMap[id]}</option>
  ))

  const instanceTypes = instanceTypesByRegions[regionId] || []
  const [instanceType, setInstanceType] = useState(instanceTypes[0])
  const instanceTypeOptions = instanceTypes.map(type => (
    <option key={type} value={type}>{instanceTypeMap[type]}</option>
  ))

  const [duration, setDuration] = useState(durations[0])
  const durationOptions = durations.map(d => (
    <option key={d} value={d}>{humanizeDuration(d)}</option>
  ))

  const buyUrl = urlForQvmBuy({
    ui_mode: 'submit',
    region_id: regionId,
    instance_type: instanceType,
    buymonth: duration
  })

  const buyUrlWithNoParams = urlForQvmBuy()

  const priceOptions = useMemo(
    () => ({ regionId, instanceType, duration }),
    [regionId, instanceType, duration]
  )

  const { $: priceWithDiscount, loading, error } = useApiWithParams(
    getPrice,
    { params: [priceOptions] }
  )

  return (
    <form className={style.priceForm}>
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
      <PriceInfo loading={loading} info={priceWithDiscount} error={error} />
      {/* 这边不走 form 的 submit 是因为参数不好控制，参考 https://stackoverflow.com/questions/1116019/submitting-a-get-form-with-query-string-params-and-hidden-params-disappear */}
      <Button className={style.buyBtn} type="primary" href={buyUrl}>立即选配</Button>
      <Link href={buyUrlWithNoParams} className={style.moreOptions}>
        查看更多配置选项
      </Link>
    </form>
  )
}

type PriceInfoProps = {
  loading: boolean
  info: PriceWithDiscount | null
  error: any
}

function PriceInfo({ loading, info, error }: PriceInfoProps) {
  if (loading) {
    return <div className={style.priceInfo + ' ' + style.loading}>正在计算价格...</div>
  }
  if (error != null) {
    return <div className={style.priceInfo}>暂无库存</div>
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
