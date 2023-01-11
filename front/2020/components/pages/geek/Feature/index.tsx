/**
 * @file: 低延时直播 Geek 特性
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Feature, { Desc, Group, Item, Icon } from 'components/Product/Feature'
import featureIcon1 from 'components/pages/geek/Feature/feature1.png'
import featureIcon2 from 'components/pages/geek/Feature/feature2.png'
import featureIcon3 from 'components/pages/geek/Feature/feature3.png'

export default function FeatureList() {
  return (
    <Feature name="core" title="核心优势" header="核心优势">
      <Group>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={featureIcon1} />}
          title="更低延时"
        >
          <Desc>低延时直播模式下，保证 95% 情况下延时 0.5s-1.5s 区间，助力多元互动直播新场景</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={featureIcon2} />}
          title="更强互动"
        >
          <Desc>接近无感知的延时，满足电商/娱乐/教育等直播场景下，更为优质的互动“零距离体验”</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={featureIcon3} />}
          title="无迁移成本"
        >
          <Desc>传统直播下所有能力均可无缝衔接“低延时直播”，无需任何插件，不存在任何迁移成本</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
