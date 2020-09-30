import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import Icon1 from './images/scene1.svg'
import Icon2 from './images/scene2.svg'
import Icon3 from './images/scene3.svg'

import style from './index.less'

const scenes = [
  {
    icon: <Icon1 />,
    title: '连麦 PK',
    desc: [
      '两个或多个主播进行连麦，隔空在线 PK'
    ]
  },
  {
    icon: <Icon2 />,
    title: '视频交友',
    desc: '多人在线视频聊天，开启新的交友模式'
  },
  {
    icon: <Icon3 />,
    title: '语音聊天室',
    desc: '剧本杀，狼人杀，声音互动乐趣多'
  }
]

export default function RtcliveScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed" className={style.bolckLeft}>
              {scene.icon}
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
