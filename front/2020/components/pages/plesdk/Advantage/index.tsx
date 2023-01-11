import React, { ReactNode } from 'react'
import { LayoutCard, Row } from 'components/UI/Card'
import Section from 'components/Product/Section'
import { Icon } from 'components/Product/Feature'

import CheckedIcon from './images/checked.svg'

import cpuIcon from './images/cpu.png'
import trafficIcon from './images/traffic.png'
import plugIcon from './images/plug.png'

import style from './index.less'

export default function Advantage() {
  return (
    <Section title="核心优势" name="advantage">
      <Row>
        <MyCard
          icon={<Icon src={cpuIcon} />}
          title="功能强大，性能优越"
          desc={['超过 50 个功能点，可覆盖绝大部分应用场景', '基于字节跳动强大的人脸识别技术，高级美颜、人脸贴纸效果更佳', '音视频编码及渲染经深度优化，对手机性能消耗低']}
        />
        <MyCard
          icon={<Icon src={trafficIcon} />}
          title="简单集成，快速接入"
          desc={['包含示例 UI，有助于快速搭建功能界面', '接口定义清晰，代码注释丰富', '完善的日志分级，方便问题排查']}
        />
        <MyCard
          icon={<Icon src={plugIcon} />}
          title="兼容性好，扩展性强"
          desc={['推流模块支持软硬编，兼容市面绝大部分主流机型', '直播推流支持 QUIC 协议，无惧弱网环境', '美颜滤镜等素材文件独立，可快速替换以便功能迭代']}
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
    <LayoutCard className={style.card}>
      <div className={style.icon}>{icon}</div>
      <div className={style.title}>{title}</div>
      {descItems}
    </LayoutCard>
  )
}
