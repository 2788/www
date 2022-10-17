import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'

export default function RiskControlAdvantages() {
  return (
    <Feature name="advantages" title="产品优势">
      <FeatureGroup>
        <FeatureItem
          icon={<FeatureIcon src={icon1} alt="精准防护" />}
          title="精准防护"
          align="left"
        >
          <FeatureDesc>丰富专家策略结合智能模型调优，多维度技术分析精准防护。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={icon2} alt="灵活部署" />}
          title="灵活部署"
          align="left"
        >
          <FeatureDesc>灵活适应企业要求，为企业同时提供 API 调用和 SaaS 部署方式。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={icon3} alt="多维度风险识别" />}
          title="多维度风险识别"
          align="left"
        >
          <FeatureDesc>支持多种业务场景下的全流程智能分析，多维度的行为分析构建动态业务模型。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
