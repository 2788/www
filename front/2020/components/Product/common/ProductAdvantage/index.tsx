/**
 * @file 产品页 核心优势
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'
import { LibIcon } from 'components/LibIcon'

import {
  Item as FeatureItem,
  Raw as FeatureRaw
} from '../../Feature/v2'
import Description from '../Description'

interface Props {
  /** advantage 分别是 2 组、3 组、4 组、6组 */
  items: Array<{
    title: string
    desc: string
    iconUrl: string
  }>
}

export default function ProductAdvantage({ items }: Props) {
  if (!items.length) {
    return null
  }

  // advantage 分别是 2 组或 3 组时，一行展示；4 组或 6 组时，两行展示
  const maxColumnsPerRow = (items.length === 3 || items.length === 6) ? 3 : 2

  return (
    <FeatureRaw maxColumnsPerRow={maxColumnsPerRow}>
      {items.map(({ title, desc, iconUrl }) => (
        <FeatureItem
          key={title}
          icon={<LibIcon alt="核心优势" src={iconUrl} />}
          title={title}
          desc={<Description>{desc}</Description>}
          pos="left-right"
        />
      ))}
    </FeatureRaw>
  )
}
