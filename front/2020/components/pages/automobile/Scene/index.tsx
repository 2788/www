import React from 'react'
import { Product } from 'constants/products'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import Related, { ProductItem } from 'components/Solution/Scene/Related'

import image1 from './images/image1.png'
import image2 from './images/image2.png'

import style from './style.less'

const panels = [
  {
    url: image1,
    title: '车载云上视频管理方案',
    desc: '面向乘用车和商用车，为驾驶员行为监管、货物搬运检测、行车路况及停车安全监控提供可视化视频管理业务：包括视频连接上云、云上按需录制、按需截图等功能。',
    advantages: [
      '快速接入：支持 GB/T28181、RTMP 协议，现有设备无需改造即可上云',
      '弹性存储：提供标准、低频、归档三种存储类型，满足客户对存储性能、成本的不同诉求',
      '功能丰富：集视频截图、录制、检索、对讲、PTZ 控制等功能于一体'
    ],
    relatedComponent: (
      <Related size={3}>
        <ProductItem product={Product.Qvs} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  },
  {
    url: image2,
    title: '车企智能运维分析方案',
    desc: '面向汽车产业链上下游相关企业的 IT 信息系统，通过对日志、指标等大数据进行多维分析，以实现用户行为洞察、监控告警以及故障快速定位等功能。',
    advantages: [
      '用户行为趋势：用户访问时间段、车品牌访问统计、页面访问量、用户区域分布等信息，并进行同比、环比可视化展示',
      'AI 故障预测：利用专家经验及机器学习算法设计动态阈值，一旦触发阈值，提示故障风险，联动预案处理',
      '拓扑化快速故障定位：拓扑呈现服务间依赖关系，业务故障，服务间影响一目了然，关联IT指标及事件层层展开，挖掘根因'
    ]
  }
]

export default function AutomobileScene() {
  return (
    <Scene name="scene" title="应用场景">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index}>
            <SceneBlock blockType="fixed" withoutMargin>
              <img src={panel.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight} withoutMargin>
              <h4 className={style.title}>场景描述</h4>
              <p className={style.desc}>{panel.desc}</p>
              <h4 className={style.title}>亮点</h4>
              <ul className={style.list}>
                {
                  panel.advantages.map((item, i) => (
                    <li key={i} className={style.item}>
                      {item}
                    </li>
                  ))
                }
              </ul>
              {panel.relatedComponent && (
                <>
                  <h4 className={style.title}>相关产品</h4>
                  {panel.relatedComponent}
                </>
              )}
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
