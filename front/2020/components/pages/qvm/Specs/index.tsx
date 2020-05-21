/**
 * @file 云主机产品规格
 */

import React, { useState } from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Row } from 'components/UI/Card'
import ButtonTabs, { ButtonTab } from 'components/UI/ButtonTabs'
import PrimaryCard from './PrimaryCard'
import familyGroups from './enterprise-families'
import EnterpriseCard from './EnterpriseCard'

enum Type {
  Primary = 'primary', // 入门版
  Enterprise = 'enterprise' // 企业版
}

// TODO: 这些实例信息需要再跟 PM 对一遍
export default function QvmSpecs() {
  return (
    <Tabs defaultValue={Type.Primary}>
      <TabPane value={Type.Primary} tab="入门版">
        <Row>
          <PrimaryCard
            instanceType="ecs.t6-c1m1.large"
            name="突发性能实例 T6"
            features={[
              '网站应用程序 | 普通数据处理',
              '20% 基准CPU计算性能'
            ]}
            instance="2 核 2G"
            storage={40}
            bandwidth={1}
            price={65.75}
          />
          <PrimaryCard
            instanceType="t5-lc1m2.small"
            name="突发性能实例 T5"
            features={[
              '低负载应用 | 微服务',
              '20% 基准CPU计算性能'
            ]}
            instance="1 核 1G"
            storage={40}
            bandwidth={1}
            price={54.57}
          />
          <PrimaryCard
            instanceType="ecs.xn4.small"
            name="共享基本型 XN4"
            features={[
              'Web 应用前端机 | 轻负载应用、微服务',
              '开发测试压测服务应用'
            ]}
            instance="1 核 1G"
            storage={40}
            bandwidth={1}
            price={73.47}
          />
          <PrimaryCard
            instanceType="ecs.mn4.small"
            name="共享通用型 MN4"
            features={[
              '网站和 Web 应用程序 | 轻量级数据库、缓存',
              '综合应用及轻量级企业服务'
            ]}
            instance="1 核 4G"
            storage={40}
            bandwidth={1}
            price={172.47}
          />
        </Row>
      </TabPane>
      <TabPane value={Type.Enterprise} tab="企业版">
        <EnterpriseCards />
      </TabPane>
    </Tabs>
  )
}

function EnterpriseCards() {
  const [activeGroupKey, setActiveGroupKey] = useState(familyGroups[0].key)

  const tabsView = familyGroups.map(
    ({ key, name }) => <ButtonTab key={key} value={key}>{name}</ButtonTab>
  )

  const tabPanesView = familyGroups.map(
    ({ key, data }) => {
      // TODO: 优化下，第一次不渲染，一旦渲染过之后，再切换走就是隐藏
      const active = activeGroupKey === key
      if (!active) return null
      const cardsView = data.map(
        familyInfo => <EnterpriseCard key={familyInfo.family} {...familyInfo} />
      )
      return <div key={key}>{cardsView}</div>
    }
  )

  return (
    <>
      <ButtonTabs value={activeGroupKey} onChange={setActiveGroupKey}>
        {tabsView}
      </ButtonTabs>
      {tabPanesView}
    </>
  )
}
