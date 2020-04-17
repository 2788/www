/**
 * @file component Nav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import Collapse from 'react-icecream/lib/collapse'

import * as styles from './style.m.less'

export interface IProps {
  //
}

interface IItemProps {
  title: string
  link: string
}

function Item({ title, link }: IItemProps) {
  return (
    <li className={styles.menuItem}>
      <a href={link}>
        {title}
      </a>
    </li>
  )
}

function ProductAndService() {
  return (
    <Collapse
      defaultActiveKey={['list']}
      className={styles.menu}
    >
      <Collapse.Panel header="产品与服务" key="list" className={styles.subMenu}>
        <ul>
          <Item title="对象存储" link="https://www.qiniu.com/products/kodo" />
          <Item title="私有云存储" link="https://www.qiniu.com/products/private-cloud-kodo" />
          <Item title="CDN" link="https://www.qiniu.com/products/qcdn" />
          <Item title="云主机" link="https://www.qiniu.com/products/qvm" />
          <Item title="云短信" link="https://www.qiniu.com/products/sms" />
          <Item title="边缘计算平台" link="https://www.qiniu.com/products/snow" />
          <Item title="SSL 证书" link="https://www.qiniu.com/ssl" />
          <Item title="深度学习平台" link="https://www.qiniu.com/products/atlab" />
          <Item title="大数据" link="https://www.qiniu.com/products/pandora" />
          <Item title="内容安全" link="https://www.qiniu.com/products/censor" />
          <Item title="智能日志管理平台" link="https://www.qiniu.com/products/insight" />
          <Item title="机器数据分析平台" link="https://www.qiniu.com/products/express" />
          <Item title="智能多媒体服务" link="https://www.qiniu.com/products/dora" />
          <Item title="直播云" link="https://www.qiniu.com/products/pili" />
          <Item title="实时音视频云" link="https://www.qiniu.com/products/rtn" />
        </ul>
      </Collapse.Panel>
    </Collapse>
  )
}

function Support() {
  return (
    <Collapse
      defaultActiveKey={['list']}
      className={styles.menu}
    >
      <Collapse.Panel header="支持" key="list" className={styles.subMenu}>
        <ul>
          <Item title="开发者中心" link="https://developer.qiniu.com" />
          <Item title="技术支持" link="https://support.qiniu.com" />
          <Item title="问答社区" link="https://segmentfault.com/qiniu" />
          <Item title="热门活动" link="https://www.qiniu.com/events" />
          <Item title="违规内容举报" link="mailto:jubao@qiniu.com" />
          <Item title="工单系统" link="https://support.qiniu.com/login" />
          <Item title="技术博客" link="https://blog.qiniu.com/" />
        </ul>
      </Collapse.Panel>
    </Collapse>
  )
}

function AboutMe() {
  return (
    <Collapse
      defaultActiveKey={['list']}
      className={styles.menu}
    >
      <Collapse.Panel header="关于我们" key="list" className={styles.subMenu}>
        <ul>
          <Item title="公司介绍" link="https://www.qiniu.com/company" />
          <Item title="新闻动态" link="https://www.qiniu.com/news" />
          <Item title="产品动态" link="https://www.qiniu.com/product_news" />
          <Item title="近期福利" link="https://www.qiniu.com/welfares" />
          <Item title="品牌标识" link="https://developer.qiniu.com/brand" />
          <Item title="客户案例" link="https://www.qiniu.com/case" />
          <Item title="市场合作" link="https://www.qiniu.com/cooperations" />
          <Item title="加入我们" link="http://career.qiniu.com/" />
          <Item title="联系我们" link="https://www.qiniu.com/contact" />
        </ul>
      </Collapse.Panel>
    </Collapse>
  )
}

function Consultation() {
  return (
    <Collapse
      defaultActiveKey={['list']}
      className={styles.menu}
    >
      <Collapse.Panel header="售前咨询" key="list" className={styles.subMenu}>
        <a href="tel:400-808-9176">400-808-9176</a> 转 1
      </Collapse.Panel>
    </Collapse>
  )
}

export default function Nav(_props: IProps) {
  return (
    <nav className={styles.nav}>
      <ProductAndService />
      <Support />
      <AboutMe />
      <Consultation />
    </nav>
  )
}
