/**
 * @file ssl 热销产品规格 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Button from 'components/UI/Button'
import Section from 'components/Product/Section'

import CheckedIcon from './checked.svg'
import style from './index.less'

export default function Products() {
  return (
    <Section name="products" title="热销产品规格">
      <Card
        title="DV 个人免费证书"
        detailLink="/prices?entry=kodo-page"
        sellPoints={['适合行业：个人网站', '域名支持：单个', '加密等级：较强', '签发时间：小时级']}
      />
      <Card
        title="DV 泛域名证书"
        detailLink="/prices?entry=kodo-page"
        sellPoints={['适合行业：个人网站', '域名支持：单个', '加密等级：较强', '签发时间：小时级']}
      />
      <Card
        title="OV 企业证书"
        detailLink="/prices?entry=kodo-page"
        sellPoints={['适合行业：企业网站', '域名支持：单个', '加密等级：较强', '签发时间：小时级']}
      />
      <Card
        title="EV 企业增强证书"
        detailLink="/prices?entry=kodo-page"
        sellPoints={['适合行业：企业网站', '域名支持：单个', '加密等级：较强', '签发时间：小时级']}
      />
    </Section>
  )
}

type CardProps = {
  title: string
  sellPoints: string[]
  detailLink: string
}

function Card(props: CardProps) {
  const { title, sellPoints, detailLink } = props
  const sellPointItems = sellPoints.map((sellPoint, index) => (
    <p key={index} className={style.row}>
      <CheckedIcon className={style.icon} />
      {sellPoint}
    </p>
  ))

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      <div className={style.body}>
        {sellPointItems}
      </div>
      <div className={style.footer}>
        <Button className={style.button} href={detailLink} withBorder>
          购买
        </Button>
      </div>
    </div>
  )
}