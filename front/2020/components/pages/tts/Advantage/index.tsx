import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon01 from './images/icon01.png'
import icon02 from './images/icon02.png'
import icon03 from './images/icon03.png'

export default function Anvantage() {
  return (
    <Feature title="核心优势" name="advantage">
      <FeatureGroup>
        <FeatureItem icon={<FeatureIcon src={icon01} />} title="高拟真度" align="left">
          <FeatureDesc>使用海量的音频数据训练发音模型，合成音自然流畅，真实饱满、抑扬顿挫、富有表现力</FeatureDesc>
        </FeatureItem>
        <FeatureItem icon={<FeatureIcon src={icon02} />} title="灵活配置" align="left">
          <FeatureDesc>支持多语种、多音色，支持配置语速、音量等</FeatureDesc>
        </FeatureItem>
        <FeatureItem icon={<FeatureIcon src={icon03} />} title="接入方便" align="left">
          <FeatureDesc>服务使用简单快捷，兼容性强，并提供全流程技术支持</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
