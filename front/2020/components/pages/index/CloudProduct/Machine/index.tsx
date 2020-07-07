/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Jul 06 2020
 * @file: 机器数据智能
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import MachineData from './MachineData'
import DataCollect from './DataCollect'
import MachineDataAnalysisPlat from './MachineDataAnalysisPlat'
import DataAnalyser from './DataAnalyser'
import DataLake from './DataLake'
import Positioned from '../Positioned'
import Line from '../Line'

export default function Machine() {
  return (
    <>
      <MachineData />
      <DataCollect />
      <MachineDataAnalysisPlat />
      <DataAnalyser />
      <DataLake />
      {/* 数据分析平台到异构数据湖 */}
      <Positioned top={479} left={530}><Line width={12} rotateDeg={90} leftArrow /></Positioned>
    </>
  )
}
