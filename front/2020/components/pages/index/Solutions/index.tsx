import React, { ReactNode, PropsWithChildren, useState, createElement } from 'react'
import QueueAnim from 'rc-queue-anim'

import { Solution, iconMap, nameMap, urlMap, descMap } from 'constants/solutions'
import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'
import Link from 'components/Link'
import {
  Card as UICard,
  Content as UIContent,
  Title as UITitle,
  Desc as UIDesc,
  Img as UIImg
} from 'components/UI/Card'

import styles from './style.less'
import { allIndustries, industryNameMap, industryEnNameMap, industryCasesMap, industryDescMap, solutionsOf } from './industries'

interface CardProps {
  icon: ReactNode
  title: string
  href: string
}

export function Card({ icon, title, href, children }: PropsWithChildren<CardProps>) {
  return (
    <UICard className={styles.card}>
      <Link href={href} >
        {icon}
        <UIContent className={styles.content}>
          <UITitle className={styles.title}>{title}</UITitle>
          <UIDesc className={styles.desc}>{children}</UIDesc>
        </UIContent>
      </Link>
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
  title?: ReactNode
  desc: ReactNode
  active?: boolean
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
        <QueueAnim type={['bottom', 'top']}>
          {active ? cards : null}
        </QueueAnim>
      </div>
      <div className={styles.footer}>
        <QueueAnim type={['bottom', 'top']} >
          {active ? footer : null}
        </QueueAnim>
      </div>
    </div>
  )
}

function PaneForMobile({ desc, cards, footer }: PaneProps) {
  return (
    <div className={styles.mobilePane}>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.cards}>{cards}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  )
}

function SolutionsForMobile() {
  const subMenusView = allIndustries.map(industry => {
    const logosView = industryCasesMap[industry].map(
      ({ logo }, i) => <UIImg key={i} className={styles.case} src={logo} />
    )
    const cardsView = getSolutionCards(solutionsOf(industry))
    return (
      <SubMenu key={industry} title={industryNameMap[industry]}>
        <PaneForMobile
          desc={industryDescMap[industry]}
          cards={cardsView}
          footer={logosView}
        />
      </SubMenu>
    )
  })
  return (
    <Menu mode="inline">
      {subMenusView}
    </Menu>
  )
}

function SolutionsForPc() {
  const [activeKey, setActiveKey] = useState<string>(allIndustries[0])
  const tabPanesView = allIndustries.map((industry, index) => {
    const titleView = <Title text={industryNameMap[industry]} en={industryEnNameMap[industry]} />
    const cardsView = getSolutionCards(solutionsOf(industry))
    const logosView = industryCasesMap[industry].map(
      ({ logo }, i) => <UIImg key={i} className={styles.case} src={logo} />
    )
    return (
      <TabPane key={industry} value={industry} tab={industryNameMap[industry]}>
        <Pane
          active={activeKey === industry}
          title={titleView}
          desc={industryDescMap[industry]}
          pageNo={<PageNo idx={index + 1} total={allIndustries.length} />}
          cards={cardsView}
          footer={logosView}
        />
      </TabPane>
    )
  })
  return (
    <Tabs theme="white" value={activeKey} onChange={activeValue => setActiveKey(activeValue)}>
      {tabPanesView}
    </Tabs>
  )
}

export default function Solutions() {
  const isMobile = useMobile()
  return (
    <Section
      grey
      rootClassName={styles.solutions}
      title={<span className={styles.sectionTitle}>丰富的行业场景解决方案</span>}
      style={{ padding: isMobile ? '0' : '16px 0' }}
    >
      {
        isMobile ? <SolutionsForMobile /> : <SolutionsForPc />
      }
    </Section>
  )
}

function getSolutionCards(solutions: Solution[]) {
  return solutions.map(solution => (
    <Card
      key={solution}
      icon={createElement(iconMap[solution], { className: styles.icon })}
      title={nameMap[solution]}
      href={urlMap[solution] || '#'}
    >
      {descMap[solution]}
    </Card>
  ))
}
