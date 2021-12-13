/**
 * @file: 音画质量分析 适用场景
 */

import React from 'react'
import Scene, { Block, Panel } from 'components/Product/Scene'
import icon1 from './icon1.png'
import icon2 from './icon2.png'
import icon3 from './icon3.png'
import icon4 from './icon4.png'
import styles from './style.less'

export default function Scenes() {
  const dataList = [
    {
      img: icon1,
      title: '质量监控',
      content: '多媒体资源相关质量的实时或离线监控，精准定位多媒体资源具体的质量问题并及时地报警。'
    },
    {
      img: icon2,
      title: '资源质检',
      content: '对 PGC/UGC 内容进行质检，可及时反馈给用户，改善输入端原始资源质量。'
    },
    {
      img: icon3,
      title: '内容筛选',
      content: '可以在大规模的音视频资源中筛选出低质内容，节省人力成本。'
    },
    {
      img: icon4,
      title: '质量优化',
      content: '获取音视频相关的质量指标，定位质量问题，便于确定优化策略并精准地提高音视频质量。'
    }
  ]

  const sceneList = dataList.map((({ img, title, content }, index) => (
    <Panel key={index} name={String(index)} title={title}>
      <Block blockType="fixed">
        <img className={styles.sceneIcon} src={img} alt={title} />
      </Block>
      <Block>
        <p className={styles.sceneTitle}>{title}</p>
        <p className={styles.sceneContent}>{content}</p>
      </Block>
    </Panel>
  )))

  return (
    <Scene name="scenes" title="适用场景">
      {sceneList}
    </Scene>
  )
}
