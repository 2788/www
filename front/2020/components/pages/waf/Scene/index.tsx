import React from 'react'
import classnames from 'classnames'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import SceneImg1 from './images/scene1.svg'
import SceneImg2 from './images/scene2.svg'
import styles from './index.less'

export default function Scenes() {

  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-tab-1" title="基础场景" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.sceneImgBlock}>
          <SceneImg1 className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer} shadow>
          <p className={styles.sceneTitle}>Web 应用上云必备安全能力</p>
          <p className={styles.sceneContent}>
            提供七牛云独家 0-day 小时级自动防御，无需人工打补丁和修复、有效降低爬虫、挂马、黑客病毒、数据泄露、CC 攻击等造成网页、H5、APP、小程序等网站应用的风险。
          </p>
          <p className={classnames(styles.sceneTitle, styles.client)}>功能特性</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>防御常见 Web 攻击，如 SQL 注入、非授权访问、XSS 跨站脚本、CSRF 跨站请求伪造、Webshell 木马上传等。</li>
            <li className={styles.item}>0-day 漏洞通过虚拟补丁快速自动修复、无需改造代码。</li>
            <li className={styles.item}>自动拦截扫描及探测。</li>
          </ul>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-tab-2" title="混合云业务" verticalCenter>
        <SceneBlock blockType="fixed" className={styles.sceneImgBlock}>
          <SceneImg2 className={styles.sceneImg} />
        </SceneBlock>
        <SceneBlock className={styles.sceneContainer} shadow>
          <p className={styles.sceneTitle}>Web 应用防火墙混合云解决方案</p>
          <p className={styles.sceneContent}>通过七牛云 WAF 防护集群统一管理部署客户的云上（包括七牛云和非七牛云）、本地办公环境、专有云、线下 IDC、机房等多种安全环境。</p>
          <p className={classnames(styles.sceneTitle, styles.client)}>适用场景</p>
          <ul className={styles.sceneList}>
            <li className={styles.item}>客户拥有云上、云下多套环境，对时延敏感、可靠性要求高，需要多活容灾的业务防护。</li>
          </ul>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
