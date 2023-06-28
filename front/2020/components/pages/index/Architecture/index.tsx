/**
 * @file 一站式视频智能云动画大图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { useMobile } from 'hooks/ua'

import architectureUrl from './architecture.jpg'

import style from './style.less'

export default function Architecture() {
  const isMobile = useMobile()
  const title = isMobile ? '架构图' : '一站式搭建场景应用 — 低代码音视频平台'
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.main}>
        <img className={style.img} src={architectureUrl} alt="架构图" />
      </div>
    </div>
  )
}
