import React, { useContext } from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import { Alert } from 'react-icecream'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { BannerContext } from 'components/Price/Banner'

import MainLand from './MainLand'
import Other from './Other'
import DynamicAcc from './DynamicAcc'

import style from './index.less'

export default function Price() {
  const { setActive } = useContext(BannerContext)

  return (
    <PricePane>
      <PricePaneSection title="计费方式" className={style.desc}>
        七牛云 CDN 加速按国内流量和海外流量阶梯价格计费（动态加速在此基础上额外加收请求数费用），当月分别超额累进（以自然月为一个累计周期）。 开通七牛云 CDN 并完成实名认证的用户可分别享有国内和海外 10GB HTTP
        下载流量以及 5 万次动态加速请求数免费额度。
        <a className={style.link} onClick={() => setActive('calc')}>价格计算器 &gt;&gt;&gt;</a>
      </PricePaneSection>
      <PricePaneSection title="价格详情" tip={<Tip />} className={style.desc}>
        <Tabs defaultValue="1">
          <TabPane value="1" tab="中国大陆"><MainLand /></TabPane>
          <TabPane value="2" tab="其他地区">
            <Other />
          </TabPane>
          <TabPane value="3" tab="动态加速请求数">
            <DynamicAcc />
          </TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}

function Tip() {
  const message = (
    <a href="https://marketing.qiniu.com/activity/20200423?entry=portal-cdnoverview" target="_blank" rel="noopener">
      CDN 日间流量包限时 <span className={style.discount}>5折</span> 优惠
    </a>
  )

  return <Alert type="info" message={message} closable />
}
