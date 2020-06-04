import React from 'react'
import { Product, categoryStorage, urlMap, nameMap, descMap, categoryNameMap, Category } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'

import Item from './Item'
import Section from './Section'

const hotMap = {
  [Product.Kodo]: true,
  [Product.Archive]: false
}

export default function Storage({ registerScrollTop }: { registerScrollTop(value: number): void }) {
  const { showModal } = useModal()
  const { close } = useDropdown()

  function handleHDFSClick() {
    // eslint-disable-next-line no-unused-expressions
    close?.()
    showModal()
  }

  return (
    <Section registerScrollTop={registerScrollTop} title={categoryNameMap[Category.Storage]}>
      {categoryStorage.map(product => (
        <Item
          key={product}
          href={urlMap[product]}
          icon={<ProductIcon product={product} />}
          hot={hotMap[product]}
          title={nameMap[product]}
          subtitle={descMap[product]}
        />
      ))}
      <Item
        onClick={handleHDFSClick}
        href="#"
        icon={<ProductIcon product={Product.Hdfs} />}
        title={nameMap[Product.Hdfs]}
        subtitle="即将上线，欢迎垂询"
      />
    </Section>
  )
}
