import React from 'react'
import Feature, { Group as FeatureGroup, Item as FeatureItem, Desc as FeatureDesc, Link as FeatureLink } from 'components/Product/Feature'
import { Product, urlMap } from 'constants/products'
import DoraIcon from '../images/dora.svg'
import CensorIcon from '../images/censor.svg'
import FaceidIcon from '../images/faceid.svg'

export default function ForMobile() {
  return (
    <Feature title="核心产品">
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<DoraIcon />}
          title="智能多媒体服务"
        >
          <FeatureDesc>提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签</FeatureDesc>
          <FeatureLink href={urlMap[Product.Dora]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<CensorIcon />}
          title="内容审核"
        >
          <FeatureDesc>提供图片、视频等多媒体内容智能审核服务，精准高效识别过滤色情、暴恐、敏感人物、广告等违规内容，同时为您大幅度降低人工成本</FeatureDesc>
          <FeatureLink href={urlMap[Product.Censor]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<FaceidIcon />}
          title="人脸核验"
        >
          <FeatureDesc>利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，解决用户身份核验需求，广泛应用于金融、教育、政务和直播等各类实名制场景中</FeatureDesc>
          <FeatureLink href={urlMap[Product.FaceID]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
