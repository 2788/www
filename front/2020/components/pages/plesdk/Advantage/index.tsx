import React, { ReactNode } from 'react'
import { Card, Row } from 'components/UI/Card'
import Section from 'components/Product/Section'

import CpuIcon from './images/cpu.svg'
import TrafficIcon from './images/traffic.svg'
import PlugIcon from './images/plug.svg'
import CheckedIcon from './images/checked.svg'

import style from './index.less'

export default function Advantage() {
  return (
    <Section title="核心优势" name="advantage">
      <Row>
        <MyCard
          icon={<CpuIcon />}
          title="功能强大，性能优越"
          desc={['超过 50 个功能点，可覆盖绝大部分应用场景', '基于字节跳动强大的人脸识别技术，高级美颜、人脸贴纸效果更佳', '音视频编码及渲染经深度优化，对手机性能消耗低']}
        />
        <MyCard
          icon={<TrafficIcon />}
          title="功能强大，性能优越"
          desc={['超过 50 个功能点，可覆盖绝大部分应用场景', '基于字节跳动强大的人脸识别技术，高级美颜、人脸贴纸效果更佳', '音视频编码及渲染经深度优化，对手机性能消耗低']}
        />
        <MyCard
          icon={<PlugIcon />}
          title="功能强大，性能优越"
          desc={['超过 50 个功能点，可覆盖绝大部分应用场景', '基于字节跳动强大的人脸识别技术，高级美颜、人脸贴纸效果更佳', '音视频编码及渲染经深度优化，对手机性能消耗低']}
        />
      </Row>
    </Section>
  )
}

type MyCardProps = {
  icon: ReactNode
  title: string
  desc: string[]
}

function MyCard({ icon, title, desc }: MyCardProps) {
  const descItems = desc.map((text, index) => (
    <div key={index} className={style.desc}>
      <div className={style.checked}><CheckedIcon /></div>
      <p className={style.text}>{text}</p>
    </div>
  ))

  return (
    <Card className={style.card}>
      <div className={style.icon}>{icon}</div>
      <div className={style.title}>{title}</div>
      {descItems}
    </Card>
  )
}
