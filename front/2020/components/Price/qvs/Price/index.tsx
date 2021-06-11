import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Link from 'components/Link'
import Button from 'components/UI/Button'

import Bandwidth from './Bandwidth'
import Flow from './Flow'
import Device from './Device'

import style from './index.less'

const packageLink = 'https://qmall.qiniu.com/template/NDY'
const desc = '视频监控（QVS）服务的计费方式为后付费的按量计费，上行接入和下行播放默认使用带宽日峰值计费，同时提供上下行流量资源包的预付费方式，预付费资源包中上下行流量包仅支持按【流量】计费类型使用，购买后需切换为按流量计费，否则资源包无法抵扣。'

export default function Price() {

  return (
    <PricePane>
      <PricePaneSection title="计费方式" padding>
        <p className={style.desc}>
          {desc}
        </p>
        <p className={style.desc}>了解更多计费说明，<Link blue href="https://developer.qiniu.com/qvs/manual/6893/qvs-billing-way">请点击这里</Link></p>
        <Button type="hollow" href={packageLink} withBorder style={{ marginTop: '12px' }}>购买资源包</Button>
      </PricePaneSection>
      <PricePaneSection title="价格详情" className={style.desc}>
        <Tabs defaultValue="1" size="middle">
          <TabPane value="1" tab="带宽日峰值计费"><Bandwidth /></TabPane>
          <TabPane value="2" tab="流量计费"><Flow /></TabPane>
          <TabPane value="3" tab="设备管理费"><Device /></TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}
