import React from 'react'
import Section from 'components/Product/Section'
import Button from 'components/UI/Button'
import { Product, urlMap } from 'constants/products'
import { Card, Row } from 'components/UI/Card'
import ProductIcon from 'components/Product/Icon'

import style from './index.less'

export default function CoreProduct() {
  return (
    <Section title="核心产品" name="core">
      <Row>
        <MyCard icon={<ProductIcon product={Product.Dora} />} link={urlMap[Product.Dora]} title="智能多媒体服务" desc="提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签" />
        <MyCard icon={<ProductIcon product={Product.Censor} />} link={urlMap[Product.Censor]} title="内容审核" desc="提供图片、视频等多媒体内容智能审核服务，精准高效识别过滤色情、暴恐、敏感人物、广告等违规内容，同时为您大幅度降低人工成本" />
        <MyCard icon={<ProductIcon product={Product.FaceID} />} link={urlMap[Product.FaceID]} title="人脸核验" desc="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，解决用户身份核验需求，广泛应用于金融、教育、政务和直播等各类实名制场景中" />
        <MyCard icon={<ProductIcon product={Product.OpenAPI} />} link={urlMap[Product.OpenAPI]} title="Open API" desc="提供各种图片、音视频、以及其他数据处理的第三方服务接口，提供高质量的数据处理服务" />
      </Row>
    </Section>
  )
}

type CardProps = {
  icon: React.ReactElement
  title: string
  desc: string
  link: string
}

function MyCard(props: CardProps) {
  const { title, icon, desc, link } = props
  return (
    <Card className={style.cardWrapper}>
      {icon}
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDesc}>{desc}</div>
      <Button href={link} className={style.cardBtn} type="hollow" withBorder>了解更多</Button>
    </Card>
  )
}
