import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card, Row } from 'components/UI/Card'

import style from './style.less'

export default function Pc() {
  return (
    <Tabs defaultValue="2">
      <TabPane tab="拍摄" value="1" className={style.pane}>
        TODO
      </TabPane>
      <TabPane tab="编辑" value="2">
        <Row>
          <MyCard title="素材导入" desc="从相册导入视频或图片。" />
          <MyCard title="视频裁剪" desc="时长裁剪和画面裁剪这两个功能。" />
          <MyCard title="视频旋转" desc="对视频的角度进行旋转调整，例如顺时针旋转 90 度。" />
          <MyCard title="视频转场" desc="适用于 25 两个视频之间的转场功能，目前支持飞入飞出、淡入淡出、擦除等效果。" />
        </Row>
        <Row>
          <MyCard title="视频合成" desc="包括视频拼接、视频拼图。视频拼接是指多个视频按前后排列的方式进行合成，视频拼图是指多个视频像拼图一样同时展现在屏幕上的情景。" />
          <MyCard title="视频画面编辑" desc="可以使用给视频添加滤镜、贴纸、水印、涂鸦、字幕这五种功能。" />
          <MyCard title="视频时间编辑" desc="目前有包括视频变速、倒放两个功能。" />
          <MyCard title="视频声音混音" desc="支持对视频原生的声音进行静音、或者与其他一个或多个音频混音。" />
        </Row>
        <Row>
          <MyCard title="图片影集" desc="支持多张图片合成视频。" />
          <MyCard title="素材混拼" desc="支持图片 & GIF 图 & 视频混合拼成一段视频，此为七牛短视频 SDK 专业版功能。" />
          <MyCard title="功能扩展接口" desc="支持接入第三方的视频音频处理 SDK，主要用于对接特效类功能。" />
        </Row>
      </TabPane>
      <TabPane tab="高级美颜" value="3">
        456
      </TabPane>
      <TabPane tab="贴纸" value="4">
        456
      </TabPane>
      <TabPane tab="滤镜" value="5">
        456
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
