/**
 * @file 存储适用场景 index.tsx
 * @description 包含存储适用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock,
  ClientGroup as SceneClientGroup,
  ClientItem as SceneClientItem
} from '../../../../components/Product/Scene'

import SceneIconFile from './scene-icon-file.svg'

// 适用场景用户案例 logo
// 用于测试，后面可以移除
import clientIconChangBaURL from './client-icon-changba.png'
import clientIconChinaMobileURL from './client-icon-chinamobile.png'
import clientIconPingAnURL from './client-icon-pingan.png'
import clientIconSFURL from './client-icon-sf.png'

import styles from './style.less'

export default function KodoScene() {
  return (
    <Scene name="scene" title="适用场景" grey>
      <ScenePanel name="scene-tab-1" title="私有云存储" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>企业客户可以选择私有化部署七牛云对象存储系统。基于公有云存储的经验积累，私有云存储解决方案具备高可靠、强安全、易扩展等特性。同时还能提供成熟的系统管理和运维，让企业以更低廉的产品及维护成本，满足在容量、性能及稳定性上的需求。</p>
            {/* 客户案例 logo 墙，用于测试，后面可以移除 */}
            <p className={classnames(styles.sceneTitle, styles.client)}>客户案例</p>
            <SceneClientGroup>
              <SceneClientItem>
                <img src={clientIconChangBaURL} className={styles.clientLogo} title="唱吧" alt="唱吧" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={clientIconChinaMobileURL} className={styles.clientLogo} title="中国移动" alt="中国移动" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={clientIconPingAnURL} className={styles.clientLogo} title="中国平安" alt="中国平安" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={clientIconSFURL} className={styles.clientLogo} title="顺丰速运" alt="顺丰速运" />
              </SceneClientItem>
            </SceneClientGroup>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="多媒体数据处理" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>针对有海量用户生成内容的场景，七牛云对象存储服务的高并发能力使您灵活应对大流量的业务场景。您可以对存储在云端的图片、音视频等文件进行数据处理。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="内容加速分发" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>面对视频、游戏等热点资源分发的业务场景，您可以使用七牛云对象存储作为源站，搭配七牛云 CDN 进行加速分发，方便您通过 CDN 节点就近访问资源，提升用户体验。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="海量数据高并发" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云针对海量数据高并发的场景做了深度优化，实现了对象存储访问协议到 HDFS 协议的转换。相较于传统 Hadoop 方案，用户可获得更优的读取、分析性能，更强的稳定性和更好的扩展性。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="备份和归档" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云提供高可用和高可靠的存储解决方案来备份和归档用户的关键数据，用户可以设置不同的访问权限和级别，保障数据访问安全。相较于传统自建方案，用户无需采购高昂硬件，无需担心扩容、安全等问题，从而节省更多的存储、维护、人力成本。</p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-6" title="静态资源托管" verticalCenter>
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

      <ScenePanel name="scene-tab-7" title="边缘存储" verticalCenter>
        <SceneBlock blockType="fixed">
          <SceneIconFile className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>七牛云边缘存储服务在大规模边缘节点和用户侧部署服务，加速数据存储至边缘，并最终将持久化数据保存至中心，有效解决数据上传链路差，带宽利用率低等行业痛点，降低本地存储成本。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
