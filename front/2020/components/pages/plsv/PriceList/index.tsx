import React from 'react'
import Section from 'components/Product/Section'
import Button from 'components/UI/Button'
import { Row, Card } from 'components/UI/Card'

import style from './style.less'

export default function PriceList() {
  return (
    <Section title="价格列表" name="price">
      <Row>
        <MyCard title="精简版" desc="满足视频的基本拍摄并形成视频输出，默认提供基础美颜能力" price="2016" />
        <MyCard title="基础版" desc="主要提供单个视频的拍摄及编辑，以及图片生成视频等功能" price="8136" />
        <MyCard title="进阶版" desc="包含了视频拍摄录制、视频剪辑合成、视频编辑处理的大部分功能，可以满足大部分的短视频需求，让拍摄的视频美妙绝伦" price="60000" />
        <MyCard title="专业版" desc="在进阶版的基础上，提供了更加丰富的高级功能，以满足用户个性化拍摄的需求，比如分屏合拍、局部录屏、图片视频的混拼、过场字幕等能力" price="120000" />
      </Row>
    </Section>
  )
}

type CardProps = {
  title: string
  desc: string
  price: string
  link?: string
}

function MyCard({ title, desc, price }: CardProps) {
  return (
    <Card>
      <div className={style.card}>
        <div className={style.header}>
          <div className={style.title}>{title}</div>
          <p className={style.desc}>{desc}</p>
        </div>
        <div className={style.footer}>
          <p className={style.price}><span className={style.number}>{price}</span> 元/年</p>
          <Button href="https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com" withBorder className={style.button}>立即购买</Button>
        </div>
      </div>
    </Card>
  )
}
