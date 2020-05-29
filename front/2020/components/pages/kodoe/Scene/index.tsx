/**
 * @file 私有云存储应用场景 index.tsx
 * @description 包含私有云存储应用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import sceneImgOne from './scene1.png'
import sceneImgTwo from './scene2.png'
import sceneImgThree from './scene3.png'
import sceneImgFour from './scene4.png'

import styles from './style.less'

export default function KodoeScene() {
  return (
    <Scene name="scene" title="应用场景" header="应用场景" grey>
      <ScenePanel name="scene-tab-1" title="海量通用文件存储" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={sceneImgOne} className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景特点</p>
            <p className={styles.sceneContent}>
              为企业提供了安全、可靠的数据存储服务，
              适用于静态网页、图片、音视频、文档、日志、影像等各种类型文件的存储，
              支持用户通过控制台、 API、SDK 等各种方式进行读写。
            </p>
            <p className={styles.sceneContent}>
              同时支持无限水平扩展，且在存储容量水平扩展时，
              数据存取的性能线性提升。相较于块存储，
              可以更好地满足企业海量数据的存储和访问需求，同时节约了大量的存储成本。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="数据分析与挖掘" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={sceneImgTwo} className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景特点</p>
            <p className={styles.sceneContent}>
              对象存储作为海量数据存储池，将会与平台上的计算资源紧密整合，
              尤其是大数据平台（如 Hadoop、Spark、Storm 等），
              从而实现高性能、低成本的数据分析与挖掘，提升企业数据价值。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="数据备份" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={sceneImgThree} className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景特点</p>
            <p className={styles.sceneContent}>
              可以无限扩展的存储空间、快速的数据存取性能、高度的可靠性和安全性、
              细粒度的权限控制、简单易用的接口以及完善的解决方案来帮助企业用户备份与管理自己的数据。
            </p>
            <p className={styles.sceneContent}>
              通过对象存储服务进行数据备份，企业可以节约更多的本地的存储成本、维护成本和人力资源成本。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="多媒体数据处理" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={sceneImgFour} className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景特点</p>
            <p className={styles.sceneContent}>
              集成七牛云 AI 、图片、音视频等多媒体数据处理服务。同时支持自定义数据处理应用，兼容接口协议即可集成。
            </p>
            <p className={styles.sceneContent}>
              只需在文件的访问 URL 之后附加上对应的处理命令以及请求参数，即可实现对存储数据灵活的访问并完成加工处理。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
