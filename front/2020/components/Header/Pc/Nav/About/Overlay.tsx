import React from 'react'
import { Activity, urlMap, nameMap } from 'constants/activity'

import CommonOverlay from '../Overlay'
import Content from '../Overlay/Content'
import ContentSection, { ContentSectionItem } from '../Overlay/Content/Section'

export default function Overlay() {
  return (
    <CommonOverlay>
      <Content size={3}>
        <ContentSection title="关于我们">
          <ContentSectionItem href="/company">
            公司介绍
          </ContentSectionItem>
          <ContentSectionItem href="/contact">
            联系我们
          </ContentSectionItem>
        </ContentSection>
        <ContentSection title="活动与资讯">
          <ContentSectionItem href="https://blog.qiniu.com/" target="_self">
            七牛资讯
          </ContentSectionItem>
          <ContentSectionItem href={urlMap[Activity.Main]} hot>
            {nameMap[Activity.Main]}
          </ContentSectionItem>
          <ContentSectionItem href="https://blog.qiniu.com/archives/category/5" target="_self">
            技术博客
          </ContentSectionItem>
        </ContentSection>
        <ContentSection title="加入我们">
          <ContentSectionItem href="https://campus.qiniu.com" target="_self">
            校园招聘
          </ContentSectionItem>
          <ContentSectionItem href="https://career.qiniu.com/social" target="_self">
            社会招聘
          </ContentSectionItem>
        </ContentSection>
      </Content>
    </CommonOverlay>
  )
}
