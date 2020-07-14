import React from 'react'
import Feature, { Group, Item, Desc } from 'components/Product/Feature'

import Icon1 from './images/01.svg'
import Icon2 from './images/02.svg'
import Icon3 from './images/03.svg'
import Icon4 from './images/04.svg'
import Icon5 from './images/05.svg'
import Icon6 from './images/06.svg'

import style from './index.less'

export default function Advantage() {
  return (
    <Feature name="features" title="产品优势">
      <Group>
        <Item title="接入简单" icon={<Icon1 />}>
          <Desc className={style.featureItemDesc}>
            设备接入成本低，无需集成 SDK，适配 RTMP 或 GB/T28181 国标协议对接，现有设备零改造，快速完成视频监控设备上云
          </Desc>
        </Item>
        <Item title="功能丰富" icon={<Icon2 />}>
          <Desc className={style.featureItemDesc}>集视频流接入、实时视频、云端存储与回放等功能，满足不同场景下的视频监控的上云需求</Desc>
        </Item>
        <Item title="安全可靠" icon={<Icon3 />}>
          <Desc className={style.featureItemDesc}>
            视频接入、播放支持鉴权，视频数据传输通道加密，云端存储与访问按照租户加密和隔离，并支持 HTTPS 安全协议，保障用户数据安全可靠接入、存储和播放
          </Desc>
        </Item>
      </Group>
      <Group>
        <Item title="服务稳定" icon={<Icon4 />}>
          <Desc className={style.featureItemDesc}>
            广泛设备接入，提供大容量、高并发的视频连接，并发容量可达百万；服务资源弹性扩展，提供高稳定性高并发的平台能力，提供秒级的视频首开与播放延迟
          </Desc>
        </Item>
        <Item title="多场景支持" icon={<Icon5 />}>
          <Desc className={style.featureItemDesc}>灵活的流处理机制，录制、截图模板的配置规则，可覆盖众多应用场景</Desc>
        </Item>
        <Item title="视频处理" icon={<Icon6 />}>
          <Desc className={style.featureItemDesc}>用户可结合智能多媒体服务，实现视频截帧后的图片处理、录制文件的转码处理</Desc>
        </Item>
      </Group>
    </Feature>
  )
}
