/**
 * @file 私有云存储技术规格 index.tsx
 * @description 包含私有云存储技术规格
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import styles from './style.less'

export default function KodoeSpec() {
  return (
    <Section name="spec" title="技术规格">
      <table
        className={styles.table}
        cellPadding={0}
        cellSpacing={0}
      >
        <tbody>
          <tr>
            <td className={styles.title}>型号</td>
            <td>Kodo Enterprise</td>
          </tr>
          <tr>
            <td className={styles.title}>系统架构</td>
            <td>全分布式架构</td>
          </tr>
          <tr>
            <td className={styles.title}>扩展性</td>
            <td>EB 级别</td>
          </tr>
          <tr>
            <td className={styles.title}>数据冗余保护机制</td>
            <td>纠删码（Erasure Coding），多副本</td>
          </tr>
          <tr>
            <td className={styles.title}>企业级特性</td>
            <td>生命周期管理，跨域访问控制，数据加密，传输加密，读写策略控制，双活，跨区域同步和 QoS 等</td>
          </tr>
          <tr>
            <td className={styles.title}>数据处理</td>
            <td>图片处理，音视频拼接，转码等</td>
          </tr>
          <tr>
            <td className={styles.title}>兼容网络</td>
            <td>TCP/IP，InfiniBand</td>
          </tr>
          <tr>
            <td className={styles.title}>兼容平台</td>
            <td>标准 X86 服务器</td>
          </tr>
          <tr>
            <td className={styles.title}>兼容磁盘</td>
            <td>NVMe SSD, SAS SSD, SATA SSD, SAS HDD, NL-SAS HDD, SATA HDD</td>
          </tr>
        </tbody>
      </table>
    </Section>
  )
}
