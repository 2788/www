import React from 'react'
import { Product, categoryVideo, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

const subtitleMap = {
  [Product.Dora]: '提供云端图片、音视频基础处理、丰富的人工智能服务',
  [Product.Censor]: '提供图片、视频等内容的审核服务，精准识别过滤色情、暴恐、敏感人物等违规内容',
  [Product.Pili]: '提供全球化实时流服务和端到端直播场景解决方案',
  [Product.Rtn]: '基于 WebRTC 的一站式解决方案，零基础搭建音视频平台',
  [Product.Plsv]: '集合视频拍摄、编辑、上传等全套功能，快速打造手机 Vlog 制作神器',
  [Product.Plms]: '支持手机端 RTMP & QUIC 推流，简单易上手，马上开播',
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
