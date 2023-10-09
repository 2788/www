/**
 * @file 方案优势 垂直布局 图片为 Icon
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import {
  Item as FeatureItem,
  Raw as FeatureRaw
} from 'components/Product/Feature/v2'
import { LibIcon } from 'components/LibIcon'
import Description from 'components/Product/common/Description'

interface Item {
  title: string
  desc: string
  iconUrl: string
}

export interface Props {
  /** advantage 组数应该不少于 3 个，不多于 6 个 */
  items: Item[]
}

export default function VerticalIconAdvantage({ items }: Props) {
  // 每行的 Item 个数
  const maxColumnsPerRow = 3

  if (!items.length) {
    return null
  }

  return (
    <FeatureRaw maxColumnsPerRow={maxColumnsPerRow}>
      {items.slice(0, 6).map(({ title, desc, iconUrl }) => (
        <FeatureItem
          key={title}
          icon={<LibIcon alt="方案优势" src={iconUrl} />}
          title={title}
          desc={<Description>{desc}</Description>}
          pos="top-down"
        />
      ))}
    </FeatureRaw>
  )
}
