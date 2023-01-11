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
import icon4 from './images/icon4.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'

const groups = [
  [
    { icon: <FeatureIcon src={icon1} />, title: '一站式云端解决方案', desc: '提供从内容生产到消费的一站式解决方案，包括音视频采集、上传（推流）、编辑、转码、存储、分发、播放的全生命周期服务能力。' },
    { icon: <FeatureIcon src={icon2} />, title: '快速试用和接入', desc: '提供泛娱乐场景商用级 Demo，可快速了解泛娱乐场景的开发流程和 API 调用逻辑，实现快速接入及上线。' },
    { icon: <FeatureIcon src={icon3} />, title: '丰富媒体处理功能及生态插件支持', desc: '提供美颜、滤镜、特效、IM 等相关SDK，并支持标准转码、锐智转码及切片、水印等音视频处理功能，助力用户构建更丰富的产品功能。' }
  ],
  [
    { icon: <FeatureIcon src={icon4} />, title: '全面的内容审核支撑', desc: '七牛云提供覆盖图片、视频、语音、文本、直播流等多媒体内容的审核服务，精准识别过滤等各类违规内容，提升平台业务合规性。' },
    { icon: <FeatureIcon src={icon5} />, title: '高性能网络', desc: '七牛云使用的音视频传输网络，历经上万个客户、数亿场点直播的考验，轻松应对高并发业务场景。' },
    { icon: <FeatureIcon src={icon6} />, title: '全链路监控', desc: '七牛云打造了音视频通信的全链路质量监控服务，用于问题排查，辅助提升通信质量，优化网络性能，保障服务的稳定流畅。' }
  ]
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      {
        groups.map((group, index) => (
          <FeatureGroup key={index}>
            {
              group.map((item, i) => (
                <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={i}>
                  <FeatureDesc>{item.desc}</FeatureDesc>
                </FeatureItem>
              ))
            }
          </FeatureGroup>
        ))
      }
    </Feature>
  )
}
