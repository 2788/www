/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Jul 06 2020
 * @file: 所有产品
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import MachineDataIcon from '../icons/machine/MachineData'
import TerminalUserIcon from '../icons/media/TerminalUser'
import MultiMediaDataIcon from '../icons/media/MultiMediaData'
import DataAnalyserIcon from '../icons/machine/DataAnalyser'
import MultipleMediaProcessPlat from './MultipleMediaProcessPlat'
import MachineDataProcessPlat from './MachineDataProcessPlat'
import Pili from './Pili'
import DataLake from './DataLake'
import Cdn from './Cdn'
import Qvm from './Qvm'
import Sdk from './Sdk'
import CloudNative from './CloudNative.svg'
import Positioned from '../share/Positioned'
import { Node } from '..'
import Line from '../share/Line'

export default function All() {
  return (
    <>
      <Positioned identity={Node.MachineData} top={62} left={0}><MachineDataIcon /></Positioned>
      <Positioned identity={Node.MultiMediaDataProcess} top={62} left={194 + 64}>
        <MultipleMediaProcessPlat />
      </Positioned>
      <Positioned identity={Node.MachineDataProcessPlat} top={62} left={542 + 64}>
        <MachineDataProcessPlat />
      </Positioned>
      <Positioned identity={Node.DataAnalyser} top={62} left={920 + 64}><DataAnalyserIcon /></Positioned>
      <Positioned identity={Node.MultiMediaData} top={258} left={0}><MultiMediaDataIcon /></Positioned>
      <Positioned identity={Node.Sdk} left={45 + 64} top={259}>
        <Pili />
      </Positioned>
      <Positioned top={274} left={47 + 64} zIndex={1}><Sdk /></Positioned>
      <Positioned identity={Node.Kodo} top={228} left={405 + 64}>
        <DataLake />
      </Positioned>
      <Positioned identity={Node.Cdn} top={259} left={660 + 64}><Cdn /></Positioned>
      <Positioned identity={Node.TerminalUser} top={258} left={920 + 64}><TerminalUserIcon /></Positioned>
      <Positioned left={0} top={431}><CloudNative /></Positioned>
      <Positioned left={0} top={475}><Qvm /></Positioned>
      {/* 多媒体 -> pili */}
      <Positioned left={20 + 64} top={279}><Line width={120} /></Positioned>
      {/* pili -> 数据湖 */}
      <Positioned left={275 + 64} top={279}><Line width={100} /></Positioned>
      {/* cdn -> 数据湖 */}
      <Positioned left={516 + 64} top={279}><Line width={100} leftArrow rightArrow={false} /></Positioned>
      {/* cdn -> 终端用户 */}
      <Positioned left={751 + 64} top={279}><Line width={100} /></Positioned>
      {/* 多媒体数据处理平台 -> 机器数据处理平台 */}
      <Positioned left={376 + 64} top={80}><Line width={140} /></Positioned>
      {/* 机器数据处理平台 -> 数据分析师 */}
      <Positioned left={671 + 64} top={80}><Line width={220} /></Positioned>
      {/* 机器数据 -> 机器数据处理平台 */}
      <Positioned left={24 + 64} top={36}>
        <svg width="598" height="60" viewBox="0 0 598 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#231;&#155;&#180;&#231;&#186;&#191; 2" d="M1 58.5H0.5V59.5H1V58.5ZM595 23.6028L597.887 18.6028H592.113L595 23.6028ZM1 59.5H74.3632V58.5H1V59.5ZM82.8632 51V9H81.8632V51H82.8632ZM90.3632 1.5H587V0.5H90.3632V1.5ZM594.5 9V19.1028H595.5V9H594.5ZM587 1.5C591.142 1.5 594.5 4.85786 594.5 9H595.5C595.5 4.30558 591.694 0.5 587 0.5V1.5ZM82.8632 9C82.8632 4.85787 86.2211 1.5 90.3632 1.5V0.5C85.6688 0.5 81.8632 4.30558 81.8632 9H82.8632ZM74.3632 59.5C79.0576 59.5 82.8632 55.6944 82.8632 51H81.8632C81.8632 55.1421 78.5054 58.5 74.3632 58.5V59.5Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
      {/* 多媒体数据处理平台 -> 异构数据湖 */}
      <Positioned left={275 + 64} top={192}>
        <svg width="103" height="93" viewBox="0 0 103 93" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#232;&#183;&#175;&#229;&#190;&#132; 17" d="M3 0L0.113249 5H5.88675L3 0ZM103 90L98 87.1133V92.8867L103 90ZM2.5 4.5V82H3.5V4.5H2.5ZM11 90.5H98.5V89.5H11V90.5ZM2.5 82C2.5 86.6944 6.30558 90.5 11 90.5V89.5C6.85786 89.5 3.5 86.1421 3.5 82H2.5Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
      {/* 机器数据处理平台 -> 异构数据湖 */}
      <Positioned left={516 + 64} top={192}>
        <svg width="103" height="93" viewBox="0 0 103 93" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#232;&#183;&#175;&#229;&#190;&#132; 4" d="M0 90L5 92.8867V87.1132L0 90ZM100 0L97.1133 5H102.887L100 0ZM4.5 90.5H92V89.5H4.5V90.5ZM100.5 82V4.5H99.5V82H100.5ZM92 90.5C96.6944 90.5 100.5 86.6944 100.5 82H99.5C99.5 86.1421 96.1421 89.5 92 89.5V90.5Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
    </>
  )
}
