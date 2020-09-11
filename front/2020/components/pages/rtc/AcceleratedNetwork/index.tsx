/**
 * @file rtc 加速网络 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import Section from 'components/Product/Section'

import styles from './style.less'

interface AdvantageProps {
  title: string
}

function Advantage({ title, children }: PropsWithChildren<AdvantageProps>) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{children}</p>
      </div>
    </div>
  )
}

export function Advantages() {
  return (
    <div className={styles.advantages}>
      <Advantage title="全球节点">全球节点 180+<br />支持全球 200+ 国家和地区互动</Advantage>
      <Advantage title="实时性">延迟 150ms 左右</Advantage>
      <Advantage title="传输协议">基于 WebRTC<br />接入门槛低，兼容性强，用户体验好</Advantage>
      <Advantage title="加速方案">全自研边缘加速方案<br />实现信息在全球网络的实时共享交互</Advantage>
      <Advantage title="调度策略">智能分配流媒体服务器和加速线路<br />快速响应全球实时互动需求</Advantage>
      <Advantage title="质量监控">网络品质监控与自动调度系统<br />实时优化传输质量</Advantage>
    </div>
  )
}

export default function AcceleratedNetwork() {
  return (
    <Section title="核心优势" subtitle="自研边缘加速方案，实现全球信息实时共享" name="accelerated-network">
      <Advantages />
    </Section>
  )
}
