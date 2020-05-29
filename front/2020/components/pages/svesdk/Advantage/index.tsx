import React, { ReactNode } from 'react'
import { LayoutCard, Row } from 'components/UI/Card'
import Section from 'components/Product/Section'

import NodeIcon from './images/node.svg'
import CompatIcon from './images/compatibility.svg'
import PlugIcon from './images/plug.svg'
import CheckedIcon from './images/checked.svg'

import style from './index.less'

export default function Advantage() {
  return (
    <Section title="核心优势" name="advantage">
      <Row>
        <MyCard
          icon={<NodeIcon />}
          title="性能卓群，功能强大"
          desc={['100+ 功能点，覆盖手机短视频制作的大部分场景', '3+ 年时间打磨，在拍摄、转码等方面性能优异', '包体轻盈、扩展性好', '基于字节跳动领先的图像处理技术']}
        />
        <MyCard
          icon={<CompatIcon />}
          title="技术融合，各取所长"
          desc={['基于短视频业务特点，对七牛短视频 SDK 和字节跳动特效 SDK 的接口层进行了技术优化，兼容性强', '迭代方便，可快速升级']}
        />
        <MyCard
          icon={<PlugIcon />}
          title="高效接入，抢占先机"
          desc={['显著缩短 iOS & Android 客户端短视频功能的开发周期', '维护方便，节省人力成本', '助力客户产品快速入市，抢占市场先机', '大量用户的认可与好评']}
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
      <div className={style.checked}>
        <CheckedIcon />
      </div>
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
