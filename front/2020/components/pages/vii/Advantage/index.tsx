/**
 * @file: 视频智能分析 产品优势
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Feature, { Desc, Group, Item, Icon } from 'components/Product/Feature'

import advantage1 from './advantage1.png'
import advantage2 from './advantage2.png'
import advantage3 from './advantage3.png'
import advantage4 from './advantage4.png'

export default function Advantage() {
  return (
    <Feature name="advantages" title="核心优势">
      <Group>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={advantage1} />}
          title="算法领先"
        >
          <Desc>拥有完善的标签体系，业内领先的大规模多标签算法。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={advantage2} />}
          title="方案优选"
        >
          <Desc>提供功能组合定制方案，契合实际业务场景。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={advantage3} />}
          title="服务稳定"
        >
          <Desc>提供弹性服务，扩展性好，算法持续迭代优化。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Icon src={advantage4} />}
          title="接入方便"
        >
          <Desc>服务使用简单快捷，兼容性强，并提供全流程技术支持。</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
