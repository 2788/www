/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Jul 06 2020
 * @file: 所有产品
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import MachineData from './MachineData'
import MultipleMediaProcessPlat from './MultipleMediaProcessPlat'
import MachineDataAnalysisPlat from './MachineDataAnalysisPlat'
import DataAnalyser from './DataAnalyser'
import MultiMediaData from './MultiMediaData'
import Pili from './Pili'
import DataLake from './DataLake'
import Cdn from './Cdn'
import Qvm from './Qvm'
import CloudNative from './CloudNative.svg'
import TerminalUser from './TernimalUser'
import Positioned from '../Positioned'

export default function All() {
  return (
    <>
      <MachineData />
      <MultipleMediaProcessPlat />
      <MachineDataAnalysisPlat />
      <DataAnalyser />
      <MultiMediaData />
      <Pili />
      <DataLake />
      <Cdn />
      <TerminalUser />
      <Positioned left={0} top={548}><CloudNative /></Positioned>
      <Positioned left={0} top={592}><Qvm /></Positioned>
      {/* 数据处理平台到异构数据湖 */}
      <Positioned left={387} top={223}>
        <svg width="47" height="144" viewBox="0 0 47 144">
          <path fill="#AEE1F3" d="M398,196 L405,210 L399,210 L399,331.86 L423.991,331.86 L423.991842,325.86 L437.991842,332.86 L423.991842,339.86 L423.991,333.86 L397,333.86 L397,210 L391,210 L398,196 Z" transform="translate(-391 -196)" />
        </svg>
      </Positioned>
      {/* 数据分析平台到异构数据湖 */}
      <Positioned left={688} top={223}>
        <svg width="47" height="143" viewBox="0 0 47 143">
          <path fill="#B2E5F7" d="M726,196 L733,210 L727,210 L727,333 L700,333 L700,339 L686,332 L700,325 L700,331 L725,331 L725,210 L719,210 L726,196 Z" transform="translate(-686 -196)" />
        </svg>
      </Positioned>
    </>
  )
}
