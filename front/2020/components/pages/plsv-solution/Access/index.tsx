/**
 * @file 短视频接入流程 index.tsx
 * @description 包含短视频接入流程
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import { useModal as useFeedbackModal } from 'components/Feedback'
import AccessProcess, { Step } from 'components/Product/AccessProcess'

import AccessIconOne from './access-icon-one.svg'
import AccessIconTwo from './access-icon-two.svg'
import AccessIconThree from './access-icon-three.svg'
import ArrowIcon from './arrow.svg'

import styles from './style.less'

export default function PlsvAccess() {
  const { startConsulting } = useFeedbackModal()

  return (
    <>
      <AccessProcess name="access" title="快速接入" header="接入流程">
        <Step icon={<AccessIconOne />}>
          <p className={styles.title}>定制方案</p>
          <p className={styles.desc}>1V1 专业咨询，提供定制化解决方案</p>
        </Step>
        <Step icon={<AccessIconTwo />}>
          <p className={styles.title}>测试对接</p>
          <p className={styles.desc}>免费测试，全程监控，快速响应迭代</p>
        </Step>
        <Step icon={<AccessIconThree />}>
          <p className={styles.title}>正式上线</p>
          <p className={styles.desc}>1V1 售后服务，确保业务稳定运行</p>
        </Step>
      </AccessProcess>
      <div className={styles.linkWrapper}>
        <a className={styles.link} onClick={startConsulting}>
          立即咨询<ArrowIcon className={styles.arrow} />
        </a>
      </div>
    </>
  )
}
