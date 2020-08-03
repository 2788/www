import React from 'react'
import Section from 'components/Product/Section'
import { useModal as useFeedbackModal } from 'components/Feedback'
import { LayoutCard, Row } from 'components/UI/Card'

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
      <Row>
        <MyCard bgImg={scene1} title="金融" />
        <MyCard bgImg={scene2} title="社交电商" />
        <MyCard bgImg={scene3} title="教育" />
      </Row>
      <Row style={{ marginBottom: '24px' }}>
        <MyCard bgImg={scene4} title="泛娱乐" />
        <MyCard bgImg={scene5} title="在线政务" />
        <MyCard bgImg={scene6} title="网约车" />
      </Row>
      <span className={style.link} onClick={startConsulting}>立即咨询 <Arrow /></span>
    </Section>
  )
}

type Props = {
  title: string
  bgImg: string
}

function MyCard({ title, bgImg }: Props) {
  return <LayoutCard className={style.card} style={{ background: `url(${bgImg})` }}>{title}</LayoutCard>
}
