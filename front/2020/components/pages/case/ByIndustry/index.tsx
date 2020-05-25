/**
 * @file 行业案例模块
 */

import React, { useState } from 'react'
import { industries } from 'constants/cases'
import { useMobile } from 'hooks/ua'
import Tabs, { Tab } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'

import CasesWithPagination from '../CasesWithPagination'
import style from './style.less'

export default function ByIndustry() {
  const isMobile = useMobile()
  const [industryType, setIndustryType] = useState('0')

  if (isMobile) {
    return <ByIndustryMobile industryType={industryType} setIndustryType={setIndustryType} />
  }

  const tabsView = industries.map(
    (type, index) => (
      <Tab key={type.name} value={index + ''}>{type.name}</Tab>
    )
  )
  const visibleCases = industries[parseInt(industryType, 10)].cases
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
  const subMenusView = industries.map(
    (type, index) => (
      <SubMenu
        key={index + ''}
        title={type.name}
        mode="inline"
        onTitleClick={({ key }: any) => {
          setIndustryType(key)
        }}
      >
        <CasesWithPagination className={style.casesInMenu} cases={industries[index].cases} />
      </SubMenu>
    )
  )

  return (
    <Menu className={style.menu} openKeys={[industryType]}>
      {subMenusView}
    </Menu>
  )
}
