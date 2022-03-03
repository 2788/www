import React from 'react'
import Feature, { Group, Item, Desc } from 'components/Product/Feature'

import Icon1 from './images/01.svg'
import Icon2 from './images/02.svg'
import Icon3 from './images/03.svg'
import Icon4 from './images/04.svg'

export default function Core() {
  return (
    <Feature name="cores" title="核心功能">
      <Group>
        <Item pos="left-right" title="视频接入管理" icon={<Icon1 />}>
          <Desc>摄像头、NVR、视频监控平台以及各类具备视音频能力的硬件，可以通过 RTMP 推流、GB/T28181 或者 RTSP、RTMP、FLV、HLS 拉流接入七牛云 QVS</Desc>
        </Item>
        <Item pos="left-right" title="视频实时播放" icon={<Icon2 />}>
          <Desc>视频流接入 QVS 后，可以实现三种标准播放协议 RTMP、HLS、HTTP-FLV 的实时观看，同时支持使用低延时的 WebRTC 拉流观看</Desc>
        </Item>
      </Group>
      <Group>
        <Item pos="left-right" title="视频录制分发" icon={<Icon3 />}>
          <Desc>云端高可靠持久化存储与生命周期管理，实现视频录制、管理、快速回看，内容全网高质量分发</Desc>
        </Item>
        <Item pos="left-right" title="平台开放融合" icon={<Icon4 />}>
          <Desc>丰富的功能以及 Open API，无需额外开发，可与智能多媒体等产品集成，覆盖更多应用场景</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
