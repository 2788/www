import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card, Row } from 'components/UI/Card'

import style from './style.less'

export default function Pc() {
  return (
    <Tabs defaultValue="1">
      <TabPane tab="推流" value="1" className={style.pane}>
        <Row>
          <MyCard title="推流协议" desc="支持主流推流协议 rtmp，也支持弱网推流协议 QUIC。" />
          <MyCard title="视频裁剪" desc="支持横竖屏切换、静音推流、纯音频推流等模式。" />
          <MyCard title="视频旋转" desc="根据网络状况会进行动态丢帧，支持断线重连，保证直播体验。" />
          <MyCard title="视频转场" desc="软编：采用 CPU 进行编码，功耗较高，兼容性较好,同等码率的情况下画面质量较硬编更好。硬编：采用 GPU 进行编码，功耗较低，兼容性较差，某些机型上可能引起 crash，同等码率情况下画质较差。" />
        </Row>
        <Row>
          <MyCard title="视频合成" desc="主要用于直播答题等场景，用于主播端自定义消息附随推流。" />
        </Row>
      </TabPane>
      <TabPane tab="视频" value="2">
        TODO
      </TabPane>
      <TabPane tab="音频" value="3">
        TODO
      </TabPane>
      <TabPane tab="美颜" value="4">
        TODO
      </TabPane>
      <TabPane tab="滤镜" value="5">
        TODO
      </TabPane>
      <TabPane tab="贴纸" value="6">
        TODO
      </TabPane>
    </Tabs>
  )
}

type CardProps = {
  title: string
  desc: string
}

function MyCard({ title, desc }: CardProps) {
  return (
    <Card className={style.cardWrapper}>
      <div className={style.card}>
        <div className={style.title}>{title}</div>
        <div className={style.desc}>{desc}</div>
      </div>
    </Card>
  )
}
