import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'

import style from './style.less'

const scenes = [
  {
    url: image1,
    title: '智能客服机器人',
    desc: '通过语音识别、语音合成、自然语言理解技术，帮助实现智能客服机器人场景下的自动识别人声，自动回复功能，推动人机交互更加流畅自然。'
  },
  {
    url: image2,
    title: '智能直播字幕',
    desc: '通过实时语音识别技术，在直播场景下将语音转写为文字，减少人工处理成本，提升用户体验。'
  },
  {
    url: image3,
    title: '呼叫中心录音质检',
    desc: '通过语音识别、自然语言理解、声纹识别等技术，将语音转化为文本，同时根据质检规则进行分析，解决大规模客服服务质量监控难的问题，提升客服中心的服务质量。'
  },
  {
    url: image4,
    title: '身份验证',
    desc: '通过语音识别和声纹识别技术，在登录，支付等鉴权环节验证用户身份，提高业务安全性和可靠性。'
  }
]

export default function VoiceScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.sceneTitle}>{scene.title}</h3>
              <p>{scene.desc}</p>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
