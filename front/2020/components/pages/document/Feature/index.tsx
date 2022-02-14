import React from 'react'
import CommonFeature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'

const features = [
  {
    icon: <Icon1 />,
    title: '文档转换',
    desc: '文档转换用于实时将存储在七牛的 word(docx, doc)、excel(xlsx, xls)、ppt(pptx) 格式的文档转成 pdf，支持在浏览器预览，或者存储在七牛云的云存储中。',
    href: 'https://developer.qiniu.com/dora/10173/the-document-preview'
  },
  {
    icon: <Icon2 />,
    title: '文档翻译',
    desc: '文档翻译接口提供多格式、多语种、高质量的文档翻译服务，支持源语言自动检测，只需指定文档链接并指定目标语言、文档格式、七牛云 bucket 等参数，即可在七牛云存储 kodo 中获取翻译后的文档。',
    href: 'https://developer.qiniu.com/dora/10175/dog-document-translation'
  }
]

export default function Feature() {
  return (
    <CommonFeature title="产品功能" name="features">
      <FeatureGroup>
        {
          features.map((feature, index) => (
            <FeatureItem pos="left-right" align="left" icon={feature.icon} title={feature.title} key={index}>
              <FeatureLink href={feature.href} top>接口文档 &gt;&gt;</FeatureLink>
              <FeatureDesc>{feature.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </CommonFeature>
  )
}
