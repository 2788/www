import React from 'react'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      <Menu mode="inline" level={-1}>
        <SubMenu mode="inline" title="推流">
          <MenuItem><Card title="推流协议" desc="支持主流推流协议 rtmp，也支持弱网推流协议 QUIC。" /></MenuItem>
          <MenuItem><Card title="视频裁剪" desc="支持横竖屏切换、静音推流、纯音频推流等模式。" /></MenuItem>
          <MenuItem><Card title="视频旋转" desc="根据网络状况会进行动态丢帧，支持断线重连，保证直播体验。" /></MenuItem>
          <MenuItem><Card title="视频转场" desc="软编：采用 CPU 进行编码，功耗较高，兼容性较好,同等码率的情况下画面质量较硬编更好。硬编：采用 GPU 进行编码，功耗较低，兼容性较差，某些机型上可能引起 crash，同等码率情况下画质较差。" /></MenuItem>
          <MenuItem><Card title="视频合成" desc="主要用于直播答题等场景，用于主播端自定义消息附随推流。" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="视频">
          <MenuItem>TODO</MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="音频">
          <MenuItem>TODO</MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="美颜">
          <MenuItem>TODO</MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="滤镜">
          <MenuItem>TODO</MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="贴纸">
          <MenuItem>TODO</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

type CardProps = {
  title: string
  desc: string
}

function Card({ title, desc }: CardProps) {
  return (
    <div className={style.card}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.desc}>{desc}</p>
    </div>
  )
}
