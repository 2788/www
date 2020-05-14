import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card, Row } from 'components/UI/Card'

import style from './style.less'

export default function Pc() {
  return (
    <Tabs defaultValue="1">
      <TabPane tab="推流" value="1">
        <Row>
          <MyCard title="推流协议" desc="支持主流推流协议 rtmp，也支持弱网推流协议 QUIC。" />
          <MyCard title="推流模式" desc="支持横竖屏切换、静音推流、纯音频推流等模式。" />
          <MyCard title="推流优化" desc="根据网络状况会进行动态丢帧，支持断线重连，保证直播体验。" />
          <MyCard title="支持软、硬编码" desc="软编：采用 CPU 进行编码，功耗较高，兼容性较好,同等码率的情况下画面质量较硬编更好。硬编：采用 GPU 进行编码，功耗较低，兼容性较差，某些机型上可能引起 crash，同等码率情况下画质较差。" />
        </Row>
        <Row>
          <MyCard title="自定义 SEI 消息" desc="主要用于直播答题等场景，用于主播端自定义消息附随推流。" />
        </Row>
      </TabPane>
      <TabPane tab="视频" value="2">
        <Row>
          <MyCard title="码率设置" desc="多种码率、分辨率可以选用，在推流过程中也可以切换，可以根据主播上行网络的好坏自动调整视频码率。" />
          <MyCard title="镜头设置" desc="支持前后摄像头切换、开关闪光灯、设置画面镜像、手动 / 自动对焦，焦距调节等。" />
          <MyCard title="自定义图像处理" desc="用户可以通过回调接口，获取当前音视频数据，实现自定义音视频数据处理。" />
        </Row>
      </TabPane>
      <TabPane tab="音频" value="3">
        <Row>
          <MyCard title="双声道立体声" desc="支持双声道立体声推流。" />
          <MyCard title="背景音乐" desc="主播在推流时可以有背景音乐混音。" />
          <MyCard title="耳机返听" desc="当主播带上耳机唱歌时，从耳机中可以实时听到自己的声音，该功能可以帮助主播在唱歌等场景下实时监听自己的声音。一般该功能会跟背景音乐的混音功能一起使用。也蓝牙耳机的返听。" />
        </Row>
      </TabPane>
      <TabPane tab="美颜" value="4">
        <Row>
          <MyCard title="美颜" desc="基于字节跳动人脸识别技术，美白、磨皮、锐化、大眼、瘦脸，效果更明显。" />
        </Row>
      </TabPane>
      <TabPane tab="滤镜" value="5">
        <Row>
          <MyCard title="滤镜" desc="多款风格滤镜，满足各类场景需要。" />
        </Row>
      </TabPane>
      <TabPane tab="贴纸" value="6">
        <Row>
          <MyCard title="贴纸" desc="上千款贴纸任意挑选，2D、3D 人脸贴纸应有尽有。" />
        </Row>
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
