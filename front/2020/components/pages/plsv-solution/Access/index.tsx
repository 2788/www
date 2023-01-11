/**
 * @file 短视频接入流程 index.tsx
 * @description 包含短视频接入流程
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import AccessProcess, { Step } from 'components/Product/AccessProcess'

import accessIconOne from './access-icon-one.png'
import accessIconTwo from './access-icon-two.png'
import accessIconThree from './access-icon-three.png'
import ArrowIcon from './arrow.svg'

import styles from './style.less'

function Icon({ src }: { src: string }) {
  return (
    <img className={styles.tabIcon} src={src} alt="icon" />
  )
}

interface Props {
  onConsult: () => void
}

export default function PlsvAccess({ onConsult }: Props) {
  return (
    <>
      <AccessProcess name="access" title="快速接入" header="接入流程">
        <Step icon={<Icon src={accessIconOne} />}>
          <p className={styles.title}>定制方案</p>
          <p className={styles.desc}>1V1 专业咨询，提供定制化解决方案</p>
        </Step>
        <Step icon={<Icon src={accessIconTwo} />}>
          <p className={styles.title}>测试对接</p>
          <p className={styles.desc}>免费测试，全程监控，快速响应迭代</p>
        </Step>
        <Step icon={<Icon src={accessIconThree} />}>
          <p className={styles.title}>正式上线</p>
          <p className={styles.desc}>1V1 售后服务，确保业务稳定运行</p>
        </Step>
      </AccessProcess>
      <div className={styles.linkWrapper}>
        <a className={styles.link} onClick={onConsult}>
          立即咨询<ArrowIcon className={styles.arrow} />
        </a>
      </div>
    </>
  )
}
