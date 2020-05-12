import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'

import style from './style.less'

// TODO 移动端适配
export default function Pc() {
  return (
    <Tabs defaultValue="1">
      <TabPane tab="拍摄" value="1" className={style.pane}>
        <Card title="拍摄设置" desc="视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点" />
        <Card title="拍摄方式" desc="正常拍摄、静音拍摄、音频录制、分段拍摄、分屏拍摄等功能" />
        <Card title="实时处理" desc="拍摄时可以使用内置实时美颜、实时滤镜。另外也支持贴纸、水印功能。" />
        <Card title="背景音乐" desc="支持拍摄前预设背景音乐。" />
      </TabPane>
      <TabPane tab="编辑" value="2">
        456
      </TabPane>
      <TabPane tab="功能扩展接口" value="3">
        123
      </TabPane>
    </Tabs>
  )
}

type CardProps = {
  title: string
  desc: string
}

function Card({ title, desc }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      <div className={style.desc}>{desc}</div>
    </div>
  )
}
