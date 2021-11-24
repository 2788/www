import React from 'react'
import { Product } from 'constants/products'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'

import Related, { ProductItem } from 'components/Solution/Scene/Related'

import Icon1 from './images/scene-1.svg'
import Icon2 from './images/scene-2.svg'
import Icon3 from './images/scene-3.svg'
import Icon4 from './images/scene-4.svg'
import Icon5 from './images/scene-5.svg'
import Icon6 from './images/scene-6.svg'
import style from './style.less'

const panels = [
  {
    icon: <Icon1 />,
    title: '兴趣社区',
    desc: '基于用户爱好构建的论坛、部落、小组、频道、圈子等，汇集了用户基于共同兴趣而创作的大量图文、音视频、直播等内容。',
    advantages: [
      '图文、音视频、直播等多种媒体传播形式，快速构建丰富的内容生态。',
      '美颜、特效、滤镜、多人互动等功能，帮助实现更多娱乐玩法。',
      '完善的内容审核能力，帮助平台防范内容违规风险，保障业务合规。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Cdn} />
      </Related>
    )
  },
  {
    icon: <Icon2 />,
    title: '长视频点播',
    desc: '用户通过在线视频网站或 App 观看电影、电视剧、娱乐综艺等长视频内容，并可以进行弹幕、评论等形式互动。',
    advantages: [
      '2000+ CDN 节点资源，保障直播效果流畅、不卡顿，提升用户观看体验。',
      '功能强大的转码和丰富的模板，适配不同网络状况下用户的观看需求。',
      '全面支持 HDR——HDR10、Dolby、HDR10+，提升视频画面质量。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Cdn} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon3 />,
    title: '秀场直播',
    desc: '用户通过直播平台表演唱歌、跳舞、脱口秀等节目，展示自己的才艺和风采，并和观众通过弹幕、连麦等形式互动。',
    advantages: [
      '2000+ CDN 节点资源，保障海量用户在线观看，直播效果流畅、不卡顿。',
      '支持 RTMP、FLV、HLS、WebRTC、SRT、QUIC 等多种流媒体协议，灵活打造直播场景。',
      '提供美颜滤镜、AR 贴纸、大眼瘦脸等功能，提升直播内容表现力。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Geek} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon4 />,
    title: '游戏直播',
    desc: '游戏主播通过直播平台直播游戏全过程，介绍玩法、策略，展示自己的真实操作，观众通过弹幕、连麦等形式参与互动，提升平台用户黏性及活跃度。',
    advantages: [
      '支持标准直播的同时，还提供低延时、连麦等直播服务，满足用户实时互动需求。',
      '支持标准转码及锐智转码并提供多种转码模板，轻松适配不同网络状况的用户观看需求。',
      '全链路性能指标收集配合强大的数据分析平台，帮助直播平台进行业务优化。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Geek} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon5 />,
    title: '赛事直播',
    desc: '体育、电竞赛事在线直播。',
    advantages: [
      '支持标准直播的同时，还提供低延时、连麦等直播服务，满足用户实时互动需求。',
      '支持标准转码及锐智转码并提供多种转码模板，轻松适配不同网络状况的用户观看需求。',
      '支持 RTMP、FLV、HLS、WebRTC、SRT、QUIC 等多种流媒体协议，灵活打造直播场景。',
      '多终端支持，支持随时随地进行大规模赛事在线直播。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Geek} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon6 />,
    title: '电台播客',
    desc: '支持播客及互动电台场景，用户可以自由创建房间和主题，吸引其他用户收听，听众可以随时举手上麦参与实时互动交流。',
    advantages: [
      '业界领先的 3A 算法——回声消除、噪声抑制、自动增益，让互动更真实。',
      '丰富节点（2000+）资源组成的实时流网络（LiveNet），快速将内容分发至不同地区的用户。',
      '可以灵活定制的内容审核功能，满足客户多层次审核需求，提升平台合规性。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  }
]

export default function EntertainmentScene() {
  return (
    <Scene name="scene" title="应用场景" defaultActive="scene-tab-0">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index}>
            <div className={style.iconContainer}>{panel.icon}</div>
            <SceneBlock className={style.block} shadow withoutMargin>
              <h4 className={style.title}>场景描述</h4>
              <p className={style.content}>{panel.desc}</p>
              <h4 className={style.title}>方案优势</h4>
              <ul className={style.list}>
                {
                  panel.advantages.map((advantage, i) => (
                    <li className={style.item} key={i}>{advantage}</li>
                  ))
                }
              </ul>
              <h4 className={style.title}>相关产品</h4>
              {panel.relatedComponent}
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene >
  )
}
