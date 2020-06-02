import React from 'react'
import { Product, categoryStorage, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'

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
  const { showModal } = useModal()
  const { close } = useDropdown()

  function handleHDFSClick() {
    // eslint-disable-next-line no-unused-expressions
    close?.()
    showModal()
  }

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
        onClick={handleHDFSClick}
        href="#"
        icon={<ProductIcon product={Product.Hdfs} />}
        title="HDFS"
        subtitle="即将上线，欢迎垂询"
      />
    </>
  )
}
