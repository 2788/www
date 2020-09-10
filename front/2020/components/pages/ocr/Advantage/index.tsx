import React from 'react'
import { Row, LayoutCard, Desc, Title } from 'components/UI/Card'
import Section from 'components/Product/Section'

import archive from './images/archive.png'
import connection from './images/connection.png'
import image from './images/image.png'
import scale from './images/scale.png'

import style from './index.less'

export default function Advantage() {
  return (
    <Section title="产品优势" name="advantage" className={style.section}>
      <Row className={style.row}>
        <MyCard
          src={archive}
          title="准确率高"
          desc="利用海量的图片样本训练模型，具有业内领先的准确率"
        />
        <MyCard
          src={scale}
          title="服务稳定"
          desc="提供弹性服务，扩展性好，算法持续迭代优化"
        />
      </Row>
      <Row className={style.row}>
        <MyCard
          src={image}
          title="识别速度快"
          desc="单张图片毫秒级返回"
        />
        <MyCard
          src={connection}
          title="接入方便"
          desc="服务使用简单快捷，兼容性强，并提供全流程技术支持"
        />
      </Row>
    </Section>
  )
}

type MyCardProps = {
  src: string
  title: string
  desc: string
}

function MyCard({ src, title, desc }: MyCardProps) {
  return (
    <LayoutCard className={style.card}>
      <img className={style.image} src={src} />
      <div className={style.content}>
        <Title className={style.title}>{title}</Title>
        <Desc className={style.desc}>{desc}</Desc>
      </div>
    </LayoutCard>
  )
}
