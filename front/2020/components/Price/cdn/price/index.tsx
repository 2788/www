import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Link from 'next/link'
import Alert from 'react-icecream'

import style from './index.less'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="计费方式" className={style.desc}>
        七牛云 CDN 加速按国内流量和海外流量阶梯价格计费（动态加速在此基础上额外加收请求数费用），当月分别超额累进（以自然月为一个累计周期）。
        开通七牛云 CDN 并完成实名认证的用户可分别享有国内和海外 10GB HTTP 下载流量以及 5 万次动态加速请求数免费额度。
        <Link href="#calc"><a className={style.link}>价格计算器 &gt;&gt;&gt;</a></Link>
      </PricePaneSection>
      <PricePaneSection title="价格详情" tip={'123'} className={style.desc}>
        七牛云 CDN 加速按国内流量和海外流量阶梯价格计费（动态加速在此基础上额外加收请求数费用），当月分别超额累进（以自然月为一个累计周期）。
        开通七牛云 CDN 并完成实名认证的用户可分别享有国内和海外 10GB HTTP 下载流量以及 5 万次动态加速请求数免费额度。
        <Link href="#calc"><a className={style.link}>价格计算器 &gt;&gt;&gt;</a></Link>
      </PricePaneSection>
    </PricePane>
  )
}

function Tip() {
  <Alert />
}
