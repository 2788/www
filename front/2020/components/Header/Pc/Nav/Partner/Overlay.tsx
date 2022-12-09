import React from 'react'

import CommonOverlay from '../Overlay'
import Content from '../Overlay/Content'
import ContentSection, { ContentSectionItem } from '../Overlay/Content/Section'

export default function Overlay() {
  return (
    <CommonOverlay>
      <Content size={3}>
        <ContentSection title="合作伙伴">
          <ContentSectionItem href="/partner">
            合作伙伴与生态
          </ContentSectionItem>
          {/* TODO: 还有移动端入口
          <ContentSectionItem href="/student">
            校园项目
          </ContentSectionItem>
          */}
        </ContentSection>
        <ContentSection title="开发合作">
          <ContentSectionItem href="/cooperations" hot>
            工具插件 SDK 合作
          </ContentSectionItem>
        </ContentSection>
        <ContentSection title="推广返现">
          <ContentSectionItem href="/cps">
            新推官 CPS 推广返现
          </ContentSectionItem>
        </ContentSection>
      </Content>
    </CommonOverlay>
  )
}
