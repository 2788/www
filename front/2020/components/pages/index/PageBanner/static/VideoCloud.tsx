import React from 'react'
import { useMobile } from 'hooks/ua'

import { Wrapper } from '..'

import bg from './images/bg.jpg'
import bgMobile from './images/bg-mobile.jpg'
import CheckIcon from './images/icon.svg'

import style from './style.less'

export default function VideoCloud() {
  const isMobile = useMobile()
  const descView = isMobile ? <>A ONE-STOP SCENARIO—BASED<br />INTELLIGENT CLOUD VIDEO PLATFORM</> : ' A ONE-STOP SCENARIO—BASED INTELLIGENT CLOUD VIDEO PLATFORM'
  return (
    <Wrapper bgImg={isMobile ? bgMobile : bg}>
      <h1 className={style.title}>一站式场景化智能视频云</h1>
      <p className={style.desc}>{descView}</p>
      {
        !isMobile && (
          <div className={style.features}>
            <div className={style.item}><CheckIcon className={style.icon} />一站式音视频</div>
            <div className={style.item}><CheckIcon className={style.icon} />低代码</div>
            <div className={style.item}><CheckIcon className={style.icon} />AI 能力</div>
            <div className={style.item}><CheckIcon className={style.icon} />云边一体化</div>
          </div>
        )
      }
    </Wrapper>
  )
}
