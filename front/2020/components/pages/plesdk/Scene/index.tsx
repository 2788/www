import React from 'react'
import Section from 'components/Product/Section'

import scene1 from './images/scene1.png'
import scene2 from './images/scene2.png'
import scene3 from './images/scene3.png'
import scene4 from './images/scene4.png'
import scene5 from './images/scene5.png'
import scene6 from './images/scene6.png'

import style from './index.less'

export default function Scene() {
  return (
    <Section title="应用场景" name="scene">
      <div className={style.wrapper}>
        <SceneCard src={scene1} desc="电商直播" />
        <SceneCard src={scene2} desc="游戏直播" />
        <SceneCard src={scene3} desc="才艺直播" />
        <SceneCard src={scene4} desc="户外直播" />
        <SceneCard src={scene5} desc="教育直播" />
        <SceneCard src={scene6} desc="语音直播" />
      </div>
    </Section>
  )
}

type SceneCardProps = {
  src: string
  desc: string
}

function SceneCard({ src, desc }: SceneCardProps) {
  return (
    <figure>
      <img src={src} />
      <figcaption>{desc}</figcaption>
    </figure>
  )
}
