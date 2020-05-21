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

// 适用场景用户案例 logo
import case1_1 from './images/case1-1.png'
import case1_2 from './images/case1-2.png'
import case1_3 from './images/case1-3.png'
import case2_1 from './images/case2-1.png'
import case2_2 from './images/case2-2.png'
import case2_3 from './images/case2-3.png'
import case3_1 from './images/case3-1.png'
import case3_2 from './images/case3-2.png'
import case3_3 from './images/case3-3.png'
import case4_1 from './images/case4-1.png'
import case4_2 from './images/case4-2.png'
import case4_3 from './images/case4-3.png'
import case4_4 from './images/case4-4.png'

import scene1Img from './images/scene1.png'
import scene2Img from './images/scene2.png'
import scene3Img from './images/scene3.png'
import scene4Img from './images/scene4.png'

import style from './style.less'

export default function PlsvScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene1Img} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景特点</p>
            <p className={style.sceneContent}>聊天小视频、动漫配音秀、游戏精彩集锦等</p>
            <p className={style.sceneTitle}>客户案例</p>
            <figure>
              <img src={case1_1} />
              <figcaption>快看漫画</figcaption>
            </figure>
            <figure>
              <img src={case1_2} />
              <figcaption>腾讯动漫</figcaption>
            </figure>
            <figure>
              <img src={case1_3} />
              <figcaption>秀蛋</figcaption>
            </figure>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-2" title="电商购物" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene2Img} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景特点</p>
            <p className={style.sceneContent}>商品短视频、买家秀、商品点评等</p>
            <p className={style.sceneTitle}>客户案例</p>
            <figure>
              <img src={case2_1} />
              <figcaption>微拍堂</figcaption>
            </figure>
            <figure>
              <img src={case2_2} />
              <figcaption>聚美优品</figcaption>
            </figure>
            <figure>
              <img src={case2_3} />
              <figcaption>新氧</figcaption>
            </figure>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-3" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene3Img} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景特点</p>
            <p className={style.sceneContent}>短视频微课、学员作业展示</p>
            <p className={style.sceneTitle}>客户案例</p>
            <figure>
              <img src={case3_1} />
              <figcaption>一起学</figcaption>
            </figure>
            <figure>
              <img src={case3_2} />
              <figcaption>中舞网</figcaption>
            </figure>
            <figure>
              <img src={case3_3} />
              <figcaption>外贸米课圈</figcaption>
            </figure>
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-4" title="更多场景" verticalCenter>
        <SceneBlock blockType="fixed">
          <img src={scene4Img} className={style.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>场景特点</p>
            <p className={style.sceneContent}>制作、短视频资讯、视频看房、照片影集制作等</p>
            <p className={style.sceneTitle}>客户案例</p>
            <figure>
              <img src={case4_1} />
              <figcaption>咕咚</figcaption>
            </figure>
            <figure>
              <img src={case4_2} />
              <figcaption>自如</figcaption>
            </figure>
            <figure>
              <img src={case4_3} />
              <figcaption>浙江新闻</figcaption>
            </figure>
            <figure>
              <img src={case4_4} />
              <figcaption>蛋壳公寓</figcaption>
            </figure>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
