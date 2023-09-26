/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'
import QRCode from 'qrcode.react'
import { observer } from 'mobx-react'

import { RegistrationButton } from '../RegistrationButton'
import styles from './style.less'

export interface Props {
}

function RegistrationRules() {
  interface Block {
    title: string
    content: string[]
  }

  const data: Block[] = [
    {
      title: '参赛对象',
      content: [
        '国内外大学本科、研究生在读学生'
      ]
    },
    {
      title: '报名规则',
      content: [
        '本次比赛优先鼓励组队参加，同时也开放个人报名通道，每队人数限 1 - 3 人，1 人只能加入 1 个团队。',
        '每个参赛选手都需填写报名表单，并需要提供有效学生身份证明，国内院校请提供学信网学籍验证码，海外院校请提供有效证明材料，不接受非学生身份人士报名。',
        '报名截止时间：10月31日 23:59'
      ]
    }
  ]

  const renderBlock = (item: Block) => (
    <div className={styles.rule} key={item.title}>
      <div className={styles.title}>{item.title}</div>
      <ol className={styles.content}>
        {item.content.map((p, index) => (<li key={index}>{p}</li>))}
      </ol>
    </div>
  )

  return (
    <div className={styles.registrationRules}>
      {data.map(renderBlock)}
    </div>
  )
}

export default observer(function ActivityEntry(_props: Props) {
  return (
    <p className={styles.root}>
      <div className={styles.registrationRulesRoot}>
        <RegistrationRules />
        <div className={styles.footer}>
          <RegistrationButton />
        </div>
      </div>
      <div className={styles.contact}>
        <div className={styles.qrCodeWrap}>
          <QRCode
            className={styles.qrCode}
            value="https://work.weixin.qq.com/u/vc82eaeea333cebe41?v=4.0.8.94814"
            renderAs="svg"
            fgColor="#333"
          />
        </div>
        <div className={styles.desc}>
          大赛相关问题请扫描二维码咨询小助手
        </div>
      </div>
    </p>
  )
})
