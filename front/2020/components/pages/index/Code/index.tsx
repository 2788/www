/**
 * @file 更易接入的低代码应用平台
 */

import React from 'react'

import { Card, Row } from 'components/UI/Card'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { useMobile } from 'hooks/ua'
import Section from '../Section'
import Arrow from './arrow.svg'

import styles from './style.less'

const iOSContent = `//初始化SDK  errorBack错误回调，可在此处更新过期的token
[QLive initWithToken:token serverURL:@"liveKit域名" errorBack:nil];
//绑定自己服务器的头像和昵称 
[QLive setUser:user.avatar nick:user.nickname extension:nil];

//进入直播列表
QLiveListController *listVc = [QLiveListController new];
[self.navigationController pushViewController:listVc animated:YES];`

const androidContent = `//初始化
QLive.init(context ,new QTokenGetter(){
        //业务请求token的方法 
        void getTokenInfo( QLiveCallBack<String> callback){
             //当token过期后如何获取token
            GetTokenApi.getToken(callback);
        }
});
//登陆 
QLive.auth(new QLiveCallBack<Void>{})

Map ext = new HashMap()
ext.put("vip","1"); // 自定义vip等级

//绑定业务端的用户信息
QLive.setUser(new QUserInfo( "your avatar","your nickname", ext) ,new QLiveCallBack<Void>{});
QliveUIKit liveUIKit = QLive.getLiveUIKit()
//开启
liveUIKit.launch(context);`
export default function Code() {
  const isMobile = useMobile()
  const title = isMobile ? '三步上线专属互动直播应用' : '只要三步，快速上线专属互动直播应用'
  return (
    <Section title="更易接入的低代码应用平台" rootClassName={styles.section}>
      <Tabs defaultValue="1" shadow={false} contentClassName={styles.content}>
        <TabPane value="1" tab={<strong>iOS</strong>}>
          <pre className={styles.code}>{iOSContent}</pre>
        </TabPane>
        <TabPane value="2" tab={<strong>Android</strong>}><pre className={styles.code}>{androidContent}</pre></TabPane>
      </Tabs>
      <h3 className={styles.stepsTitle}>
        {title}
        {/* TODO 咨询框改版后加上这个 */}
        {/* <Link as="button" className={styles.consult} onClick={startConsulting} blue>点我咨询</Link> */}
      </h3>
      <Row>
        <Card className={styles.stepCard}><span className={styles.number}>01.</span>选择场景</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>02.</span>配置模版</Card>
        <div className={styles.arrowWrapper}><Arrow /></div>
        <Card className={styles.stepCard}><span className={styles.number}>03.</span>启动应用</Card>
      </Row>
    </Section>
  )
}
