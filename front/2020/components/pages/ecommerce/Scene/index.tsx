import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import image1 from './images/image1.png'
import image2 from './images/image2.png'

import style from './index.less'

const scenes = [
  {
    url: image1,
    title: '电商直播卖货',
    desc: [
      '七牛云提供一站式直播卖货接入服务，支持多种信号源',
      '在不改变原有推拉流的基础上，提供连麦，转码、封装、时移、超低延时等功能，都能通过七牛云快速搭建业务，节约研发成本和开发周期，快速上线'
    ]
  },
  {
    url: image2,
    title: '智慧电商数据',
    desc: [
      '针对不同业务场景构建数据分析模型，实现全面化业务实时监控',
      '结合机器学习算法分析和预测业务运营情况、用户行为，主动发现业务风险，从而提升用户体验，通过数据驱动业务决策实现商业智能'
    ]
  }
]

export default function EcScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.sceneTitle}>场景描述</h3>
              <ul className={style.list}>
                {
                  scene.desc.map((item, i) => (
                    <li className={style.item} key={`${index}-${i}`}>
                      <p>{item}</p>
                    </li>
                  ))
                }
              </ul>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
