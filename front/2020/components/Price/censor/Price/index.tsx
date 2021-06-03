import React from 'react'
import PricePane, { PricePaneSection, PricePaneSubSection } from 'components/Price/Banner/PricePane'

import Picture from './Picture'
import Live from './Live'
import Video from './Video'
import Audio from './Audio'
import Text from './Text'
import Other from './Other'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情">
        <PricePaneSubSection title="图片">
          <Picture />
        </PricePaneSubSection>
        <PricePaneSubSection title="直播">
          <Live />
        </PricePaneSubSection>
        <PricePaneSubSection title="视频">
          <Video />
        </PricePaneSubSection>
        <PricePaneSubSection title="音频">
          <Audio />
        </PricePaneSubSection>
        <PricePaneSubSection title="文本">
          <Text />
        </PricePaneSubSection>
        <PricePaneSubSection title="以图搜图">
          <Other />
        </PricePaneSubSection>
      </PricePaneSection>
    </PricePane>
  )
}
