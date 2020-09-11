import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'

import Media from './Media'
import Picture from './Picture'
import File from './File'
import Custom from './Custom'
import Ocr from './Ocr'
import style from './index.less'

export default function PriceDetail() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane value="1" tab="音视频处理"><Media /></TabPane>
      <TabPane value="2" tab="图片处理"><Picture /></TabPane>
      <TabPane value="3" tab="文件处理"><File /></TabPane>
      <TabPane value="4" tab="自定义数据处理">
        <p className={style.alert}>选择 C1M1 的标准用户和高级用户，每月有 750 小时的免费额度</p>
        <Custom />
      </TabPane>
      <TabPane value="5" tab="票证自动识别"><Ocr /></TabPane>
    </Tabs>
  )
}
