import React from 'react'
import classnames from 'classnames'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      <Menu mode="inline" level={-1}>
        <SubMenu mode="inline" title="拍摄">
          <MenuItem><Card title="推流协议" desc="支持主流推流协议 RTMP，也支持弱网推流协议 QUIC" /></MenuItem>
          <MenuItem><Card title="推流模式" desc="支持横竖屏切换、静音推流、纯音频推流等模式" /></MenuItem>
          <MenuItem><Card title="推流优化" desc="根据网络状况会进行动态丢帧，支持断线重连，保证直播体验" /></MenuItem>
          <MenuItem><Card title="支持软、硬编码" desc="软编：采用 CPU 进行编码，功耗较高，兼容性较好，同等码率的情况下画面质量较硬编更好。硬编：采用 GPU 进行编码，功耗较低，兼容性较差，某些机型上可能引起 Crash，同等码率情况下画质较差" /></MenuItem>
          <MenuItem><Card noBorder title="自定义 SEI 消息" desc="主要用于直播答题等场景，用于主播端自定义消息附随推流" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="视频">
          <MenuItem><Card title="码率设置" desc="多种码率、分辨率可以选用，在推流过程中也可以切换，可以根据主播上行网络的好坏自动调整视频码率" /></MenuItem>
          <MenuItem><Card title="镜头设置" desc="支持前后摄像头切换、开关闪光灯、设置画面镜像、手动/自动对焦，焦距调节等" /></MenuItem>
          <MenuItem><Card noBorder title="自定义音视频处理" desc="用户可以通过回调接口，获取当前音视频数据，实现自定义音视频数据处理。可用于接入第三方美颜、滤镜、贴纸等增值功能" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="音频">
          <MenuItem><Card title="双声道立体声" desc="支持双声道立体声推流" /></MenuItem>
          <MenuItem><Card title="背景音乐" desc="主播在推流时可以有背景音乐混音" /></MenuItem>
          <MenuItem><Card noBorder title="耳机返听" desc="当主播带上耳机唱歌时，从耳机中可以实时听到自己的声音，该功能可以帮助主播在唱歌等场景下实时监听自己的声音。一般该功能会跟背景音乐的混音功能一起使用。也蓝牙耳机的返听" /></MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

type CardProps = {
  title: string
  desc: string
  noBorder?: boolean
}

function Card({ title, desc, noBorder }: CardProps) {
  return (
    <div className={classnames(style.card, noBorder && style.noBorder)}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.desc}>{desc}</p>
    </div>
  )
}
