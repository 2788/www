import React from 'react'
import Section from 'components/Product/Section'
import Button from 'components/UI/Button'
import { Product, urlMap } from 'constants/products'

import DoraIcon from './images/dora.svg'
import CensorIcon from './images/censor.svg'
import FaceidIcon from './images/faceid.svg'

import style from './index.less'

export default function CoreProduct() {
  return (
    <Section title="核心产品" name="core">
      <div className={style.wrapper}>
        <Card icon={<DoraIcon />} link={urlMap[Product.Dora]} title="智能多媒体服务" desc="提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签。" />
        <Card icon={<CensorIcon />} link={urlMap[Product.Censor]} title="内容审核" desc="提供图片、视频等多媒体内容的智能审核服务，精准高效识别过滤色情、暴恐、敏感人物、广告等违规内容，同时为您大幅度降低人工成本。" />
        <Card icon={<FaceidIcon />} link={urlMap[Product.FaceID]} title="人脸核验" desc="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，解决用户身份核验需求，广泛应用于金融、教育、政务和直播等各类实名制场景中。" />
      </div>
    </Section>
  )
}

type CardProps = {
  icon: React.ReactElement
  title: string
  desc: string
  link: string
}

function Card(props: CardProps) {
  const { title, icon, desc, link } = props
  return (
    <div className={style.cardWrapper}>
      {icon}
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDesc}>{desc}</div>
      <Button href={link} className={style.cardBtn} type="hollow" withBorder>了解更多</Button>
    </div>
  )
}
