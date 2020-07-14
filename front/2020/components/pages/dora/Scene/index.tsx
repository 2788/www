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

import Scene1Icon from './images/应用场景-社交电商.png'
import Scene2Icon from './images/应用场景-在线视频.png'
import Scene3Icon from './images/应用场景-泛娱乐.png'
import Scene4Icon from './images/应用场景-在线教育.png'

import styles from './style.less'

export default function DoraScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="社交电商" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene1Icon} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>社交电商</p>
          <p className={styles.sceneContent}>针对 B2C 电商类场景，提供包括图片处理、水印、转码、智能标签、智能识别等一站式媒体资源处理解决方案。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>能够解决的问题</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>
              <span className={styles.title}>图片/视频水印</span>
              <p className={styles.content}>全站 HTTPS 保证网站访问安全；TCP 压缩优化使网页大图、样式等完成秒级加载，缩短网页响应时间提高用户体验。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>音视频转码</span>
              <p className={styles.content}>提供全面的转码服务，支持多码率、多终端播放，为用户提供流畅清晰的观看体验。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>图片处理</span>
              <p className={styles.content}>提供高可用、高质量的图片处理服务，如图片压缩、裁剪、转码、水印、瘦身等，满足多种业务场景下的图片需求。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>智能识别</span>
              <p className={styles.content}>针对大量的图片和视频，提供鉴黄、鉴政、鉴暴恐等多种类型的敏感内容审核服务，有效识别违禁图片，规避违规风险，降低人工审核成本。</p>
            </li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="在线视频" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene2Icon} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>针对短视频、长视频、直播等应用，为海量在线视频提供自动化转码、智能封面、智能标签及智能识别等功能，提供更稳当、更流畅的播放体验。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>能够解决的问题</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>
              <span className={styles.title}>个性化转码模板</span>
              <p className={styles.content}>转码覆盖主流格式，支持自定义个性化转码模板，灵活满足客户各种定制化的场景需求。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>视频瘦身</span>
              <p className={styles.content}>在相同的视频画质下，码率更低，同时降低宽带成本，并可通过视频增强处理，达到更优的观看效果。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>智能标签</span>
              <p className={styles.content}>识别视频内容，智能生成有价值的标签，提升检索的成功率以及推荐的准确率。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>智能集锦</span>
              <p className={styles.content}>通过对视频内容的全面分析，对视频进行关键点识别，智能生成视频精彩集锦。</p>
            </li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="泛娱乐" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene3Icon} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>针对泛娱乐中的直播、游戏提供解决方案，包括直播内容封面、游戏视频的精彩片段剪辑、智能识别等功能，为泛娱乐用户提供完善的视频服务。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>能够解决的问题</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>
              <span className={styles.title}>降低成本</span>
              <p className={styles.content}>提供视频瘦身服务，节省流量，成本降低 20% - 30%。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>视频转码</span>
              <p className={styles.content}>转码同时，可以快速实现视频资源的转分辨率、转封装格式、增加水印操作。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>智能封面</span>
              <p className={styles.content}>通过对直播内容的全面分析，智能推荐更吸引用户的视频封面。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>智能集锦</span>
              <p className={styles.content}>针对不同类型的直播和游戏进行训练，提取精彩画面特征数据，智能剪辑精彩片段。</p>
            </li>
          </ul>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <img className={styles.sceneIcon} src={Scene4Icon} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer}>
          <p className={styles.sceneTitle}>场景描述</p>
          <p className={styles.sceneContent}>具备强大的视频转码功能，可针对多端教学生成不同规格的视频，给用户极致的观看体验；
            完备的 DRM 加密功能，对视频本身进行加密，可保护您的教学内容不被外泄。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>能够解决的问题</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>
              <span className={styles.title}>音视频转码</span>
              <p className={styles.content}>提供全面的转码服务，保证视频内容快速转码、流畅播放，满足节省宽带和流量的同时，提升用户体验。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>品牌宣传</span>
              <p className={styles.content}>支持对输出视频添加水印，保护视频产品和宣传品牌价值。</p>
            </li>
            <li className={styles.item}>
              <span className={styles.title}>版权保护</span>
              <p className={styles.content}>针对拥有版权的音视频及图片，不仅支持对资源添加图片和文字水印 ，还拥有 DRM 加密、防盗链、链接鉴权功能。</p>
            </li>
          </ul>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
