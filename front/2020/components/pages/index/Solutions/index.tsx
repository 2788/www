import React, { ReactNode, PropsWithChildren, useState } from 'react'
import QueueAnim from 'rc-queue-anim'

import Section from 'components/Product/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import {
  Card as UICard,
  Content as UIContent,
  Title as UITitle,
  Desc as UIDesc
} from 'components/UI/Card'

import styles from './style.less'

import BannerIcon from './images/base-service.svg'

interface CardProps {
  icon: ReactNode
  title: string
}

export function Card({ icon, title, children }: PropsWithChildren<CardProps>) {
  return (
    <UICard className={styles.card}>
      {icon}
      <UIContent className={styles.content}>
        <UITitle className={styles.title}>{title}</UITitle>
        <UIDesc className={styles.desc}>{children}</UIDesc>
      </UIContent>
    </UICard>
  )
}

interface TitleProps {
  text: string
  en: string
}

export function Title({ text, en }: TitleProps) {
  return (
    <div className={styles.title}>
      {text}
      <span className={styles.en}>{en}</span>
    </div>
  )
}

interface PageNoProps {
  idx: number
  total: number
}

export function PageNo({ idx, total }: PageNoProps) {
  if (idx < 1 || total < 1) {
    throw new Error('PageNo 组件中的 idx 和 total 属性不能小于 1')
  }
  return (
    <div className={styles.pageNo}>
      {idx < 10 ? `0${idx}` : idx}/<span className={styles.total}>{total < 10 ? `0${total}` : total}</span>
    </div>
  )
}

interface PaneProps {
  title: ReactNode
  desc: ReactNode
  active: boolean
  pageNo?: ReactNode
  cards?: ReactNode[]
  footer?: ReactNode[]
}

export function Pane({ title, desc, active, pageNo, cards, footer }: PaneProps) {
  return (
    <div className={styles.pane}>
      <div className={styles.paneContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
        {pageNo}
      </div>
      <div className={styles.right}>
        <QueueAnim ease="easeInOutCubic">
          {active ? cards : null}
        </QueueAnim>
      </div>
      {
        footer && footer.length > 0 && (
          <div className={styles.footer}>
            <QueueAnim type={['bottom', 'top']} >
              {active ? footer : null}
            </QueueAnim>
          </div>
        )
      }
    </div>
  )
}

export default function Solutions() {
  const [activeKey, setActiveKey] = useState('1')
  return (
    <Section className={styles.solutions} title="丰富的行业场景解决方案" name="solutions">
      <Tabs defaultValue="1" onChange={activeValue => setActiveKey(activeValue)}>
        <TabPane value="1" tab="金融">
          <Pane
            active={activeKey === '1'}
            title={<Title text="金融" en="Financial" />}
            desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。 "
            pageNo={<PageNo idx={1} total={6} />}
            cards={[
              <Card key="1" icon={<BannerIcon className={styles.icon} />} title="智能视频云解决方案页" >集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案</Card>,
              <Card key="2" icon={<BannerIcon className={styles.icon} />} title="私有云存储解决方案页" >为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型</Card>,
              <Card key="3" icon={<BannerIcon className={styles.icon} />} title="监控视频边缘存储解决方案页" >满足监控视频及图片就近存储、加速传输、倍速播放等关键需求</Card>
            ]}
            footer={[
              <i key="1" className={styles.case}><BannerIcon /></i>,
              <i key="2" className={styles.case}><BannerIcon /></i>,
              <i key="3" className={styles.case}><BannerIcon /></i>,
              <i key="4" className={styles.case}><BannerIcon /></i>,
              <i key="5" className={styles.case}><BannerIcon /></i>,
              <i key="6" className={styles.case}><BannerIcon /></i>,
              <i key="7" className={styles.case}><BannerIcon /></i>
            ]}
          />
        </TabPane>
        <TabPane value="2" tab="广电">
          <Pane
            active={activeKey === '2'}
            title={<Title text="广电" en="Financial" />}
            desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。 "
            pageNo={<PageNo idx={1} total={6} />}
            cards={[]}
            footer={[]}
          />
        </TabPane>
        <TabPane value="3" tab="制造">
          <Pane
            active={activeKey === '3'}
            title={<Title text="制造" en="Financial" />}
            desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。 "
            pageNo={<PageNo idx={1} total={6} />}
            cards={[]}
            footer={[]}
          />
        </TabPane>
        <TabPane value="4" tab="互联网">
          <Pane
            active={activeKey === '4'}
            title={<Title text="互联网" en="Financial" />}
            desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。 "
            pageNo={<PageNo idx={1} total={6} />}
            cards={[]}
            footer={[]}
          />
        </TabPane>
        <TabPane value="5" tab="物联网">
          <Pane
            active={activeKey === '5'}
            title={<Title text="物联网" en="Financial" />}
            desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。 "
            pageNo={<PageNo idx={1} total={6} />}
            cards={[]}
            footer={[]}
          />
        </TabPane>
      </Tabs>
    </Section>
  )
}
