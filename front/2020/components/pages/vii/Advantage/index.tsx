/**
 * @file: 视频智能分析 产品优势
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Feature, { Desc, Group, Item } from 'components/Product/Feature'
import Advantage1 from './advantage1.svg'
import Advantage2 from './advantage2.svg'
import Advantage3 from './advantage3.svg'
import Advantage4 from './advantage4.svg'

export default function Advantage() {
  return (
    <Feature name="advantages" title="核心优势">
      <Group>
        <Item
          pos="top-down"
          align="left"
          icon={<Advantage1 />}
          title="算法领先"
        >
          <Desc>拥有完善的标签体系，业内领先的大规模多标签算法。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Advantage2 />}
          title="方案优选"
        >
          <Desc>提供功能组合定制方案，契合实际业务场景。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Advantage3 />}
          title="服务稳定"
        >
          <Desc>提供弹性服务，扩展性好，算法持续迭代优化。</Desc>
        </Item>
        <Item
          pos="top-down"
          align="left"
          icon={<Advantage4 />}
          title="接入方便"
        >
          <Desc>服务使用简单快捷，兼容性强，并提供全流程技术支持。</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
