/**
 * @file: 视频智能分析 适用场景
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Scene, { Block, Panel } from 'components/Product/Scene'
import sceneImg1 from 'components/pages/vii/Scene/scene1.png'
import sceneImg2 from 'components/pages/vii/Scene/scene2.png'
import sceneImg3 from 'components/pages/vii/Scene/scene3.png'
import sceneImg4 from 'components/pages/vii/Scene/scene4.png'
import styles from './style.less'

export default function Scenes() {
  const dataList = [
    {
      key: 'scene-tab-1',
      img: sceneImg1,
      title: '视频内容分析',
      content: '通过对视频内容进行智能分析，可高效理解海量视频内容信息，帮助实现多媒体的管理，提升用户体验，降低人工成本。'
    },
    {
      key: 'scene-tab-2',
      img: sceneImg2,
      title: '视频分类',
      content: '通过结构化标签提取和语音识别等技术，实现视频的精准分类管理。'
    },
    {
      key: 'scene-tab-3',
      img: sceneImg3,
      title: '视频检索',
      content: '通过快速为视频生成热门的泛标签，解决视频缺乏关键词而无法露出或检索困难的问题，提升用户检索体验，帮助提升视频的曝光率。'
    },
    {
      key: 'scene-tab-4',
      img: sceneImg4,
      title: '智能推荐',
      content: '通过自动抽取视频内容的结构化标签，有效解决新视频冷启动的推荐问题，实现精准个性化的内容推荐。'
    }
  ]

  const sceneList = dataList.map((({ key, img, title, content }) => (
    <Panel key={key} name={key} title={title}>
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
    <Scene name="scene" title="适用场景">
      {sceneList}
    </Scene>
  )
}
