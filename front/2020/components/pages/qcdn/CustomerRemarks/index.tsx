/**
 * @file cdn 页覆客户评价 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { ReactNode } from 'react'

import Section from 'components/Product/Section'
import { Row, Card, Img, Desc, Title } from 'components/UI/Card'

import BiliIcon from './images/bilibili.png'
import OppoIcon from './images/oppo.png'
import RedBookIcon from './images/redbook.png'

import styles from './style.less'

interface CustomerRemarkProps {
  icon: ReactNode
  customer: string
  remark: string
}

function CustomerRemark({ icon, customer, remark }: CustomerRemarkProps) {
  return (
    <Card>
      {
        typeof icon === 'string'
        ? <Img className={styles.image} src={icon} />
        : icon
      }
      <Title className={styles.title}>{customer}</Title>
      <Desc className={styles.desc}>{remark}</Desc>
    </Card>
  )
}

export default function CustomerRemarks() {
  return (
    <Section title="客户评价" name="customer-remarks">
      <Row>
        <CustomerRemark
          icon={BiliIcon}
          customer="bilibili"
          remark="通过深入分析客户的业务场景，在客户业务架构不做任何改变的情况下，优化资源流量命中率提升达 30%；优化首播八分位数据 300ms。
整合 QCDN + 存储 + Dora 的全套解决方案，为客户降低回源成本，减少源站压力。" />
        <CustomerRemark
          icon={OppoIcon}
          customer="OPPO"
          remark="通过第三方 APM 探测和实时日志的分析数据，为客户提供全国优质的下载服务，保障可用性和下载速度
主动发现客户下载业务文件不一致的痛点，分析并提出并首创全网文件 MD5 校验的方案，全面保证客户分发文件内容的完整、有效。" />
        <CustomerRemark
          icon={RedBookIcon}
          customer="小红书"
          remark="通过持续预热 DNS 解析域名, 降低 DNS 解析时间，从而将建联时间稳定在 200 ms 左右。
          基于自研和第三方监控工具，过平台节点进行全方位的实时监控，可针对异常节点进行快速处理，综合提升 提升整个平台的质量服务水平。" />
      </Row>
    </Section>
  )
}
