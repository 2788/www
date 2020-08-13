import React from 'react'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import { urlMap, Product } from 'constants/products'

export default function Doc() {
  return (
    <LinkGroups title="产品文档">
      <LinkGroup title="使用文档">
        <LinkItem href="https://developer.qiniu.com/dora/api/3688/the-third-party-data-processing">产品简介</LinkItem>
      </LinkGroup>
      <LinkGroup title="产品推荐">
        <LinkItem href={urlMap[Product.Dora]}>智能多媒体服务</LinkItem>
        <LinkItem href={urlMap[Product.Censor]}>内容审核</LinkItem>
        <LinkItem href={urlMap[Product.FaceID]}>人脸核验</LinkItem>
      </LinkGroup>
    </LinkGroups>
  )
}
