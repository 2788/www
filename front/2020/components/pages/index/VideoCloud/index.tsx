/**
 * @file 一站式视频智能云动画大图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import layoutUrl from './images/layout.png'
import step1Url from './images/step1.png'
import step2Url from './images/step2.png'
import step3Url from './images/step3.png'
import step4Url from './images/step4.png'
import step5Url from './images/step5.png'

import style from './style.less'

export default function VideoCloud() {
  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <div className={style.main}>
          <h3 className={style.title}>一站式场景化智能视频云</h3>
          <div className={style.layout} style={{ backgroundImage: `url("${layoutUrl}")` }} />
          <div className={style.step5} style={{ backgroundImage: `url("${step5Url}")` }} />
          <div className={style.step4} style={{ backgroundImage: `url("${step4Url}")` }} />
          <div className={style.step3} style={{ backgroundImage: `url("${step3Url}")` }} />
          <div className={style.step2} style={{ backgroundImage: `url("${step2Url}")` }} />
          <div className={style.step1} style={{ backgroundImage: `url("${step1Url}")` }} />
        </div>
      </div>
    </div>
  )
}
