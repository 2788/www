import React from 'react'

import CommonOverlay from '../Overlay'
import Content from '../Overlay/Content'
import ContentSection, { ContentSectionItem } from '../Overlay/Content/Section'

export default function Overlay() {
  return (
    <CommonOverlay>
      <Content size={3}>
        <ContentSection title="文档与工具">
          <ContentSectionItem href="https://developer.qiniu.com/" target="_self">
            文档中心
          </ContentSectionItem>
          <ContentSectionItem href="https://developer.qiniu.com/sdk#official-sdk" target="_self">
            SDK &amp; 工具
          </ContentSectionItem>
        </ContentSection>
        <ContentSection title="服务支持">
          <ContentSectionItem href="https://support.qiniu.com" target="_self">
            技术支持
          </ContentSectionItem>
          <ContentSectionItem href="https://support.qiniu.com/tickets" target="_self">
            工单系统
          </ContentSectionItem>
          <ContentSectionItem href="https://segmentfault.com/qiniu?ref=portal.qiniu.com" target="_self">
            问答社区
          </ContentSectionItem>
          <ContentSectionItem href="/product-news">
            产品动态
          </ContentSectionItem>
          <ContentSectionItem href="https://status.qiniu.com" target="_self">
            服务健康状态
          </ContentSectionItem>
        </ContentSection>
        <ContentSection title="政策与协议">
          <ContentSectionItem href="/user-agreement">
            用户协议
          </ContentSectionItem>
          <ContentSectionItem href="/agreements/privacy-right">
            隐私权政策
          </ContentSectionItem>
          <ContentSectionItem href="/sla-kodo">
            产品 SLA
          </ContentSectionItem>
        </ContentSection>
      </Content>
    </CommonOverlay>
  )
}
