import React from 'react'
import CommonFeature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'

const features = [
  [
    {
      icon: <Icon1 />,
      title: '图片超分辨',
      desc: '基于深度学习的超分辨率重构算法，将输入图片放大 4 倍尺寸输出，并通过 GAN 产生图像细节，提升图片主观视觉体验。'
    },
    {
      icon: <Icon2 />,
      title: '画质综合增强',
      desc: '通过分析色彩关系和整体图像，结合海量视频数据的训练，综合运用超分辨率重建、降噪、去模糊、去马赛克、锐化等 AI 图像处理工具，自适应对视频进行智能处理，显著提升视频画质。'
    }
  ],
  [
    {
      icon: <Icon3 />,
      title: '视频去马赛克',
      desc: '通过对画面的全局分析，采用深度学习算法对视频进行去马赛克处理，在保留甚至提升视频清晰度的同时显著的抑制视频压缩所产生的块效应现象。'
    },
    {
      icon: <Icon4 />,
      title: '实时画质增强',
      desc: '在直播云端分发过程中采用七牛自主研发的高性能 AI 画质增强模型对直播流进行实时处理，从而达到显著提升直播画面清晰度的效果。'
    }
  ]
]

export default function Feature() {
  return (
    <CommonFeature title="产品功能" name="features">
      {
        features.map((group, index) => (
          <FeatureGroup key={index}>
            {
              group.map((feature, i) => (
                <FeatureItem pos="left-right" align="left" icon={feature.icon} title={feature.title} key={i}>
                  <FeatureDesc>{feature.desc}</FeatureDesc>
                </FeatureItem>
              ))
            }
          </FeatureGroup>
        ))
      }
    </CommonFeature>
  )
}
