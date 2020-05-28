import React from 'react'
import { Product, categoryVideo, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

const subtitleMap = {
  [Product.Dora]: '提供云端图片、音视频基础处理、丰富的人工智能服务',
  [Product.Censor]: '七牛云人工智能实验室提供的一站式内容审核服务',
  [Product.Rtn]: '基于 WebRTC 的一站式解决方案，零基础搭建音视频平台',
  [Product.Plsv]: '自然场景下对整图和文字进行检测、定位和识别',
  [Product.Plms]: '基于 WebRTC 的一站式解决方案，零基础搭建音视频平台',
  [Product.FaceID]: '利用活体检测、1:1 人脸比对、身份证 OCR 等 AI 技术，对用户身份进行审核验证'
}

export default function Video() {
  const itemsView = categoryVideo.map(product => (
    <Item
      key={product}
      href={urlMap[product]}
      icon={<ProductIcon product={product} />}
      title={nameMap[product]}
      subtitle={subtitleMap[product]}
    />
  ))
  return <>{itemsView}</>
}
