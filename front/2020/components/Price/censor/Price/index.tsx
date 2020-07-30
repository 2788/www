import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'

import Picture from './Picture'
import Video from './Video'
import Other from './Other'

import style from './index.less'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情" className={style.section}>
        <div className={style.title}>图片</div>
        <div className={style.content}>
          <Picture />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>视频</div>
        <div className={style.content}>
          <Video />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>以图搜图</div>
        <div className={style.content} style={{ padding: '24px' }}>
          <Other />
        </div>
      </PricePaneSection>
    </PricePane>
  )
}
