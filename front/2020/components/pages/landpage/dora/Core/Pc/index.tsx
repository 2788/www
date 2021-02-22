import React from 'react'
import Section from 'components/Product/Section'
import Button from 'components/UI/Button'
import { Product, urlMap } from 'constants/products'
import { Card, Row, InvisibleCard } from 'components/UI/Card'

import Dora from '../images/dora.svg'
import Censor from '../images/censor.svg'
import FaceID from '../images/faceid.svg'
import Vii from '../images/vii.svg'
import Ocr from '../images/ocr.svg'
import OpenAPI from '../images/openapi.svg'

import style from './index.less'

export default function CoreProduct() {
  return (
    <Section title="核心产品" name="core">
      <Row>
        <MyCard icon={<Dora />} link={urlMap[Product.Dora]} title="智能多媒体服务" desc="提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签" />
        <MyCard icon={<Censor />} link={urlMap[Product.Censor]} title="内容审核" desc="提供图片、视频等多媒体内容智能审核服务，精准高效识别过滤色情、暴恐、敏感人物、广告等违规内容，同时为您大幅度降低人工成本" />
        <MyCard icon={<FaceID />} link={urlMap[Product.FaceID]} title="人脸核验" desc="利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，解决用户身份核验需求，广泛应用于金融、教育、政务和直播等各类实名制场景中" />
        <MyCard icon={<Vii />} link={urlMap[Product.Vii]} title="视频智能分析" desc="视频智能分析是一款针对视频等多媒体文件，通过对视频，图片，音频等内容的多维理解，对其实现结构化标签提取，审核，识别等功能的产品，可广泛应用于多媒体内容的管理，搜索和推荐" />
      </Row>
      <Row>
        <MyCard icon={<Ocr />} link={urlMap[Product.Ocr]} title="票证自动识别 OCR" desc="票证自动识别 OCR 基于行业前沿的深度学习技术，提供身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率" />
        <MyCard icon={<OpenAPI />} link={urlMap[Product.OpenAPI]} title="Open API" desc="提供各种图片、音视频、以及其他数据处理的第三方服务接口，提供高质量的数据处理服务" />
        <InvisibleCard className={style.cardWrapper} />
        <InvisibleCard className={style.cardWrapper} />
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
      <div className={style.icon}>{icon}</div>
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDesc}>{desc}</div>
      <Button href={link} className={style.cardBtn} type="hollow" withBorder>了解更多</Button>
    </Card>
  )
}
