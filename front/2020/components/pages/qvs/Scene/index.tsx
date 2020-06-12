/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Tue May 19 2020
 * @file: 应用场景
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import scene1 from './images/01.png'
import scene2 from './images/02.png'
import scene3 from './images/03.png'
import scene4 from './images/04.png'
import scene5 from './images/05.png'
import scene6 from './images/06.png'

import style from './style.less'

export default function PlsvScene() {
  return (
    <Scene name="scene" title="应用场景" defaultActive="scene-tab-1">
      <ScenePanel name="scene-tab-1" title="新零售" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene1} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>设备统一接入云平台，快速建立可视化的视频流管理平台。</p>
            <p className={style.sceneContent}>根据业务需要，按需实时观看、按需存储、按需回放历史数据。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-2" title="安保连锁" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene2} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>实现视频资源整合共享，破除信息孤岛实现互联互通。</p>
            <p className={style.sceneContent}>云端数据统一汇聚，全国业务一张网。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-3" title="智能家电" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene3} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>具备视频能力的家电产品接入视频云服务，打造家电产品视频生态圈。</p>
            <p className={style.sceneContent}>提升家电产品的使用体验，引爆产品销量。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-4" title="智慧工地" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene4} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>远程管理工地，提前预警。</p>
            <p className={style.sceneContent}>保障工人安全，提升监管层次。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-5" title="明厨亮灶" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene5} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>数据统一汇聚便利政府监管，提升商家形象，为消费者饮食安全护航。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-6" title="智慧社区" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene6} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景描述</p>
            <p className={style.sceneContent}>物业管理更便捷，业主安全感提升，访客行为可追踪。</p>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
