/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Tue Jul 07 2020
 * @file: 智能视频服务
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import MultipleMediaProcessPlat from './MultipleMediaProcessPlat'
import MultiMediaData from './MultiMediaData'
import Sdk from './Sdk'
import Pili from './Pili'
import DataLake from './DataLake'
import CDN from './CDN'
import TerminalUser from './TernimalUser'
import Positioned from '../Positioned'
import Line from '../Line'

export default function Video() {
  return (
    <>
      <MultipleMediaProcessPlat />
      <MultiMediaData />
      <Sdk />
      <Pili />
      <DataLake />
      <CDN />
      <TerminalUser />
      {/* 数据处理平台到 pili */}
      <Positioned top={345} left={415}><Line width={40} rotateDeg={90} leftArrow /></Positioned>
      {/* 数据处理平台到异构数据湖 */}
      <Positioned top={324} left={635}><Line width={12} rotateDeg={90} leftArrow /></Positioned>
    </>
  )
}
