import React from 'react'
import Section from 'components/Product/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'

import style from './style.less'

// TODO 移动端适配
export default function Feature() {
  return (
    <Section title="产品功能" name="features">
      <Tabs value="1">
        <TabPane tab="拍摄" value="1">
          <div className={style.card}>
            <div>拍摄设置</div>
            <div>视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点</div>
          </div>
          <div className={style.card}>
            <div>拍摄设置</div>
            <div>视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点</div>
          </div>
          <div className={style.card}>
            <div>拍摄设置</div>
            <div>视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点</div>
          </div>
          <div className={style.card}>
            <div>拍摄设置</div>
            <div>视频及音频的采集、编码参数设置，拍摄时长、前后摄像头、闪光灯、镜像、对焦等细节功能点</div>
          </div>
        </TabPane>
        <TabPane tab="编辑" value="2">
          456
        </TabPane>
        <TabPane tab="功能扩展接口" value="3">
          123
        </TabPane>
      </Tabs>
    </Section>
  )
}
