/**
 * @file 行业解决方案对应的客户 logo 列表
 */

import React from 'react'
import cls from 'classnames'

import { Solution } from 'constants/solutions'

import bilibili from './images/bilibili.png'
import blued from './images/blued.png'
import cmb from './images/cmb.png'
import dianxin from './images/dianxin.png'
import ddpai from './images/ddpai.png'
import jili from './images/jili.png'
import liulishuo from './images/liulishuo.png'
import chuangke from './images/chuangke.png'
import mogujie from './images/mogujie.png'
import oppo from './images/oppo.png'
import taiping from './images/taiping.png'
import vivo from './images/vivo.png'
import xiaohongshu from './images/xiaohongshu.png'
import yidong from './images/yidong.png'
import iqiyi from './images/iqiyi.png'
import dongqiu from './images/dongqiu.png'
import style from './style.less'

const solutionLogosMap: { [s in Solution]?: string[] } = {
  [Solution.Fin]: [taiping, cmb],
  [Solution.Edu]: [liulishuo, chuangke],
  [Solution.Automobile]: [ddpai, jili],
  [Solution.ECommerce]: [xiaohongshu, mogujie],
  [Solution.IntelligentManufacturing]: [oppo, vivo],
  [Solution.Social]: [bilibili, blued],
  [Solution.Isp]: [yidong, dianxin],
  [Solution.Entertainment]: [iqiyi, dongqiu]
}

export type Props = {
  solution: Solution
}

export default function Logos({ solution }: Props) {
  const logos = solutionLogosMap[solution]
  if (logos == null) return null

  const logosView = logos.map((logo, i) => (
    <li key={i} className={cls(style.item, style.logoItem)}>
      <img className={style.logoImg} src={logo} alt={solution} />
    </li>
  ))

  // 凑满两个 item
  const placeholdersView = Array.from({ length: 2 - logos.length }).map((_, i) => (
    <li key={'placeholder-' + i} className={style.item}></li>
  ))

  return (
    <ul className={style.logoList}>
      {logosView}
      {placeholdersView}
    </ul>
  )
}
