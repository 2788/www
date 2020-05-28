import React from 'react'
import { Product, categoryStorage, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

const hotMap = {
  [Product.Kodo]: true,
  [Product.Archive]: false
}

const subtitleMap = {
  [Product.Kodo]: '高可用、易扩展、低成本、一站式、支持边缘存储',
  [Product.Archive]: '可定制化的数百 EB 级别、高可靠、强安全的存储系统'
}

export default function Storage() {
  return (
    <>
      {categoryStorage.map(product => (
        <Item
          key={product}
          href={urlMap[product]}
          icon={<ProductIcon product={product} />}
          hot={hotMap[product]}
          title={nameMap[product]}
          subtitle={subtitleMap[product]}
        />
      ))}
      <Item
        href="#"
        disabled
        icon={<ProductIcon product={Product.Hdfs} />}
        title="HDFS"
        subtitle="正在建设，敬请期待"
      />
    </>
  )
}
