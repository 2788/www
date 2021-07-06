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
    title: '融媒体',
    desc: '通过智能动态编码和画质增强技术能力，为新闻、体育赛事、电影电视、纪录片等复杂场景提供高性能编码压缩和画质提升服务，带来更清晰的播放体验。'
  },
  {
    url: image2,
    title: '泛娱乐',
    desc: '支持丰富的音视频编码和封装格式，满足各种视频使用场景，针对不同场景的视频定制优化，获得更清晰的观看体验。'
  },
  {
    url: image3,
    title: '在线教育',
    desc: '智能识别分析教学场景内容变化，充分利用图像增强和降噪算法挖掘人眼视觉特性，实现在更低带宽下，提高视频主观体验。'
  }
]

export default function AvSmartScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.icon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.title}>场景描述</h3>
              <p className={style.desc}>{scene.desc}</p>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
