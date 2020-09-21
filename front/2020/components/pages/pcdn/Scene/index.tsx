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
    title: '视频点播',
    desc: [
      { title: '高清视频播放', content: '实现 20M 大码率视频的流畅播放，精益调度能力保证高码率视频被分配更多边缘设备资源，保证高清视频顺畅播放。' },
      { title: '提升弱网播放体验', content: '在 200 ms 延迟和 20% 丢包的弱网环境下仍然可以保持较为流畅的播放体验。提升地铁、电梯等弱网环境下的播放体验。' },
      { title: '成本优化', content: '热点内容平均 P2P 分享率 90%，节省热点内容的 50% 以上的带宽成本。' }
    ]
  },
  {
    url: image2,
    title: '大文件下载',
    desc: [
      { title: '下载提速', content: '热点文件全网平均下载速度优化 50%，提升文件下载速度。' },
      { title: '亿级并发下载 ', content: '可随数据热度变化，动态增加/减少数据片，能支持亿级用户对同一文件的并发下载。' },
      { title: '成本优化', content: '热点内容平均 P2P 分享率 90%，节省热点内容的 50% 以上的带宽成本。' }
    ]
  }
]

export default function OcrScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} verticalCenter key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.sceneTitle}>场景描述</h3>
              <ul className={style.list}>
                {
                  scene.desc.map((item, i) => (
                    <li className={style.item} key={`${index}-${i}`}>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
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
