import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import style from './style.less'

const scenes = [
  {
    url: image1,
    title: '智能客服机器人',
    desc: '通过语音识别、语音合成、自然语言理解技术，帮助实现智能客服机器人场景下的自动识别人声，自动回复功能，推动人机交互更加流畅自然。'
  },
  {
    url: image2,
    title: '语音播报',
    desc: '在导航类，资讯类，有声书等 App 中，通过语音合成进行语音播报，让用户更即时简便的获取信息。'
  },
  {
    url: image3,
    title: '智能硬件设备',
    desc: '在智能家电，车载智能设备等场景下，为智能设备打造一个深入人心的形象，帮助提升解答效率，提高客户满意度。'
  }
]

export default function AvSmartScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} >
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.pic} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.title}>{scene.title}</h3>
              <p className={style.desc}>{scene.desc}</p>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
