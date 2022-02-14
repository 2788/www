import React from 'react'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'

import img1 from './images/scene-1.png'
import img2 from './images/scene-2.png'
import img3 from './images/scene-3.png'
import style from './style.less'

const panels = [
  {
    imgUrl: img1,
    title: '在线教育',
    desc: '实现课件、随堂讲义等文档的在线浏览和翻译，降低学生使用门槛，增强体验。'
  },
  {
    imgUrl: img2,
    title: '文献阅读',
    desc: '帮助教师，学生，科研人员等阅读理解外文文献，节约调整格式，查阅资料的时间，提高工作学习效率。'
  },
  {
    imgUrl: img3,
    title: '文档打印',
    desc: '支持各类文档转换为可打印的文档格式，从而降低客户使用门槛，增强体验。'
  }
]

export default function DocumentScene() {
  return (
    <Scene name="scenes" title="适用场景" defaultActive="scene-tab-0">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed">
              <img src={panel.imgUrl} className={style.icon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight} withoutMargin>
              <h4 className={style.title}>{panel.title}</h4>
              <p className={style.desc}>{panel.desc}</p>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
