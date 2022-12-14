/**
 * @file 解决方案 方案优势
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import {
  Group as FeatureGroup,
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
  /** advantage 分别是 4 组、6组 */
  items: Item[]
}

export default function SolutionAdvantage({ items }: Props) {
  if (!items.length) {
    return null
  }

  let itemsRow1: Item[] = items
  let itemsRow2: Item[] = []

  // advantage 是 4 组时，一行展示；6 组时，两行展示
  if (items.length === 6) {
    itemsRow1 = items.slice(0, 3)
    itemsRow2 = items.slice(3, 6)
  }

  return (
    <FeatureRaw>
      <FeatureGroup>
        {itemsRow1.map(({ title, desc, iconUrl }) => (
          <FeatureItem
            key={title}
            icon={<LibIcon alt="方案优势" src={iconUrl} />}
            title={title}
            desc={<Description>{desc}</Description>}
            pos="top-down"
          />
        ))}
      </FeatureGroup>

      {!!itemsRow2.length && (
        <FeatureGroup>
          {itemsRow2.map(({ title, desc, iconUrl }) => (
            <FeatureItem
              key={title}
              icon={<LibIcon alt="方案优势" src={iconUrl} />}
              title={title}
              desc={<Description>{desc}</Description>}
              pos="top-down"
            />
          ))}
        </FeatureGroup>
      )}
    </FeatureRaw>
  )
}
