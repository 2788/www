/**
 * @file 视频冷存储客户案例 index.tsx
 * @description 包含视频冷存储客户案例
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import CaseIconSouhuURL from './case-icon-souhu.png'

import styles from './style.less'

export default function VcsCase() {
  return (
    <Section name="case" title="客户案例" grey>
      <div className={styles.wrapper}>
        <img
          className={styles.img}
          src={CaseIconSouhuURL}
          title="搜狐视频"
          alt="搜狐视频"
        />
        <div className={styles.content}>
          <p className={styles.title}>
            搜狐视频
          </p>
          <p className={styles.desc}>七牛云帮助搜狐视频对其全站的数据进行冷备，总量达到数 EB 级；</p>
          <p className={styles.desc}>整体数据迁移流程在 1 个月内完成，并实现了新增数据的实时同步；</p>
          <p className={styles.desc}>在保证低成本存储的同时，在华东区域内实现数据访问的高可用；</p>
          <p className={styles.desc}>项目稳定运行 1 年多时间，0 故障，数据同步成功率 100%。</p>
        </div>
      </div>
    </Section>
  )
}
