import React from 'react'
import Feature, { Group as FeatureGroup, Item as FeatureItem, Desc as FeatureDesc, Link as FeatureLink } from 'components/Product/Feature'
import { Product, urlMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'

export default function ForMobile() {
  return (
    <Feature title="核心产品">
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<ProductIcon product={Product.Dora} />}
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
          icon={<ProductIcon product={Product.Censor} />}
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
          icon={<ProductIcon product={Product.FaceID} />}
          title="人脸核验"
        >
          <FeatureDesc>利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，解决用户身份核验需求，广泛应用于金融、教育、政务和直播等各类实名制场景中</FeatureDesc>
          <FeatureLink href={urlMap[Product.FaceID]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<ProductIcon product={Product.Vii} />}
          title="视频智能分析"
        >
          <FeatureDesc>
            视频智能分析是一款针对视频等多媒体文件，通过对视频，图片，音频等内容的多维理解，对其实现结构化标签提取，审核，识别等功能的产品，可广泛应用于多媒体内容的管理，搜索和推荐
          </FeatureDesc>
          <FeatureLink href={urlMap[Product.Vii]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<ProductIcon product={Product.Ocr} />}
          title="票证自动识别 OCR"
        >
          <FeatureDesc>
            票证自动识别 OCR 基于行业前沿的深度学习技术，提供身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率
          </FeatureDesc>
          <FeatureLink href={urlMap[Product.Ocr]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          align="left"
          icon={<ProductIcon product={Product.OpenAPI} />}
          title="Open API"
        >
          <FeatureDesc>提供各种图片、音视频、以及其他数据处理的第三方服务接口，提供高质量的数据处理服务</FeatureDesc>
          <FeatureLink href={urlMap[Product.OpenAPI]}>了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
