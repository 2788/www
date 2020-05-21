/**
 * @file dora 适用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import SceneIconFile from './scene-icon-file.svg'

import styles from './style.less'

export default function DoraFuctions() {
  return (
    <Scene name="functions" title="产品功能" grey>
      <ScenePanel name="scene-tab-1" title="图片处理" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <div className={styles.sceneCard}>
              <h5 className={styles.title}>图片瘦身</h5>
              <a className={styles.link}>立即试用 &gt;&gt;</a>
              <p className={styles.content}>支持对 PNG、JPG 图片实时压缩，缩小图片体积，节省流量，提升产品体验。</p>
            </div>
            <div className={styles.sceneCard}>
              <h5 className={styles.title}>图片瘦身</h5>
              <a className={styles.link}>立即试用 &gt;&gt;</a>
              <p className={styles.content}>支持对 PNG、JPG 图片实时压缩，缩小图片体积，节省流量，提升产品体验。</p>
            </div>
            <div className={styles.sceneCard}>
              <h5 className={styles.title}>图片瘦身</h5>
              <a className={styles.link}>立即试用 &gt;&gt;</a>
              <p className={styles.content}>支持对 PNG、JPG 图片实时压缩，缩小图片体积，节省流量，提升产品体验。</p>
            </div>
            <div className={styles.sceneCard}>
              <h5 className={styles.title}>图片瘦身</h5>
              <a className={styles.link}>立即试用 &gt;&gt;</a>
              <p className={styles.content}>支持对 PNG、JPG 图片实时压缩，缩小图片体积，节省流量，提升产品体验。</p>
            </div>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="音视频处理" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>针对有海量用户生成内容的场景，七牛云对象存储服务的高并发能力使您灵活应对大流量的业务场景。
              您可以对存储在云端的图片、音视频等文件进行数据处理。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="智能识别" verticalCenter>
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

      <ScenePanel name="scene-tab-4" title="视频分析" verticalCenter>
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

      <ScenePanel name="scene-tab-5" title="音频画质分析" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云提供高可用和高可靠的存储解决方案来备份和归档用户的关键数据，用户可以设置不同的访问权限和级别，
              保障数据访问安全。相较于传统自建方案，用户无需采购高昂硬件，无需担心扩容、安全等问题，从而节省更多的存储、维护、人力成本。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-6" title="自定义数据处理" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云无缝集合各类第三方扩展插件，如 WordPress、Discuz、Emlog 等，并支持一键将各类插件里的静态资源托管到七牛。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-7" title="智能审核" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云边缘存储服务在大规模边缘节点和用户侧部署服务，加速数据存储至边缘，并最终将持久化数据保存至中心，
              有效解决数据上传链路差，带宽利用率低等行业痛点，降低本地存储成本。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-8" title="版权保护" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云边缘存储服务在大规模边缘节点和用户侧部署服务，加速数据存储至边缘，并最终将持久化数据保存至中心，
              有效解决数据上传链路差，带宽利用率低等行业痛点，降低本地存储成本。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
