import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'

import Audio from './Audio'

import style from './index.less'
import Picture from './Picture'
import Text from './Text'
import PictureProcess from './PictureProcess'
import App from './App'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情" className={style.section}>
        <div className={style.title}>音视频审核</div>
        <div className={style.content} style={{ padding: '24px' }}>
          <Audio />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>图片审核</div>
        <div className={style.content}>
          <Picture />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>文本审核</div>
        <div className={style.content}>
          <Text />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>图片处理</div>
        <div className={style.content}>
          <PictureProcess />
        </div>
        <div className={style.title} style={{ marginTop: '48px' }}>APP 安装包分析</div>
        <div className={style.content} style={{ padding: '24px' }}>
          <App />
        </div>
      </PricePaneSection>
    </PricePane>
  )
}
