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
import Scene1Img from './images/scene1.svg'
import Scene2Img from './images/scene2.svg'
import Scene3Img from './images/scene3.svg'
import Scene4Img from './images/scene4.svg'
import Scene5Img from './images/scene5.svg'

import styles from './style.less'

export default function RtcScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="社交" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene1Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>支持主播之间互相连麦或主播观众连麦，提供美颜、滤镜、大眼、瘦脸等功能，满足趣味性互动。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>秀场直播、 唱吧直播、 脱口秀</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="互动会议" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene2Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>大文件下载优化加速分发，例如：apk、mp3、exe、zip 等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛CDN 在全球数千个节点，让用户在下载过程中获得更快的下载速度。</li>
              <li className={styles.item}>并利用分段缓存技术提高了大文件下载传输的稳定性。</li>
              <li className={styles.item}>配合七牛云-存储服务一起使用，可有效降低回源和存储成本。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="远程医疗" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene3Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>音视频点播优化加速服务，例如：mp4、flv、rmvb、wmv、hls等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛CDN 利用BGP 网络中间源技术降低回源带宽压力节省了用户回源成本。</li>
              <li className={styles.item}>分段预取技术使用户在浏览音视频时更加的流畅。</li>
              <li className={styles.item}>高级防盗链技术有效防止用户文件被盗用。</li>
              <li className={styles.item}>配合七牛云-数据处理服务，还可以进行音视频转码、转格式、压缩等数据处理服务。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene4Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>音视频点播优化加速服务，例如：mp4、flv、rmvb、wmv、hls等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛CDN 利用BGP 网络中间源技术降低回源带宽压力节省了用户回源成本。</li>
              <li className={styles.item}>分段预取技术使用户在浏览音视频时更加的流畅。</li>
              <li className={styles.item}>高级防盗链技术有效防止用户文件被盗用。</li>
              <li className={styles.item}>配合七牛云-数据处理服务，还可以进行音视频转码、转格式、压缩等数据处理服务。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="在线客服" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene5Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>音视频点播优化加速服务，例如：mp4、flv、rmvb、wmv、hls等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛CDN 利用BGP 网络中间源技术降低回源带宽压力节省了用户回源成本。</li>
              <li className={styles.item}>分段预取技术使用户在浏览音视频时更加的流畅。</li>
              <li className={styles.item}>高级防盗链技术有效防止用户文件被盗用。</li>
              <li className={styles.item}>配合七牛云-数据处理服务，还可以进行音视频转码、转格式、压缩等数据处理服务。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
