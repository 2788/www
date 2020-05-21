/**
 * @file dora 适用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import SceneIconFile from './scene-icon-file.svg'

import styles from './style.less'

export default function DoraScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="社交电商" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>社交电商</p>
            <p className={styles.sceneContent}>针对B2C电商类场景，提供包括图片处理、水印、转码、智能标签、智能识别等一站式媒体资源处理解决方案。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>能够解决的问题</p>
            <ul className={styles.sceneList}>
              <li className={styles.item}>
                <span className={styles.title}>图片/视频水印</span>
                <p className={styles.content}>全站 HTTPS 保证网站访问安全； TCP 压缩优化使网页大图，样式等完成秒级加载，缩短网页响应时间提高用户体验。</p>
              </li>
              <li className={styles.item}>
                <span className={styles.title}>音视频转码</span>
                <p className={styles.content}>提供全面的转码服务，支持多码率、多终端播放，为用户提供流畅清晰的观看体验</p>
              </li>
              <li className={styles.item}>
                <span className={styles.title}>图片处理</span>
                <p className={styles.content}>提供高可用、高质量的图片处理服务，如图片压缩、裁剪、转码、水印、瘦身等，满足多种业务场景下的图片需求</p>
              </li>
              <li className={styles.item}>
                <span className={styles.title}>智能识别</span>
                <p className={styles.content}>针对大量的图片和视频，提供鉴黄、鉴政、鉴暴恐等多种类型的敏感内容审核服务，有效识别违禁图片，规避违规风险，降低人工审核成本</p>
              </li>
            </ul>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="在线视频" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>针对B2C电商类场景，提供包括图片处理、水印、转码、智能标签、智能识别等一站式媒体资源处理解决方案。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="泛娱乐" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>面对视频、游戏等热点资源分发的业务场景，您可以使用七牛云对象存储作为源站，
              搭配七牛云 CDN 进行加速分发，方便您通过 CDN 节点就近访问资源，提升用户体验。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云针对海量数据高并发的场景做了深度优化，实现了对象存储访问协议到 HDFS 协议的转换。
              相较于传统 Hadoop 方案，用户可获得更优的读取、分析性能，更强的稳定性和更好的扩展性。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
