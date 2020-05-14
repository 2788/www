import React from 'react'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      <Menu mode="inline" level={-1}>
        <SubMenu mode="inline" title="拍摄">
          <MenuItem><Card title="拍摄设置" desc="视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点。" /></MenuItem>
          <MenuItem><Card title="拍摄方式" desc="正常拍摄、静音拍摄、音频录制、分段拍摄、分屏拍摄等功能。" /></MenuItem>
          <MenuItem><Card title="实时处理" desc="拍摄时可以使用内置实时美颜、实时滤镜。另外也支持贴纸、水印功能。" /></MenuItem>
          <MenuItem><Card title="背景音乐" desc="支持拍摄前预设背景音乐。" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="编辑">
          <MenuItem><Card title="素材导入" desc="从相册导入视频或图片。" /></MenuItem>
          <MenuItem><Card title="视频裁剪" desc="时长裁剪和画面裁剪这两个功能。" /></MenuItem>
          <MenuItem><Card title="视频旋转" desc="对视频的角度进行旋转调整，例如顺时针旋转 90 度。" /></MenuItem>
          <MenuItem><Card title="视频转场" desc="适用于 25 两个视频之间的转场功能，目前支持飞入飞出、淡入淡出、擦除等效果。" /></MenuItem>
          <MenuItem><Card title="视频合成" desc="包括视频拼接、视频拼图。视频拼接是指多个视频按前后排列的方式进行合成，视频拼图是指多个视频像拼图一样同时展现在屏幕上的情景。" /></MenuItem>
          <MenuItem><Card title="视频画面编辑" desc="可以使用给视频添加滤镜、贴纸、水印、涂鸦、字幕这五种功能。" /></MenuItem>
          <MenuItem><Card title="视频时间编辑" desc="目前有包括视频变速、倒放两个功能。" /></MenuItem>
          <MenuItem><Card title="视频声音混音" desc="支持对视频原生的声音进行静音、或者与其他一个或多个音频混音。" /></MenuItem>
          <MenuItem><Card title="图片影集" desc="支持多张图片合成视频。" /></MenuItem>
          <MenuItem><Card title="素材混拼" desc="支持图片 & GIF 图 & 视频混合拼成一段视频，此为七牛短视频 SDK 专业版功能。" /></MenuItem>
          <MenuItem><Card title="功能扩展接口" desc="支持接入第三方的视频音频处理 SDK，主要用于对接特效类功能。" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="高级美颜">
          <MenuItem><Card title="高级美颜" desc="美白、磨皮、锐化、大眼、瘦脸，强度可调节" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="贴纸">
          <MenuItem><Card title="贴纸" desc="可从特效君 APP 中挑选" /></MenuItem>
        </SubMenu>
        <SubMenu mode="inline" title="滤镜">
          <MenuItem><Card title="滤镜" desc="可从特效君 APP 中挑选" /></MenuItem>
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
