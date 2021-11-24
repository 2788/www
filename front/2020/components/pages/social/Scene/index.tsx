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
    title: '图片社交',
    desc: '用户通过图文方式在平台上进行沟通和交流。',
    advantages: [
      '多种图片处理接口（裁剪、缩放、水印等），满足图片个性化需求。',
      '支持美颜、滤镜等多种插件，丰富的生态应用协助更快速构建产品。',
      '支持多终端 SDK 及多语言 API 接口，最大程度降低开发成本。'
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
    title: '短视频社交',
    desc: '用户通过短视频形式分享生活瞬间、展示才艺，关注有趣的人和圈子，发现更美好的世界。',
    advantages: [
      '提供短视频、美颜特效、播放器等多种 SDK，帮助快速构建应用。',
      '提供混编、合成、裁剪等丰富视频处理功能，减少开发时间并降低开发成本。',
      '全面覆盖各地区、各运营商网络，实现全地域无盲区覆盖，并支持文件预热等功能。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Plsv} />
        <ProductItem product={Product.QnPlayer} />
        <ProductItem product={Product.Beautysdk} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Cdn} />
      </Related>
    )
  },
  {
    icon: <Icon3 />,
    title: '直播连麦',
    desc: '直播场景下，观众与主播或主播与主播之间可以进行音视频互动，丰富直播产品的趣味性。',
    advantages: [
      '支持全球 200+ 国家和地区，时延低至 150 ms，保证任意距离互动流畅稳定。',
      '支持千万级直播并发观看，秒级扩容保障服务极致稳定。',
      '完善的内容审核功能，避免违规风险。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Geek} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  },
  {
    icon: <Icon4 />,
    title: '视频相亲',
    desc: '男女嘉宾及红娘可以多方连麦互动，观众可以观看相亲现场也可以申请上麦参与相亲或实时互动。',
    advantages: [
      '支持美颜滤镜、美体美妆、动态贴纸等功能，提升相亲互动氛围。',
      '业界领先的 3A 算法——回声消除、噪声抑制、自动增益，让互动更真实。',
      '支持全球 200+ 国家和地区，时延低至 150 ms，打造极致互动体验。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon5 />,
    title: '互动游戏',
    desc: '支持狼人杀、剧本杀等多种线上互动游戏形式，快速打造互动游戏应用及平台。',
    advantages: [
      '延时低至 150 ms，打造极致游戏体验。',
      '支持大房间音视频连麦互动。',
      '支持 HLS、RTMP、FLV、WebRTC 等多种直播协议。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Geek} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon6 />,
    title: '语音聊天室',
    desc: '在线语聊房，主播和上麦观众实时聊天，其他观众可以进入房间观看并申请上麦互动。',
    advantages: [
      '业界领先的 3A 算法——回声消除、噪声抑制、自动增益，让互动更真实。',
      '支持针对音频内容的安全审核，保障平台安全合规。',
      '支持 HLS、RTMP、FLV、WebRTC 等多种直播协议。'
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

export default function SocialScene() {
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
