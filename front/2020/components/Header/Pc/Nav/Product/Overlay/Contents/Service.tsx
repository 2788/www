import React from 'react'
import { Product, categoryService, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

const subtitleMap = {
  [Product.Cdn]: '优质节点、可监控、智能调度的内容分发服务',
  [Product.Ssl]: '提供 SSL 证书申请、管理等一站式服务',
  [Product.Pili]: '提供全球化实时流服务和端到端直播场景解决方案',
  [Product.Qvm]: '提供云主机、负载均衡、云数据库、高防等服务',
  [Product.Sms]: '致力于为用户提供快捷高效的通信服务能力'
}

export default function Service() {
  const itemsView = categoryService.map(product => (
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
