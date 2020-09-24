import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Link from 'components/Link'
import Button from 'components/UI/Button'

import MainLand from './MainLand'
import Other from './Other'
import DynamicAcc from './DynamicAcc'

import style from './index.less'

export default function Price() {
  const packageLink = 'https://qmall.qiniu.com/template/MTY'
  return (
    <PricePane>
      <PricePaneSection title="计费方式" padding>
        <p className={style.desc}>
          七牛云 CDN 加速按国内流量和海外流量阶梯价格计费（动态加速在此基础上额外加收请求数费用），当月分别超额累进（以自然月为一个累计周期）。开通七牛云 CDN 并完成实名认证的用户可分别享有国内和海外 10 GB HTTP
          下载流量以及 5 万次动态加速请求数免费额度。
        </p>
        <p className={style.desc}>CDN 支持两种计费方式，即按量计费的后付费方式和购买资源包的预付费方式，购买资源包可享更多优惠。</p>
        <p className={style.desc}>了解更多计费说明，<Link blue href="https://developer.qiniu.com/fusion/manual/6843/cdn-product-pricing">请点击这里</Link></p>
        <Button type="hollow" href={packageLink} withBorder style={{ marginTop: '12px' }}>购买资源包</Button>
      </PricePaneSection>
      <PricePaneSection title="价格详情" className={style.desc}>
        <Tabs defaultValue="1" size="middle">
          <TabPane value="1" tab="中国大陆流量"><MainLand /></TabPane>
          <TabPane value="2" tab="其他地区流量">
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

// function Tip() {
//   const message = (
//     <a href="https://marketing.qiniu.com/activity/20200423?entry=portal-cdnoverview" target="_blank" rel="noopener">
//       CDN 日间流量包限时 <span className={style.discount}>5 折</span> 优惠
//     </a>
//   )

//   return <Alert type="info" message={message} closable />
// }
