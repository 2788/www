import React from 'react'
import Section from 'components/Product/Section'
import { Row, Card } from 'components/UI/Card'

import scene1 from './images/scene1.png'
import scene2 from './images/scene2.png'
import scene3 from './images/scene3.png'
import scene4 from './images/scene4.png'
import style from './index.less'

export default function Scene() {
  return (
    <Section title="应用场景" name="scene">
      <Row>
        <SceneCard src={scene1} title="社交娱乐" desc="直播交友、游戏直播、才艺秀场" />
        <SceneCard src={scene2} title="电商购物" desc="好物优选、鉴宝拍卖、房屋推介" />
        <SceneCard src={scene3} title="在线教育" desc="名师在线、招生大课、直播答题" />
        <SceneCard src={scene4} title="更多场景" desc="户外直播、语音直播、活动直播" />
      </Row>
    </Section>
  )
}

type SceneCardProps = {
  src: string
  title: string
  desc: string
}

function SceneCard({ src, title, desc }: SceneCardProps) {
  return (
    <Card className={style.card}>
      <img src={src} />
      <div className={style.content}>
        <div className={style.title}>{title}</div>
        <p className={style.desc}>{desc}</p>
      </div>
    </Card>
  )
}
