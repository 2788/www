/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo } from 'react'

import {
  Product, nameMap, descMap, largeIconMap, urlMap,
  SubCategory, subCategoryProductsMap, normalizeProduct
} from 'constants/products'
import qcdnDbjsLargeIconUrl from 'constants/products/icons/large/qcdn_dbjs.png'

import Item, { Props as ItemProps } from './Item'
import style from './products.less'

interface ProductInfo extends ItemProps {
  key: string
}

function match(keyword: string): ProductInfo | undefined {
  const tag = keyword.replace(/\s/g, '').toLowerCase()

  const keys = Object.keys(nameMap) as Product[]
  for (const key of keys) {
    const name = nameMap[key]
    if (name.replace(/\s/g, '').toLowerCase() === tag) {
      const icon = largeIconMap[key]
      const url = urlMap[key]
      if (icon && url) {
        return {
          key,
          name,
          desc: descMap[key],
          icon,
          url
        }
      }
    }
  }

  // TODO: 把类似 点播加速 的东西弄成一个产品？
  if (tag === '点播加速') {
    const product = Product.Cdn
    const config = subCategoryProductsMap[SubCategory.Audio]
      .map(partialProductData => normalizeProduct(partialProductData))
      .find(productData => productData.product === product)
    const desc = config?.desc
    const icon = qcdnDbjsLargeIconUrl
    const url = urlMap[product]
    if (desc && icon && url) {
      return {
        key: `${product}_dbjs`,
        name: tag,
        desc,
        icon,
        url
      }
    }
  }
}

export interface Props {
  keywords: string[]
}

export default function Products({ keywords }: Props) {
  const products = useMemo(
    () => keywords.map(keyword => match(keyword)).filter(Boolean).slice(0, 3) as ProductInfo[],
    [keywords]
  )

  if (products.length === 0) {
    return null
  }

  return (
    <div className={style.main}>
      <div className={style.title}>相关产品</div>
      <div className={style.list}>
        {products.map(product => (<Item key={product.key} {...product} />))}
      </div>
    </div>
  )
}
