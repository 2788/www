import React from 'react'
import PricePane, { PricePaneSection, PricePaneSubSection } from 'components/Price/Banner/PricePane'

import Audio from './Audio'

import Picture from './Picture'
import Text from './Text'
import PictureProcess from './PictureProcess'
import App from './App'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情">
        <PricePaneSubSection title="音视频审核" padding>
          <Audio />
        </PricePaneSubSection>
        <PricePaneSubSection title="图片审核">
          <Picture />
        </PricePaneSubSection>
        <PricePaneSubSection title="文本审核">
          <Text />
        </PricePaneSubSection>
        <PricePaneSubSection title="图片处理">
          <PictureProcess />
        </PricePaneSubSection>
        <PricePaneSubSection title="APP 安装包分析" padding>
          <App />
        </PricePaneSubSection>
      </PricePaneSection>
    </PricePane>
  )
}
