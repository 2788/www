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
      {/* 数据处理平台到异构数据湖 */}
      <Positioned left={387} top={223}>
        <svg width="47px" height="224px" viewBox="0 0 47 224">
          <g id="首页" stroke="none" strokeWidth="1" fill="none">
            <g id="首页-云产品" transform="translate(-786.000000, -444.000000)" fill="#AEE1F3">
              <g id="云产品">
                <g id="编组-75" transform="translate(395.000000, 248.000000)">
                  <path id="路径-17" d="M398,196.191347 L405,210.191347 L399,210.191 L399,412.05 L423.991,412.05 L423.991842,406.05097 L437.991842,413.05097 L423.991842,420.05097 L423.991,414.05 L397,414.05097 L397,210.191 L391,210.191347 L398,196.191347 Z"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Positioned>
      {/* 数据分析平台到异构数据湖 */}
      <Positioned left={688} top={223}>
        <svg width="47" height="224" viewBox="0 0 47 224">
          <path fill="#B2E5F7" d="M726.056439,199.667038 L733.056439,213.667038 L727.056,213.667 L727.056439,416.667038 L700.056,416.667 L700.056439,422.667038 L686.056439,415.667038 L700.056439,408.667038 L700.056,414.667 L725.056,414.667 L725.056,213.667 L719.056439,213.667038 L726.056439,199.667038 Z" transform="translate(-686 -199)" />
        </svg>
      </Positioned>
    </>
  )
}
