/**
 * @file rtc 应用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

// 适用场景用户案例 logo
import Scene1Img from './images/scene1.png'
import Scene2Img from './images/scene2.png'
import Scene3Img from './images/scene3.png'
import Scene4Img from './images/scene4.png'
import Scene5Img from './images/scene5.png'

import styles from './style.less'

export default function RtcScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="社交" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene1Img} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>支持主播之间互相连麦或主播观众连麦，提供美颜、滤镜、大眼、瘦脸等功能，满足趣味性互动。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>秀场直播、 唱吧直播、 脱口秀</li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="互动会议" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene2Img} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>支持小团队线上交流和大型在线会议，利用七牛的实时音视频互动技术可以轻松做出一款类似 WebEx 的应用。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>传统视频会议、 新型网络会议、 大型直播会议、 电话或音频会议</li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="远程医疗" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene3Img} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>支持远程多方视频会诊，突破医疗资源的地域限制，以及系统平台限制，提高医患时间地域灵活性，降低诊断成本。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>远程协同、 远程会诊、 手术教学</li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene4Img} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>支持远程多方视频会诊，突破医疗资源的地域限制，以及系统平台限制，提高医患时间地域灵活性，降低诊断成本。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>远程协同、 远程会诊、 手术教学</li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="在线客服" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene5Img} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>支持远程多方视频会诊，突破医疗资源的地域限制，以及系统平台限制，提高医患时间地域灵活性，降低诊断成本。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>远程协同、 远程会诊、 手术教学</li>
          </ul>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
