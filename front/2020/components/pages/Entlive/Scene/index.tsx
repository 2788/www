import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import img1 from './images/scene1.png'
import img2 from './images/scene2.png'
import img3 from './images/scene3.png'

import style from './index.less'

const scenes = [
  {
    imgUrl: img1,
    title: '营销直播',
    desc: '发展私域流量池，为企业快速搭建集美颜美妆、实时连麦 、营销互动、直播购物、用户数据分析为一体的直播服务，可与企业自有的商城系统无缝对接，促进订单转化，激活流量。',
    advantages: [
      '营销带货',
      '品牌促销',
      '金融直播'
    ]
  },
  {
    imgUrl: img2,
    title: '培训直播',
    desc: '企业线下培训成本高，内容难以留存复用，培训效果监测困难。七牛云提供 PPT 演示、连麦互动、问卷调研、直播间密码/白名单、直播回放，培训效果分析等功能，轻松搭建“有效、有考核、有评估”的企业培训。',
    advantages: [
      '员工培训',
      '产品培训',
      '知识付费'
    ]
  },
  {
    imgUrl: img3,
    title: '活动直播',
    desc: '传统的线下展会、发布会、产品营销等活动成本高昂，获客难度大，不少企业转型线上直播，通过云上展会、线上发布会等形式，扩大品牌影响力。七牛云为企业一键搭建直播间，一站式解决直播策划、现场执行、异地连线等难题，提供互动玩法、表单采集、用户画像分析等精细化运营工具，实现快速裂变增长。',
    advantages: [
      '产品发布会',
      '品牌年会',
      '展会直播'
    ]
  }
]

export default function EntliveScene() {
  return (
    <Scene name="scene" title="应用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed" className={style.bolckLeft}>
              <img src={scene.imgUrl} className={style.sceneIcon} alt={scene.title} />
            </SceneBlock>
            <SceneBlock className={style.blockRight} withoutMargin>
              <h3 className={style.title}>{scene.title}</h3>
              <p className={style.desc}>{scene.desc}</p>
              <h4 className={style.subTitle}>细分场景</h4>
              <ul className={style.list}>
                {
                  scene.advantages.map((advantage, i) => (
                    <li className={style.item} key={i}>{advantage}</li>
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
