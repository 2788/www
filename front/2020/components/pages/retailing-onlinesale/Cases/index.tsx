/* eslint-disable max-len */
import React from 'react'
import Section from 'components/Product/Section'
import { Case } from 'components/Solution/Cases'

import woo from './images/woo.png'
import style from './style.less'

export interface Props {
  onConsult: () => void
}

export default function Cases({ onConsult }: Props) {
  return (
    <Section name="cases" title="客户案例" withTailPadding>
      <Case logo={woo} title="嫵WOO" onConsult={onConsult}>
        <div className={style.content}>
          <p>嫵WOO 是中国高端围巾披肩奢侈品牌。在以往某宝某东直播过程中，无法获取有价值的直播观看数据，难以推动销售跟进，是其电商营销过程中的痛点。</p>
          <p>通过新零售在线销售解决方案，WOO 充分了解客户在何时将商品放入购物车、何时分享朋友圈、何时下单，长期关注哪类商品；同时，将直播系统与自身会员系统打通，累积私域客户长期数据，呈现出真实、立体、详尽的客户画像，精准匹配客户偏好。</p>
          <p>直播间里，客户可主动与主播或助理申请连麦，实时视频咨询，帮助客户了解围巾产品的特色、材质、系法、搭配场景。同时，系统搭配产品一键推送购买的功能，沉淀商品访问、订单转化，激活私域流量，撬动巨量级的电商业务增长。</p>
        </div>
      </Case>
    </Section>
  )
}
