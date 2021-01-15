/**
 * @file: 低延时直播 Geek 应用场景
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Scene, { Block, Panel } from 'components/Product/Scene'

import styles from './style.less'

import imgScene1 from './scene1.png'
import imgScene2 from './scene2.png'
import imgScene3 from './scene3.png'

export default function SceneList() {
  const SceneHeader = (
    <>
      适用场景
      <p className={styles.sceneHeader}>
        基于微信场景下，私域流量以及各类直播业务进行了服务升级，将起播延时控制在 1s 以内
      </p>
    </>
  )

  return (
    <Scene name="scene" title="适用场景" header={SceneHeader}>
      <Panel name="scene-tab-1" title="电商类">
        <Block blockType="fixed">
          <img className={styles.sceneIcon} src={imgScene1} alt="电商类" />
        </Block>
        <Block>
          <p className={styles.sceneTitle}>电商类</p>
          <p className={styles.sceneContent}>全民电商时代，保证画面清晰度的同时提供了更低延时的服务，抢购加单统统不是问题。</p>
        </Block>
      </Panel>
      <Panel name="scene-tab-2" title="教育类">
        <Block blockType="fixed">
          <img className={styles.sceneIcon} src={imgScene2} alt="教育类" />
        </Block>
        <Block>
          <p className={styles.sceneTitle}>教育类</p>
          <p className={styles.sceneContent}>支持大房间教学模式产生的高频互动场景，毫秒级延迟下保证学生老师之间的沟通质量。</p>
        </Block>
      </Panel>
      <Panel name="scene-tab-3" title="互动娱乐">
        <Block blockType="fixed">
          <img className={styles.sceneIcon} src={imgScene3} alt="互动娱乐" />
        </Block>
        <Block>
          <p className={styles.sceneTitle}>互动娱乐</p>
          <p className={styles.sceneContent}>无论是户外或者是室内互动直播场景，加强后的反馈互动体验，观众与主播无限接近于“零距离”。</p>
        </Block>
      </Panel>
    </Scene>
  )
}
