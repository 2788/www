import React from 'react'
import Section from 'components/Product/Section'
import Link from 'components/Link'
import { useModal as useFeedbackModal } from 'components/Feedback'

import scene1 from './images/scene1.png'
import scene2 from './images/scene2.png'
import scene3 from './images/scene3.png'
import scene4 from './images/scene4.png'
import scene5 from './images/scene5.png'
import scene6 from './images/scene6.png'
import Arrow from './images/arrow.svg'

import style from './index.less'

export default function Scene() {
  const { startConsulting } = useFeedbackModal()
  return (
    <Section title="典型应用场景" name="scene">
      <div className={style.wrapper}>
        <Card bgImg={scene1} title="金融" />
        <Card bgImg={scene2} title="社交电商" />
        <Card bgImg={scene3} title="教育" />
      </div>
      <div className={style.wrapper}>
        <Card bgImg={scene4} title="泛娱乐" />
        <Card bgImg={scene5} title="在线政务" />
        <Card bgImg={scene6} title="网约车" />
      </div>
      <Link className={style.link} onClick={startConsulting} blue>立即咨询 <Arrow /></Link>
    </Section>
  )
}

type Props = {
  title: string
  bgImg: string
}
function Card({ title, bgImg }: Props) {
  return <div className={style.card} style={{ background: `url(${bgImg})` }}>{title}</div>
}
