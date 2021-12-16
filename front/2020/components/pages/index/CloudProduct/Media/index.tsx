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
import Qvs from './Qvs'
import Pili from './Pili'
import DataLake from './DataLake'
import Cdn from './Cdn'
import Positioned from '../share/Positioned'

import MultiMediaDataIcon from '../icons/media/MultiMediaData'
import TerminalUserIcon from '../icons/media/TerminalUser'
import { Node } from '..'
import Line from '../share/Line'

export default function Media() {
  return (
    <>
      <MultipleMediaProcessPlat />
      <Positioned identity={Node.MultiMediaData} top={404} left={0}><MultiMediaDataIcon /></Positioned>
      <Positioned identity={Node.Sdk} top={397} left={89 + 64}><Qvs /></Positioned>
      <Positioned identity={Node.Sdk} top={397} left={271 + 64} zIndex={1}><Pili /></Positioned>
      <Positioned identity={Node.Kodo} top={366} left={497 + 64}><DataLake /></Positioned>
      <Positioned identity={Node.Cdn} top={397} left={723 + 64}><Cdn /></Positioned>
      <Positioned identity={Node.TerminalUser} top={404} left={920 + 64}><TerminalUserIcon /></Positioned>
      {/* 多媒体数据 -> qvs */}
      <Positioned left={16 + 64} top={424}><Line width={80} /></Positioned>
      {/* pili -> 异构数据湖 */}
      <Positioned left={405 + 64} top={424}><Line width={80} /></Positioned>
      {/* 异构数据湖 -> cdn */}
      <Positioned left={618 + 64} top={424}><Line width={80} /></Positioned>
      {/* cdn -> 终端用户 */}
      <Positioned left={811 + 64} top={424}><Line width={80} /></Positioned>
      {/* 多媒体数据 -> pili */}
      <Positioned left={32} top={354}>
        <svg width="353" height="41" viewBox="0 0 353 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#232;&#183;&#175;&#229;&#190;&#132; 23" d="M353 3L348 0.113249V5.88675L353 3ZM1.5 41V11H0.5V41H1.5ZM9 3.5H348.5V2.5H9V3.5ZM1.5 11C1.5 6.85786 4.85786 3.5 9 3.5V2.5C4.30558 2.5 0.5 6.30558 0.5 11H1.5Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
      {/* 视频监控 QVS -> 异构数据湖 */}
      <Positioned left={149 + 64} top={522}>
        <svg width="405" height="83" viewBox="0 0 405 83" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#232;&#183;&#175;&#229;&#190;&#132; 25" d="M402 0.737143L399.113 5.73714H404.887L402 0.737143ZM0.5 0V74H1.5V0H0.5ZM9 82.5H394V81.5H9V82.5ZM402.5 74V5.23714H401.5V74H402.5ZM394 82.5C398.694 82.5 402.5 78.6944 402.5 74H401.5C401.5 78.1421 398.142 81.5 394 81.5V82.5ZM0.5 74C0.5 78.6944 4.30558 82.5 9 82.5V81.5C4.85786 81.5 1.5 78.1421 1.5 74H0.5Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
      {/* 多媒体数据处理平台 -> pili */}
      <Positioned left={343 + 64} top={320}>
        <svg width="7" height="68" viewBox="0 0 7 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="&#232;&#183;&#175;&#229;&#190;&#132; 3" d="M3.5 0L0.613249 5H6.38675L3.5 0ZM3.5 68L6.38675 63H0.613249L3.5 68ZM3 4.5V63.5H4V4.5H3Z" fill="#A7E8FF" />
        </svg>
      </Positioned>
      {/* 多媒体数据处理平台 -> 异构数据湖 */}
      <Positioned left={549 + 64} top={320}>
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="40" fill="none" viewBox="0 0 7 40">
          <path fill="#A7E8FF" d="M3.5 0L.613 5h5.774L3.5 0zm0 40l2.887-5H.613L3.5 40zM3 4.5v31h1v-31H3z" />
        </svg>
      </Positioned>
    </>
  )
}
