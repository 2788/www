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
import { RecommendCert } from '../Recommend/cert'
import { certForCompanySite, certForCompanyApp, certForApi, certForPay, certForGov } from '../Recommend/type'

// 适用场景用户案例 logo
import Scene1Img from './images/scene1.svg'
import Scene2Img from './images/scene2.svg'
import Scene3Img from './images/scene3.svg'
import Scene4Img from './images/scene4.svg'
import Scene5Img from './images/scene5.svg'

import styles from './style.less'

export default function SslScene() {
  return (
    <Scene name="scene" title="行业场景">
      <ScenePanel name="scene-tab-1" title="企业网站" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene1Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneContent}>启用企业网站全站 HTTPS 安全加密，激活绿色安全标识（DV/OV）或地址栏企业名称标识（EV），为潜在客户带来更可信、更放心的访问体验，
              极大增强企业诚信力和用户信赖感，有效提升成单率。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>推荐版本</p>
            <RecommendCert {...certForCompanySite} />
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="企业应用" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene2Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneContent}>越来越多的企业将 OA、CRM、ERP 等企业应用系统部署于云端，享受云计算的高效和便捷性。
              而升级为 HTTPS 安全加密，可进一步提升系统安全性，确保敏感信息不被劫持。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>推荐版本</p>
            <RecommendCert {...certForCompanyApp} />
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="政务信息" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene3Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneContent}>公信力是政务平台要打造的最重要特性。而越来越多的钓鱼欺诈网站和信息劫持手段，对政务平台的信息安全带来严重威胁。
              启用权威认证的 SSL 证书能最大化保障信息安全和网站公信力。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>推荐版本</p>
            <RecommendCert {...certForGov} />
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="支付体系" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene4Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneContent}>支付环节是用户最敏感也最容易受到安全威胁的部分，极易成为不法用户信息劫持和伪装欺诈的重要目标。
              因此，实现网站支付环节的 HTTPS 信息传输加密，已经成为各大网站的标配。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>推荐版本</p>
            <RecommendCert {...certForPay} />
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="API 接口" verticalCenter>
        <SceneBlock blockType="fixed">
          <Scene5Img className={styles.sceneIcon} />
        </SceneBlock>
        <SceneBlock>
          <div className={styles.sceneContainer}>
            <p className={styles.sceneContent}>API 接口是第三方网站进行信息交互的重要形式，因为大多涉及敏感信息或重要操作指令的传输，因此其安全性至关重要。
              使用 SSL 证书进行信息传输的高强度加密，可有效杜绝信息劫持。</p>
            <p className={classnames(styles.sceneTitle, styles.client)}>推荐版本</p>
            <RecommendCert {...certForApi} />
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
