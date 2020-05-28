/**
 * @file pili应用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock,
  ClientGroup as SceneClientGroup,
  ClientItem as SceneClientItem
} from 'components/Product/Scene'

// 适用场景用户案例 logo
import Customer17Icon from './images/customer-17.png'
import CustomerBilibiliIcon from './images/customer-bilibili.png'
import CustomerBlueIcon from './images/customer-blue.png'
import CustomerPinganIcon from './images/customer-pingan.png'
import CustomerTaquIcon from './images/customer-taqu.png'
import CustomerTebaobaoIcon from './images/customer-tebaobao.png'
import CustomerWeipaiIcon from './images/customer-weipai.png'

import Scene1Img from './images/scene1.svg'
import Scene2Img from './images/scene2.svg'
import Scene3Img from './images/scene3.svg'

import styles from './style.less'

export default function PiliScene() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="电商业务" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene1Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>互联网的蓬勃发展以及线下电商转型的诉求越发突出，电子商务不再受限于某一个公司，真正成为一个领域。伴随着内容电商的火热发展，
              越来越多在内容以及产品上深入沉淀的企业对底层服务的需求越来越高。七牛云为各位电商客户提供了端到端的应用解决方案并提供了业务 24*7 的支持保障服务，为客户服务保驾护航。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>客户案例</p>
            <SceneClientGroup>
              <SceneClientItem>
                <img src={CustomerWeipaiIcon} className={styles.clientLogo} title="微拍堂" alt="微拍堂" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={CustomerTaquIcon} className={styles.clientLogo} title="他趣" alt="他趣" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={CustomerTebaobaoIcon} className={styles.clientLogo} title="特抱抱" alt="特抱抱" />
              </SceneClientItem>
            </SceneClientGroup>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="娱乐互动业务" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene2Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>基于社会文娱产业的发展，当代消费认知观念发生改变，人们的娱乐消费内容和消费方式产生了重大变化，通过实时连麦工具，
              主播与观众发起互动内容对业务形态产生更多元的价值，七牛的 <span className={styles.emphasis}>云导播台</span> 也成为一站式娱乐直播的便利性提供了强有力的保障。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>客户案例</p>
            <SceneClientGroup>
              <SceneClientItem>
                <img src={Customer17Icon} className={styles.clientLogo} title="17 Media" alt="17 Media" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={CustomerBilibiliIcon} className={styles.clientLogo} title="bilibili" alt="bilibili" />
              </SceneClientItem>
              <SceneClientItem>
                <img src={CustomerBlueIcon} className={styles.clientLogo} title="blued" alt="blued" />
              </SceneClientItem>
            </SceneClientGroup>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="在线教育" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene3Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock shadow>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneTitle}>场景描述</p>
            <p className={styles.sceneContent}>利用互联网音视频技术，在线教育解决了优质教育资源传递的时空限制。
              七牛智能视频云助力用户打造集直播课堂、实时互动、点播回放、智能视频标签、智能视频推荐等功能为一体的在线教育平台，同时也为开发者开放了专业稳定的推流推流、转码、分发、播放等服务。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>客户案例</p>
            <SceneClientGroup>
              <SceneClientItem>
                <img src={CustomerPinganIcon} className={styles.clientLogo} title="中国平安" alt="中国平安" />
              </SceneClientItem>
            </SceneClientGroup>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
