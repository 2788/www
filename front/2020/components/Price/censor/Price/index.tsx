import React from 'react'
import PricePane, { PricePaneSection, PricePaneSubSection } from 'components/Price/Banner/PricePane'

import Picture from './Picture'
import Video from './Video'
import Other from './Other'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情">
        <PricePaneSubSection title="图片">
          <Picture />
        </PricePaneSubSection>
        <PricePaneSubSection title="视频">
          <Video />
        </PricePaneSubSection>
        <PricePaneSubSection title="以图搜图" padding>
          <Other />
        </PricePaneSubSection>
      </PricePaneSection>
    </PricePane>
  )
}
