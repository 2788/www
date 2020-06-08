/**
 * @file 云主机产品规格
 */

import React, { useState } from 'react'
import { MetaInfo, SpecEnterpriseConfigGroup, SpecStarterConfigItem } from 'apis/qvm'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Row } from 'components/UI/Card'
import ButtonTabs, { ButtonTab } from 'components/UI/ButtonTabs'
import PrimaryCard from './PrimaryCard'
import EnterpriseCard from './EnterpriseCard'

enum Type {
  Primary = 'primary', // 入门版
  Enterprise = 'enterprise' // 企业版
}

type Props = {
  starterConfig: SpecStarterConfigItem[]
  enterpriseConfig: SpecEnterpriseConfigGroup[]
  metaInfo: MetaInfo
}

export default function QvmSpecs({ starterConfig, enterpriseConfig, metaInfo }: Props) {
  const promaryCardsview = (starterConfig || []).map(
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
        <EnterpriseCards enterpriseConfig={enterpriseConfig} metaInfo={metaInfo} />
      </TabPane>
    </Tabs>
  )
}

type EnterpriseCardsProps = {
  enterpriseConfig: SpecEnterpriseConfigGroup[]
  metaInfo: MetaInfo
}

function EnterpriseCards({ enterpriseConfig, metaInfo }: EnterpriseCardsProps) {
  const [activeGroupKey, setActiveGroupKey] = useState('0')

  const tabsView = (enterpriseConfig || []).map(
    ({ title }, i) => <ButtonTab key={i} value={i + ''}>{title}</ButtonTab>
  )

  const tabPanesView = (enterpriseConfig || []).map(
    ({ items }, i) => {
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
          metaInfo={metaInfo}
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
