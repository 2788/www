import React from 'react'
import { Product } from 'constants/products'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import Related, { ProductItem } from 'components/Solution/Scene/Related'

import Icon1 from './images/01.svg'
import Icon2 from './images/02.svg'
import Icon3 from './images/03.svg'
import Icon4 from './images/04.svg'
import Icon5 from './images/05.svg'

import style from './index.less'

const panels = [
  {
    icon: <Icon1 />,
    title: '图文电商',
    desc: '为满足电商平台对图片处理和识别、图文审核需求，七牛云提供了图片上传加速、处理、审核、存储、内容分发等一站式服务。',
    use: '货架电商、导购页、图片评论等',
    advantages: [
      '满足海量图片的存储需求，高可用、高可靠。',
      '满足海量图片生成缩略图、水印、裁剪、旋转等需求。',
      '高效准确识别图片中的违规信息、广告等，为平台内容安全合规保驾护航。',
      '覆盖全球的 CDN 网络，帮助用户图片内容高效分发到用户终端。'
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
    title: '视频电商',
    desc: '电商平台经常会通过拍摄或者制作短视频等内容形式对商品进行全方位展示，以及用户拍摄视频买家秀，让用户更直观地感知商品实际样貌，提升线上购物体验。',
    use: '买家秀、商品短视频、美妆电商、医美平台等',
    advantages: [
      '提供从视频拍摄、编辑、合成、上传、审核、存储、分发、播放等一站式短视频解决方案。',
      '丰富的美颜、滤镜、水印、背景分割、转码等视频处理服务，有效提升视频观看体验。',
      '全球 2000+ 网络节点覆盖，保障稳定、流畅的视频播放体验。'
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
    title: '直播带货',
    desc: '带货主播通过直播的形式对商品进行宣传展示和详细介绍，结合折扣力度引导并激发观众的购买热情，提升商品在线上平台销售的转化率。',
    use: '直播购物、智慧商场、远程导购等',
    advantages: [
      '支持多种信号源（移动设备、摄像机、PC 桌面等）推送云端。',
      '毫秒级延迟和无上限的直播观看人数。',
      '提供丰富的美妆美体、人像分割、AR 特效、IM 等功能，提升直播间的氛围，助力营销。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Beautysdk} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.QnPlayer} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Cdn} />
      </Related>
    )
  },
  {
    icon: <Icon4 />,
    title: '互动电商',
    desc: '带货主播通过直播互动形式介绍商品的同时，支持让嘉宾，观众或者生产厂家等通过连麦实时展示、推荐商品给用户，提升商品热度，吸引用户购买。',
    use: 'PK 带货、嘉宾连麦、观众连麦、产地连麦等',
    advantages: [
      '提供 150 ms 的超低延迟音视频服务和超强的弱网抗丢包能力，保证带货主播与连麦者在线互动高质量体验。',
      '智能分析视频场景，实现更低带宽下的高清视频体验。',
      '贴合电商业务场景，实时精准识别直播互动过程中的违规内容，保障平台安全合规。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Beautysdk} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  },
  {
    icon: <Icon5 />,
    title: '文玩电商',
    desc: '文玩电商指的是电商平台提供玉翠珠宝、文玩把件、名表奢侈品等物品的在线直播鉴定和线上拍卖等服务，观众能通过连麦的方式与主播或者专家进行实时互动。',
    use: '在线鉴宝、文玩拍卖',
    advantages: [
      '高清实时音视频服务能力，让鉴定和拍卖如同面对面一样真实。',
      '支持动态邀人、踢人、禁音等多种管理权限，使聊天互动更加有序。',
      '提供适配文玩电商场景的内容审核策略模型，降低平台监管风险。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  }
]

export default function EcScene() {
  return (
    <Scene name="scene" title="应用场景" defaultActive="scene-tab-0">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index}>
            <div className={style.iconContainer}>{panel.icon}</div>
            <SceneBlock className={style.block} shadow withoutMargin>
              <h4 className={style.title}>场景描述</h4>
              <p className={style.content}>{panel.desc}</p>
              <h4 className={style.title}>应用场景</h4>
              <p className={style.content}>{panel.use}</p>
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
    </Scene>
  )
}
