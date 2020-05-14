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
        <SceneCard src={scene1} desc="Vlog 制作" />
        <SceneCard src={scene2} desc="动漫配音秀" />
        <SceneCard src={scene3} desc="短视频新闻" />
        <SceneCard src={scene4} desc="互动聊天" />
        <SceneCard src={scene5} desc="社区动态" />
        <SceneCard src={scene6} desc="教育短视频" />
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
