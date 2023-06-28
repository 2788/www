/**
 * @file 更易接入的低代码应用平台
 */

import React, { useEffect, useRef } from 'react'

import { Card, Row } from 'components/UI/Card'
import Button from 'components/UI/Button'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import { Solution, urlMap } from 'constants/solutions'
import { useMobile } from 'hooks/ua'
import Section from '../Section'
import Arrow from './arrow.svg'

import styles from './style.less'
import 'highlight.js/styles/a11y-light.css'

const iOSContent = `#import <QNLiveKit/QNLiveKit.h>

[QLive initWithToken:token serverURL:liveKitURL errorBack:errorBack];
[QLive setUser:avatar nick:nickname extension:extension];

QLiveListController *listVc = [QLiveListController new];
[self.navigationController pushViewController:listVc animated:YES];`

const androidContent = `import com.qlive.sdk.QLive

val config = QLiveConfig("serverURL")
QLive.init(appContext, config, tokenGetter)
QLive.auth(callback)
QLive.setUser(QUserInfo("your avatar", "your nick", extraInfo), callback)
QLive.getLiveUIKit().launch(context)`

export default function Code() {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()
  const iOSCodeRef = useRef<HTMLElement>(null)
  const androidCodeRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()
  const title = isMobile ? '三步上线专属互动直播应用' : '只要三步，快速上线专属互动直播应用'
  useEffect(() => {
    import('highlight.js').then(hljs => {
      if (iOSCodeRef.current) {
        hljs.default.highlightElement(iOSCodeRef.current)
      }
      if (androidCodeRef.current) {
        hljs.default.highlightElement(androidCodeRef.current)
      }
    })
  }, [])
  return (
    <Section title="快速集成" rootClassName={styles.section}>
      <Tabs defaultValue="1" shadow={false} contentClassName={styles.content}>
        <TabPane value="1" tab={<strong>iOS</strong>}>
          <pre className={styles.code}>
            <code ref={iOSCodeRef} className="language-objectivec" style={{ padding: 0 }}>{iOSContent}</code>
          </pre>
        </TabPane>
        <TabPane value="2" tab={<strong>Android</strong>}>
          <pre className={styles.code}>
            <code ref={androidCodeRef} className="language-java" style={{ padding: 0 }}>{androidContent}</code>
          </pre>
        </TabPane>
      </Tabs>
      <h3 className={styles.stepsTitle}>
        {title}
        <span className={styles.consult} onClick={showWechatConsultModal}>点我咨询</span>
      </h3>
      <Row>
        <Card className={styles.stepCard}><span className={styles.number}>01.</span>选择场景</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>02.</span>配置模版</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>03.</span>启动应用</Card>
      </Row>
      <Button type="primary" className={styles.btn} href={urlMap[Solution.Apaas]!}>查看更多</Button>
    </Section>
  )
}
