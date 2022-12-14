/**
 * @file 产品页 核心优势
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'
import { LibIcon } from 'components/LibIcon'

import {
  Group as FeatureGroup,
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
  // row 为分几行展示，items.length / row 为一行的 item 个数
  const row = items.length < 4 ? 1 : 2
  const itemsRow1 = items.slice(0, items.length / row)
  const itemsRow2 = items.slice(items.length / row)

  return (
    <FeatureRaw>
      <FeatureGroup>
        {itemsRow1.map(({ title, desc, iconUrl }) => (
          <FeatureItem
            key={title}
            icon={<LibIcon alt="核心优势" src={iconUrl} />}
            title={title}
            desc={<Description>{desc}</Description>}
            pos="left-right"
          />
        ))}
      </FeatureGroup>

      {!!itemsRow2.length && (
        <FeatureGroup>
          {itemsRow2.map(({ title, desc, iconUrl }) => (
            <FeatureItem
              key={title}
              icon={<LibIcon alt="核心优势" src={iconUrl} />}
              title={title}
              desc={<Description>{desc}</Description>}
              pos="left-right"
            />
          ))}
        </FeatureGroup>
      )}
    </FeatureRaw>
  )
}
