/**
 * @file ssl应用场景 index.tsx
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

export default function SslScene() {
  // todo： 修改推荐证书
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="网站加速" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene1Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>网页静态资源优化加速分发，例如：html、css、js、img、短视频等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>全站 HTTPS 保证网站访问安全； TCP 压缩优化使网页大图，样式等完成秒级加载，缩短网页响应时间提高用户体验。</li>
              <li className={styles.item}>配合七牛云-图片处理服务一起使用，还可以针对图片进行缩略、打水印，转格式等数据处理服务。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="超大文件下载" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene2Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>大文件下载优化加速分发，例如：apk、mp3、exe、zip 等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛 CDN 在全球数千个节点，让用户在下载过程中获得更快的下载速度。</li>
              <li className={styles.item}>并利用分段缓存技术提高了大文件下载传输的稳定性。</li>
              <li className={styles.item}>配合七牛云-存储服务一起使用，可有效降低回源和存储成本。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="音视频点播" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene3Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>音视频点播优化加速服务，例如：mp4、flv、rmvb、wmv、HLS 等。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>七牛 CDN 利用 BGP 网络中间源技术降低回源带宽压力节省了用户回源成本。</li>
              <li className={styles.item}>分段预取技术使用户在浏览音视频时更加的流畅。</li>
              <li className={styles.item}>高级防盗链技术有效防止用户文件被盗用。</li>
              <li className={styles.item}>配合七牛云-数据处理服务，还可以进行音视频转码、转格式、压缩等数据处理服务。</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="动态加速" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene4Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>动态加速针对动态资源进行加速分发，在电商、社交、社区论坛、金融支付和游戏娱乐等方面可以显著提升用户的访问性能。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>借助特有的动态路由探测技术和私有传输协议优化，可以保证客户源站的内容通过安全稳定的最优链路分发到用户端</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="全球加速" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene5Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>全球加速，源站在国内的场景</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>业务价值</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>跨国回源链路质量</li>
              <li className={styles.item}>海外低命中资源访问时，降低响应时间，提升下载速度</li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
