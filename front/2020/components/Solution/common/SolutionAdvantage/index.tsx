/**
 * @file 解决方案 方案优势
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

interface Props {
  /** advantage 组数应该不少于3个，不多于8个 */
  items: Item[]
}

export default function SolutionAdvantage({ items }: Props) {
  // 每行的 Item 个数
  let maxColumnsPerRow = 3

  // 等于 4 或者 大于 6 时，每行 4 个，其余情况每行 3 个
  if (items.length === 4) {
    maxColumnsPerRow = 4
  } else if (items.length > 6) {
    maxColumnsPerRow = 4
  }

  if (!items.length) {
    return null
  }

  return (
    <FeatureRaw maxColumnsPerRow={maxColumnsPerRow}>
      {items.map(({ title, desc, iconUrl }) => (
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
