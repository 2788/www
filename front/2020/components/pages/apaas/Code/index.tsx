/**
 * @file 更易接入的低代码应用平台
 */

import React from 'react'

import { Card, Row } from 'components/UI/Card'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { useMobile } from 'hooks/ua'
import Section from 'components/Product/Section'
import CodeArea from 'components/UI/Code'
import Arrow from './arrow.svg'

import styles from './style.less'

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
  const isMobile = useMobile()
  const title = isMobile ? '三步上线专属互动直播应用' : '只要三步，快速上线专属互动直播应用'
  return (
    <Section name="code" title="快速集成">
      <Tabs defaultValue="1" shadow={!isMobile} contentClassName={styles.content}>
        <TabPane value="1" tab={<strong>iOS</strong>}>
          <pre className={styles.codeWrapper}>
            <CodeArea code={iOSContent} language="language-objectivec" className={styles.code} />
          </pre>
        </TabPane>
        <TabPane value="2" tab={<strong>Android</strong>}>
          <pre className={styles.codeWrapper}>
            <CodeArea code={androidContent} language="language-java" className={styles.code} />
          </pre>
        </TabPane>
      </Tabs>
      <h3 className={styles.stepsTitle}>
        {title}
      </h3>
      <Row className={styles.stepCardWrapper}>
        <Card className={styles.stepCard}><span className={styles.number}>01.</span>选择场景</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>02.</span>配置模版</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>03.</span>启动应用</Card>
      </Row>
    </Section>
  )
}
