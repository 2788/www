import React from 'react'
import Feature, { Group as FeatureGroup, Item as FeatureItem, Desc as FeatureDesc, Link as FeatureLink } from 'components/Product/Feature'
import { ProductProps } from '../index'

export default function ForMobile({ data }: ProductProps) {
  return (
    <Feature title="产品简介" header="丰富的云数据库产品" name="product">
      {
        data.map((product, index) => (
          <FeatureGroup key={index}>
            {
              product.map((item, i) => {
                if (!item) return null
                return (
                  <FeatureItem pos="left-right" align="left" icon={item.icon} title={item.title} key={`${index}-${i}`}>
                    <FeatureDesc>{item.desc}</FeatureDesc>
                    <FeatureLink href={item.href}>了解更多</FeatureLink>
                  </FeatureItem>
                )
              })
            }
          </FeatureGroup>
        ))
      }
    </Feature>
  )
}
