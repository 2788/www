import React from 'react'
import Scene, { Panel as ScenePanel } from 'components/Product/Scene'

import img1 from './images/scene-1.png'
import img2 from './images/scene-2.png'
import img3 from './images/scene-3.png'
import img4 from './images/scene-4.png'
import img5 from './images/scene-5.png'
import style from './style.less'

const panels = [
  {
    imgUrl: img1,
    title: '短视频增强',
    desc: '对分辨率低于 720P 的短视频进行超分处理提升平台视频内容质量'
  },
  {
    imgUrl: img2,
    title: '老片修复',
    desc: '对老旧片源，特别是胶转数视频内容进行损伤修复和综合处理，提升老旧内容质量'
  },
  {
    imgUrl: img3,
    title: '视频转清晰度',
    desc: '以视频超分辨率重构技术为基础，辅以丰富的图像增强工具，实现标清转高清、高清转 4K 等画质提升应用场景'
  },
  {
    imgUrl: img4,
    title: '直播实时增强',
    desc: '对直播内容进行云端实时超分、去马赛克处理，适用于直播、RTC、安防监控、智能交通等场景'
  },
  {
    imgUrl: img5,
    title: '屏幕分享画质增强',
    desc: '对屏幕分享的内容（如 PPT）进行画质增强处理，改善用户体验，适用于在线教育、视频会议等场景'
  }
]

export default function EnhancementScene() {
  return (
    <Scene name="scenes" title="适用场景" defaultActive="scene-tab-0">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index} className={style.scenePanel}>
            <p className={style.desc}>{panel.desc}</p>
            <img src={panel.imgUrl} className={style.icon} />
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
