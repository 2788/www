import React from 'react'
import PricePane, { PricePaneSection, PricePaneSubSection } from 'components/Price/Banner/PricePane'

import Audio from './Audio'

import Picture from './Picture'
import Text from './Text'
import PictureProcess from './PictureProcess'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情">
        <PricePaneSubSection title="音视频审核">
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
      </PricePaneSection>
    </PricePane>
  )
}
