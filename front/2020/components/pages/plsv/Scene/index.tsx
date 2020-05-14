/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Wed May 13 2020
 * @file: 应用场景
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Section from 'components/Product/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'

export default function Scene() {
  return (
    <Section title="应用场景" name="scene">
      <Tabs defaultValue="1">
        <TabPane value="1" tab="Vlog 制作">
          TODO
        </TabPane>
        <TabPane value="2" tab="动漫配音秀">TODO</TabPane>
        <TabPane value="3" tab="互动聊天">TODO</TabPane>
        <TabPane value="4" tab="社区动态">TODO</TabPane>
        <TabPane value="5" tab="商品短视频">TODO</TabPane>
        <TabPane value="6" tab="短视频新闻">TODO</TabPane>
      </Tabs>
    </Section>
  )
}
