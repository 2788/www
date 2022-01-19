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
      <Advantage title="超低延迟">自研 RTC 实时网络智能调度，音视频通信端到端延迟小于 200 ms</Advantage>
      <Advantage title="超大房间">支持万人规模的超大房间，保障音视频互动各端同步</Advantage>
      <Advantage title="超强扩展">拥有美颜特效、白板、聊天等功能组件，支持快速扩展</Advantage>
      <Advantage title="全球节点">全球 200+ 节点可就近接入，可根据业务实际情况动态扩容</Advantage>
      <Advantage title="快速上线">30 分钟实现视频通话，多场景 demo 及示例代码帮助快速上线</Advantage>
      <Advantage title="质量透明">全天候质量监测，实时感知各类情况，保障音视频互动体验</Advantage>
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
