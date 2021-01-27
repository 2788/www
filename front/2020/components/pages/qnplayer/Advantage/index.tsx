/**
 * @file: 播放器 SDK —— 产品优势
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
        <Item pos="top-down" align="left" icon={<Advantage1 />} title="首开">
          <Desc>首开 200 ms，快速开播</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Advantage2 />} title="包体">
          <Desc>小于 1 MB，节省空间</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Advantage3 />} title="双平台">
          <Desc>iOS 和 Android 双平台</Desc>
        </Item>
        <Item pos="top-down" align="left" icon={<Advantage4 />} title="稳定性">
          <Desc>千万日活</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
