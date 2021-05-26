import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Link from 'components/Link'

import Pack from './Pack'
import Transcoding from './Transcoding'
import Yellow from './Yellow'
import Instructor from './Instructor'
import Pub from './Pub'

import style from './index.less'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="计费方式" padding>
        <p className={style.text}>
          直播云服务的基础计费项为带宽计费。若选择流量计费，支持购买直播流量资源包进行流量抵扣。（开通流量计费请联系销售 400-808-9176 转 1）。
          此外还提供直播转码、直播鉴黄以及导播台等服务，会根据具体使用情况单独进行计费。
        </p>
      </PricePaneSection>
      <PricePaneSection title="价格详情">
        <Tabs defaultValue="1" size="middle">
          <TabPane value="1" tab="直播日峰值带宽计费">
            <p>按峰值带宽计费是以当日直播观看区域所在节点直播加速服务分别产生的带宽最高值（单位 Mbps）为结算标准。</p>
            <p style={{ marginBottom: '24px' }}>如需使用 95 峰值带宽计费，请联系销售或 <a className={style.link} href="https://support.qiniu.com/tickets/new">提交工单</a> 申请。</p>

            <p className={style.text}>1. 计费方式：每月出账后付费（账单）</p>
            <p className={style.text}>2. 计费规则：按直播日峰值带宽的阶梯价格计费，统计一个自然日内产生的带宽最高值（单位：Mbps）乘以对应的阶梯价格，为最终结算标准 </p>
            <p className={style.text}>3. 计费周期：按月出账，具体出账时间以系统为准</p>

            <p className={style.red}>请联系对应销售或拨打 400-808-9176 转 1 了解收费详情</p>
          </TabPane>
          <TabPane value="2" tab="直播流量计费">
            <p style={{ marginBottom: '24px' }}>按不同区域流量阶梯价格计费，流量累积到自然月底，下月自动清零重新累积。</p>

            <p className={style.text}>计费规则：</p>
            <p className={style.text}>1. 计费规则：按月到达阶梯计费，统计一个自然月内的流量累计值乘以对应的阶梯价格</p>
            <p className={style.text}>2. 计费周期：按月出账，具体出账时间以系统为准</p>

            <p className={style.red}>请联系对应销售或拨打 400-808-9176 转 1 了解收费详情</p>
          </TabPane>
          <TabPane value="3" tab="预付费直播流量包">
            <p className={style.alert}>
              内测用户专享<Link href="https://qmall.qiniu.com/template/NjE?ref=category&spec_combo=MjM0Nw" className={style.link} blue>购买资源包</Link>
            </p>
            <Pack />
          </TabPane>
          <TabPane value="4" tab="极速直播转码"><Transcoding /></TabPane>
          <TabPane value="5" tab="智能直播鉴黄"><Yellow /></TabPane>
          <TabPane value="6" tab="导播台计费"><Instructor /></TabPane>
          <TabPane value="7" tab="Pub 转推"><Pub /></TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}
