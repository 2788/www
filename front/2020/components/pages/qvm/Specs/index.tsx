/**
 * @file 云主机产品规格
 */

import React, { useState } from 'react'
import { getStarterSpecs, getEnterpriseSpecs } from 'apis/qvm'
import { useApiWithParams } from 'hooks/api'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Row } from 'components/UI/Card'
import ButtonTabs, { ButtonTab } from 'components/UI/ButtonTabs'
import PrimaryCard from './PrimaryCard'
import EnterpriseCard from './EnterpriseCard'

enum Type {
  Primary = 'primary', // 入门版
  Enterprise = 'enterprise' // 企业版
}

// TODO: 这些实例信息需要再跟 PM 对一遍
export default function QvmSpecs() {
  const { $: startSpecs } = useApiWithParams(getStarterSpecs, { params: [] })

  const promaryCardsview = (startSpecs || []).map(
    (family, i) => (
      <PrimaryCard
        key={i}
        name={family.family_name}
        desc={family.family_desc}
        instance={family.ecs_spec}
        storage={family.disk_spec}
        bandwidth={family.ip_spec}
        price={family.price}
        buyUrl={family.buy_link}
      />
    )
  )

  return (
    <Tabs defaultValue={Type.Primary}>
      <TabPane value={Type.Primary} tab="入门版">
        <Row>
          {promaryCardsview}
        </Row>
      </TabPane>
      <TabPane value={Type.Enterprise} tab="企业版">
        <EnterpriseCards />
      </TabPane>
    </Tabs>
  )
}

function EnterpriseCards() {
  const { $: familyGroups } = useApiWithParams(getEnterpriseSpecs, { params: [] })
  const [activeGroupKey, setActiveGroupKey] = useState('0')

  const tabsView = (familyGroups || []).map(
    ({ title }, i) => <ButtonTab key={i} value={i + ''}>{title}</ButtonTab>
  )

  const tabPanesView = (familyGroups || []).map(
    ({ items }, i) => {
      // TODO: 优化下，第一次不渲染，一旦渲染过之后，再切换走就是隐藏
      const active = activeGroupKey === (i + '')
      if (!active) return null
      const cardsView = items.map((familyInfo, j) => (
        <EnterpriseCard
          key={j}
          name={familyInfo.family_name}
          desc={familyInfo.family_desc}
          scenes={familyInfo.scenario_desc}
          details={familyInfo.extra_infos}
          instanceTypesByRegions={familyInfo.ecs_classes}
        />
      ))
      return <div key={i}>{cardsView}</div>
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
