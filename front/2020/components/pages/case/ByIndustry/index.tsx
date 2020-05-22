/**
 * @file 行业案例模块
 */

import React, { useState } from 'react'
import { useMobile } from 'hooks/ua'
import Tabs, { Tab } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'

import casesByIndustryType from './cases'
import CasesWithPagination from '../CasesWithPagination'
import style from './style.less'

export default function ByIndustry() {
  const isMobile = useMobile()
  const [industryType, setIndustryType] = useState('0')

  if (isMobile) {
    return <ByIndustryMobile industryType={industryType} setIndustryType={setIndustryType} />
  }

  const tabsView = casesByIndustryType.map(
    (type, index) => (
      <Tab key={type.name} value={index + ''}>{type.name}</Tab>
    )
  )
  const visibleCases = casesByIndustryType[parseInt(industryType, 10)].cases
  return (
    <>
      <Tabs className={style.tabs} value={industryType} onChange={setIndustryType}>
        {tabsView}
      </Tabs>
      <CasesWithPagination cases={visibleCases} />
    </>
  )
}

function ByIndustryMobile({ industryType, setIndustryType }: {
  industryType: string
  setIndustryType(type: string): void
}) {
  const subMenusView = casesByIndustryType.map(
    (type, index) => (
      <SubMenu
        key={index + ''}
        title={type.name}
        mode="inline"
        onTitleClick={({ key }: any) => {
          setIndustryType(key)
        }}
      >
        <CasesWithPagination className={style.casesInMenu} cases={casesByIndustryType[index].cases} />
      </SubMenu>
    )
  )

  return (
    <Menu className={style.menu} openKeys={[industryType]}>
      {subMenusView}
    </Menu>
  )
}
