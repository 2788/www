/**
 * @file: 播放器 SDK —— 产品优势
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
        <Item pos="top-down" align="left" icon={<Icon src={advantage1} />} title="首开">
          <Desc>首开 200 ms，快速开播</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Icon src={advantage2} />} title="包体">
          <Desc>小于 1 MB，节省空间</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Icon src={advantage3} />} title="双平台">
          <Desc>iOS 和 Android 双平台</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Icon src={advantage4} />} title="稳定性">
          <Desc>千万日活</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
