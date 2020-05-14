import React from 'react'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      <Menu mode="inline" level={-1}>
        <SubMenu mode="inline" title="拍摄">
          <MenuItem><Card title="推流协议" desc="支持主流推流协议rtmp，也支持弱网推流协议QUIC" /></MenuItem>
          <MenuItem><Card title="推流模式" desc="支持横竖屏切换、静音推流、纯音频推流等模式。" /></MenuItem>
          <MenuItem><Card title="推流优化" desc="根据网络状况会进行动态丢帧，支持断线重连，保证直播体验" /></MenuItem>
          <MenuItem><Card title="支持软、硬编码" desc="软编：采用CPU进行编码，功耗较高，兼容性较好,同等码率的情况下画面质量较硬编更好。硬编：采用GPU进行编码，功耗较低，兼容性较差，某些机型上可能引起crash，同等码率情况下画质较差" /></MenuItem>
          <MenuItem><Card title="支持软、硬编码" desc="软编：采用CPU进行编码，功耗较高，兼容性较好,同等码率的情况下画面质量较硬编更好。硬编：采用GPU进行编码，功耗较低，兼容性较差，某些机型上可能引起crash，同等码率情况下画质较差" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="视频">
          <MenuItem><Card title="素材导入" desc="从相册导入视频或图片。" /></MenuItem>
          <MenuItem><Card title="视频旋转" desc="对视频的角度进行旋转调整，例如顺时针旋转 90 度。" /></MenuItem>
          <MenuItem><Card title="视频转场" desc="适用于 25 两个视频之间的转场功能，目前支持飞入飞出、淡入淡出、擦除等效果。" /></MenuItem>
          <MenuItem><Card title="视频合成" desc="包括视频拼接、视频拼图。视频拼接是指多个视频按前后排列的方式进行合成，视频拼图是指多个视频像拼图一样同时展现在屏幕上的情景。" /></MenuItem>
          <MenuItem><Card title="视频画面编辑" desc="可以使用给视频添加滤镜、贴纸、水印、涂鸦、字幕这五种功能。" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="音频">
          <MenuItem><Card title="素材导入" desc="从相册导入视频或图片。" /></MenuItem>
          <MenuItem><Card title="视频旋转" desc="对视频的角度进行旋转调整，例如顺时针旋转 90 度。" /></MenuItem>
          <MenuItem><Card title="视频转场" desc="适用于 25 两个视频之间的转场功能，目前支持飞入飞出、淡入淡出、擦除等效果。" /></MenuItem>
          <MenuItem><Card title="视频合成" desc="包括视频拼接、视频拼图。视频拼接是指多个视频按前后排列的方式进行合成，视频拼图是指多个视频像拼图一样同时展现在屏幕上的情景。" /></MenuItem>
          <MenuItem><Card title="视频画面编辑" desc="可以使用给视频添加滤镜、贴纸、水印、涂鸦、字幕这五种功能。" /></MenuItem>
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
