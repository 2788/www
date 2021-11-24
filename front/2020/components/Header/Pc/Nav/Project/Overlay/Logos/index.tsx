/**
 * @file 行业解决方案对应的客户 logo 列表
 */

import React from 'react'

import { Solution } from 'constants/solutions'

import bilibili from './bilibili.png'
import blued from './blued.png'
import cmb from './cmb.png'
import dianxin from './dianxin.png'
import hujiang from './hujiang.png'
import ddpai from './ddpai.png'
import jili from './jili.png'
import liantong from './liantong.png'
import liulishuo from './liulishuo.png'
import mogujie from './mogujie.png'
import oppo from './oppo.png'
import secoo from './secoo.png'
import shanghaidianqi from './shanghaidianqi.png'
import shangqi from './shangqi.png'
import taiping from './taiping.png'
import vipkid from './vipkid.png'
import vivo from './vivo.png'
import xiaohongshu from './xiaohongshu.png'
import yidong from './yidong.png'
import zhongxin from './zhongxin.png'
import iqiyi from './iqiyi.png'
import dongqiu from './dongqiu.png'
import style from './style.less'

const solutionLogosMap: { [s in Solution]?: string[] } = {
  [Solution.Fin]: [taiping, cmb, zhongxin],
  [Solution.Edu]: [liulishuo, hujiang, vipkid],
  [Solution.Automobile]: [ddpai, jili, shangqi],
  [Solution.ECommerce]: [secoo, xiaohongshu, mogujie],
  [Solution.IntelligentManufacturing]: [oppo, vivo, shanghaidianqi],
  [Solution.Social]: [bilibili, blued],
  [Solution.Isp]: [yidong, dianxin, liantong],
  [Solution.Entertainment]: [iqiyi, dongqiu]
}

export type Props = {
  solution: Solution
}

export default function Logos({ solution }: Props) {
  const logos = solutionLogosMap[solution]
  if (logos == null) return null

  const logosView = logos.map((logo, i) => (
    <li key={i} className={style.logoItem}>
      <img className={style.logoImg} src={logo} alt={solution} />
    </li>
  ))

  // 凑满三个 item 占满一行
  const placeholdersView = Array.from({ length: 3 - logos.length }).map((_, i) => (
    <li key={'placeholder-' + i} className={style.placeholderItem}></li>
  ))

  return (
    <ul className={style.logoList}>
      {logosView}
      {placeholdersView}
    </ul>
  )
}
