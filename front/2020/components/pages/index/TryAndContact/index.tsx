import React, { PropsWithChildren } from 'react'

import Button from 'components/UI/Button'
import Section from 'components/Product/Section'

import styles from './style.less'

interface PanelProps {
  title: string
  desc: string
}

export function Panel({ title, desc, children }: PropsWithChildren<PanelProps>) {
  return (
    <div className={styles.panel}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.desc}>{desc}</p>
      {children}
    </div>
  )
}

export default function TryAndContact() {
  return (
    <Section className={styles.tryAndContant} title="" name="">
      <Panel
        title="免费体验，知晓更多产品信息"
        desc="根据我们的操作提示，只需要点击几次鼠标，即可创建产品。"
      >
        <Button type="primary">马上体验</Button>
      </Panel>
      <Panel
        title="联系我们"
        desc="我们为您提供个性化的售前购买咨询服务，以及全面的技术售后服务。"
      >
        <Button type="primary">点击咨询</Button>
      </Panel>
    </Section>
  )
}
