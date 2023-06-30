import React from 'react'
import { useMobile } from 'hooks/ua'

import { Wrapper } from '..'

import bg from './images/bg.jpg'
import bgMobile from './images/bg-mobile.jpg'
import CheckIcon from './images/icon.svg'

import style from './style.less'

export default function VideoCloud() {
  const isMobile = useMobile()
  // eslint-disable-next-line max-len
  // const descView = isMobile ? <>A ONE-STOP SCENARIO—BASED<br />INTELLIGENT CLOUD VIDEO PLATFORM</> : ' A ONE-STOP SCENARIO—BASED INTELLIGENT CLOUD VIDEO PLATFORM'
  const descView = '面向视频点播、互动直播、实时音视频、视联网等领域，提供场景化智能音视频服务能力'
  return (
    <Wrapper bgImg={isMobile ? bgMobile : bg}>
      <h1 className={style.title}>一站式场景化智能音视频 APaaS</h1>
      <p className={style.desc}>{descView}</p>
      {
        !isMobile && (
          <div className={style.features}>
            <div className={style.item}>
              <CheckIcon className={style.icon} />
              <div className={style.itemDesc}>
                <div className={style.itemDescTitle}>百万级</div>
                <div className={style.itemDescSubTitle}>企业客户&开发者</div>
              </div>
            </div>
            <div className={style.item}>
              <CheckIcon className={style.icon} />
              <div className={style.itemDesc}>
                <div className={style.itemDescTitle}>EB 级</div>
                <div className={style.itemDescSubTitle}>音视频数据存储规模</div>
              </div>
            </div>
            <div className={style.item}>
              <CheckIcon className={style.icon} />
              <div className={style.itemDesc}>
                <div className={style.itemDescTitle}>数亿分钟</div>
                <div className={style.itemDescSubTitle}>每日直播&实时互动</div>
              </div>
            </div>
            <div className={style.item}>
              <CheckIcon className={style.icon} />
              <div className={style.itemDesc}>
                <div className={style.itemDescTitle}>超万亿</div>
                <div className={style.itemDescSubTitle}>公有云管理的文件数</div>
              </div>
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}
