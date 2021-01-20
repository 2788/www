/**
 * @file: 视频智能分析 相关产品
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { Product } from 'constants/products'
import Section from 'components/Product/Section'
import Related, { ProductItem } from 'components/Solution/Related/New'

export default function RelatedProducts() {
  return (
    <Section name="related" title="相关产品" withTailPadding>
      <Related>
        <ProductItem product={Product.FaceID} />
        <ProductItem product={Product.Censor} />
        <ProductItem product={Product.Ocr} />
      </Related>
    </Section>
  )
}
