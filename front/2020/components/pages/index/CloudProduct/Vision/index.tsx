/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Tue Jul 07 2020
 * @file: 视觉数据智能
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import MultipleMediaProcessPlat from './MultipleMediaProcessPlat'
import MultiMediaData from './MultiMediaData'
import Qvs from './Qvs'
import Pili from './Pili'
import DataLake from './DataLake'
import CDN from './CDN'
import TerminalUser from './TernimalUser'
import Positioned from '../Positioned'
import Line from '../Line'

export default function Vision() {
  return (
    <>
      <MultipleMediaProcessPlat />
      <MultiMediaData />
      <Qvs />
      <Pili />
      <DataLake />
      <CDN />
      <TerminalUser />
      {/* 数据处理平台到 pili */}
      <Positioned top={348} left={406}><Line width={60} rotateDeg={90} leftArrow /></Positioned>
      {/* 数据处理平台到异构数据湖 */}
      <Positioned top={324} left={635}><Line width={12} rotateDeg={90} leftArrow /></Positioned>
      <Positioned top={353} left={60}><Line1To3 /></Positioned>
      <Positioned top={575} left={255}><Line2To4 /></Positioned>
    </>
  )
}

function Line1To3() {
  return (
    <svg width="373" height="52" viewBox="0 0 373 52">
      <path fill="#B2E5F7" d="M416,356.50146 L430,363.50146 L416,370.50146 L416,364.501 L59,364.501 L59,407.50146 L57,407.50146 L57,362.50146 L416,362.501 L416,356.50146 Z" transform="translate(-57 -356)" />
    </svg>
  )
}

function Line2To4() {
  return (
    <svg width="409" height="107" viewBox="0 0 409 107">
      <path fill="#B2E5F7" d="M255,578 L255,683 L654,683 L654,592.737 L648,592.737142 L655,578.737142 L662,592.737142 L656,592.737 L656,685 L253,685 L253,578 L255,578 Z" transform="translate(-253 -578)" />
    </svg>
  )
}
