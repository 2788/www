import React from 'react'
import Section from 'components/Product/Section'
import { Row } from 'components/UI/Card'
import { EcProductCard } from 'components/pages/ecommerce/Product'

const cards = [
  {
    title: '入门版',
    sellPoints:
      [
        'CDN：10 GB',
        '存储：300 GB',
        '直播：10 GB',
        'RTC：免费 5000 分钟',
        'SDK 专业版：免费一个月'
      ],
    detailLink: '/events/free',
    lintText: '免费体验'
  },
  {
    title: '进阶版',
    sellPoints:
      [
        'CDN：10 TB',
        '存储：10 TB',
        '直播：50 TB',
        'RTC：2 万分钟',
        'SDK 专业版：1 年'
      ],
    detailLink: 'https://qmall.qiniu.com/',
    lintText: '立即购买'
  },
  {
    title: '高阶版',
    sellPoints:
      [
        'CDN：500 TB',
        '存储：200 TB',
        '直播：1 PB',
        'RTC：50 万分钟',
        'SDK专业版：1 年'
      ],
    detailLink: 'https://qmall.qiniu.com/',
    lintText: '立即购买'
  }
]

const tip = '其他转码、美颜等内容审核产品以及云主机产品请联系我们。'

export default function Product() {
  return (
    <Section name="product" title="推荐产品">
      <Row>
        {
          cards.map((item, index) => (
            <EcProductCard {...item} tipText={tip} index={index} key={index} />
          ))
        }
      </Row>
    </Section>
  )
}

