/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Jul 06 2020
 * @file: 机器数据智能
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import DataCollect from './DataCollect'
import MachineDataProcessPlat from './MachineDataProcessPlat'
import DataLake from './DataLake'
import Positioned from '../share/Positioned'
import { Node } from '..'

import MachineDataIcon from '../icons/machine/MachineData'
import BuninessDataIcon from '../icons/machine/BuninessData'
import IOTDataIcon from '../icons/machine/IOTData'
import SecurityDataIcon from '../icons/machine/SecurityData'
import DataAnalyserIcon from '../icons/machine/DataAnalyser'
import Line from '../share/Line'

export default function Machine() {
  return (
    <>
      <Positioned identity={Node.MachineData} top={0} left={0}><MachineDataIcon /></Positioned>
      <Positioned top={(12 + 64) * 1} left={0}><BuninessDataIcon /></Positioned>
      <Positioned top={(12 + 64) * 2} left={0}><IOTDataIcon /></Positioned>
      <Positioned top={(12 + 64) * 3} left={0}><SecurityDataIcon /></Positioned>
      <Positioned top={123} left={115 + 64}><DataCollect /></Positioned>
      <Positioned identity={Node.DataAnalyser} top={123} left={920 + 64}><DataAnalyserIcon /></Positioned>
      <MachineDataProcessPlat />
      <DataLake />
      {/* IoT 数据 -> 数据采集 */}
      <Positioned top={147} left={18 + 64}><Line width={72} /></Positioned>
      {/* 数据采集 -> 机器数据处理平台 */}
      <Positioned top={147} left={196 + 64}><Line width={72} /></Positioned>
      {/* 数据采集 -> 机器数据处理平台 */}
      <Positioned top={147} left={821 + 64}><Line width={80} /></Positioned>
      {/* 机器数据处理平台 <-> 异构数据湖 */}
      <Positioned top={410} left={462 + 64}>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="40" fill="none" viewBox="0 0 6 40">
          <path fill="#A7E8FF" d="M3 0L.113 5h5.774L3 0zm0 40l2.887-5H.113L3 40zM2.5 4.5v31h1v-31h-1z" />
        </svg>
      </Positioned>
    </>
  )
}
