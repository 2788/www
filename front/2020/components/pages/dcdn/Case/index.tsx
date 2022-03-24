/**
 * @file 全站加速—客户案例
 * @author zhouhang
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { bilibili, himo, zgpa } from 'constants/cases'

const picList = [bilibili.logo, himo.logo, zgpa.logo]

export default function DcdnCase() {
  return (
    <CustomerCaseGroup>
      {
        picList.map(item => <CustomerCase key={item} pic={item} />)
      }
    </CustomerCaseGroup>

  )
}
