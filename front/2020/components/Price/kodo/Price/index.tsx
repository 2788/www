import React, { CSSProperties } from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import Hot from 'components/Hot'

import South from './South'
import East from './East'
import style from './index.less'
import North from './North'
import US from './US'
import SouthAsia from './SouthAsia'
import EashZheJiang2 from './EastZheJiang2'
import Region, { nameMap } from '../region'

export default function Price() {
  const isMobile = useMobile()
  const packageLink = 'https://qmall.qiniu.com/template/MTEy?spec_combo=MzA0Mw'

  return (
    <PricePane>
      <PricePaneSection title="计费方式" padding>
        <p className={style.desc}>
          对象存储服务的基础计费项包括：存储空间容量，流量，请求次数。此外还提供跨区域同步、存储类型转换、存储数据处理（如图片处理服务等）等服务，会根据您的使用情况单独计费，不使用不计费。
        </p>
        <p className={style.desc}>
          存储空间费用基于存储区域按照阶梯累积计费方式，超出阶梯部分按照下一阶梯价格计费，存储空间使用越大，价格越低。
        </p>
        <p className={style.desc}>对象存储服务支持两种计费方式，即按量计费的后付费方式和购买资源包的预付费方式，购买资源包可享更多优惠。</p>
        <p className={style.desc}>了解更多计费说明，<Link className={style.link} href="https://developer.qiniu.com/kodo/manual/6379/metering-and-billing">请点击这里</Link></p>
        <Button type="hollow" href={packageLink} withBorder style={{ marginTop: '12px' }}>购买资源包</Button>
        <h4 className={style.textTitle}>标准存储</h4>
        <p className={style.desc}>开通七牛云对象存储服务的实名认证用户，每月可享受一定量的标准存储免费存储空间、标准存储免费 CDN 回源流量和标准存储免费请求数目。</p>
        <p className={style.desc} style={{ marginBottom: '16px' }}>每月计费时，会先抵扣免费额度，超出部分再按照价格详情付费结算。</p>
        <Card title="标准存储每月免费空间" num="10" unit="GB" />
        <Card title="标准存储每月免费 CDN 回源流量" num="10" unit="GB" />
        <Card title="标准存储每月免费写请求 PUT/DELETE" num="10" unit="万次" />
        <Card title="标准存储每月免费读请求 GET" num="100" unit="万次" />
        <Card title="每月免费上传流量" num="无上限" unit="" style={{ width: isMobile ? '100%' : '136px' }} />
      </PricePaneSection>
      <PricePaneSection title="价格详情" className={style.desc}>
        <Tabs defaultValue={Region.EastZheJiang2} size="middle">
          <TabPane value={Region.EastZheJiang2} tab={<>{nameMap[Region.EastZheJiang2]} <Hot text="new" /></>}><EashZheJiang2 /></TabPane>
          <TabPane value={Region.South} tab={nameMap[Region.South]}><South /></TabPane>
          <TabPane value={Region.East} tab={nameMap[Region.East]}><East /></TabPane>
          <TabPane value={Region.North} tab={nameMap[Region.North]}><North /></TabPane>
          <TabPane value={Region.US} tab={nameMap[Region.US]}><US /></TabPane>
          <TabPane value={Region.SouthAsia} tab={nameMap[Region.SouthAsia]}><SouthAsia /></TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}

type CardProps = {
  title: string
  num: string
  unit: string
  style?: CSSProperties
}

function Card(props: CardProps) {
  const { title, num, unit, ...others } = props

  return (
    <div className={style.card} {...others}>
      <p className={style.title}>{title}</p>
      <p><span className={style.num}>{num}</span><span className={style.unit}>{unit}</span></p>
    </div>
  )
}
