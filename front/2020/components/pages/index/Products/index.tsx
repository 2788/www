import React, { ReactNode, PropsWithChildren, useState, MouseEvent } from 'react'
import QueueAnim from 'rc-queue-anim'

import { useModal } from 'components/Feedback'
import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'
import { Card as UICard, Title, Content, Desc } from 'components/UI/Card'
import { Product, nameMap, urlMap, descMap, Category, categoryNameMap, categoryProductsMap, categories } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Link from 'components/Link'

import styles from './style.less'

import TabServiceIcon from './images/tabs/product2.svg'
import TabVideoIcon from './images/tabs/product3.svg'
import TabIntelligenceIcon from './images/tabs/product4.svg'

const categoryIconMap = {
  [Category.Service]: TabServiceIcon,
  [Category.Video]: TabVideoIcon,
  [Category.Intelligence]: TabIntelligenceIcon
}

interface CardProps {
  icon: ReactNode
  title: string
  href: string | null
  onClick?: () => void
  disabled?: boolean
}

function Card({ icon, title, href, onClick, children }: PropsWithChildren<CardProps>) {
  if (href == null) {
    return (
      <UICard onClick={onClick} className={styles.card}>
        {icon}
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    )
  }
  return (
    <Link href={href} onClick={onClick}>
      <UICard className={styles.card}>
        {icon}
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

interface AnimProps {
  active: boolean
}

function Anim({ active, children }: PropsWithChildren<AnimProps>) {
  return (
    <QueueAnim ease="easeInOutCubic">
      {
        active
        ? children
        : null
      }
    </QueueAnim>
  )
}

function MenuItem({ title, href, onClick, children }: PropsWithChildren<{
  title: string,
  href?: string,
  onClick?: () => void
}>) {
  const handleClick = onClick && ((e: MouseEvent<any>) => {
    e.preventDefault()
    onClick()
  })
  return (
    <div className={styles.menuItem}>
      <Link href={href} onClick={handleClick}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{children}</p>
      </Link>
    </div>
  )
}

function PaneForMobile({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.mobilePane}>
      {children}
    </div>
  )
}

function menuItemForMobileProduct(product: Product, startConsulting: () => void) {
  const url = urlMap[product]
  return (
    <MenuItem
      key={product}
      title={nameMap[product]}
      href={url != null ? url : undefined}
      onClick={startConsulting}
    >
      {url != null ? descMap[product] : '即将上线，欢迎垂询'}
    </MenuItem>
  )
}

function subMenuForMobileCategory(category: Category, startConsulting: () => void) {
  const Icon = categoryIconMap[category]
  const title = (
    <span className={styles.tab}>
      <Icon />{categoryNameMap[category]}
    </span>
  )
  const products: readonly Product[] = categoryProductsMap[category]
  const menuItemsView = products.map(
    product => menuItemForMobileProduct(product, startConsulting)
  )
  return (
    <SubMenu key={category} title={title}>
      <PaneForMobile>
        {menuItemsView}
      </PaneForMobile>
    </SubMenu>
  )
}

function ProductsForMobile() {
  const { startConsulting } = useModal()
  const subMenusView = categories.map(category => (
    subMenuForMobileCategory(category, startConsulting)
  ))
  return (
    <Menu mode="inline">
      {subMenusView}
    </Menu>
  )
}

function CardForPcProduct({ product }: { product: Product }) {
  const { startConsulting } = useModal()
  const url = urlMap[product]
  return (
    <Card
      key={product}
      icon={<ProductIcon className={styles.icon} product={product} />}
      title={nameMap[product]}
      href={url}
      onClick={url != null ? undefined : startConsulting}
    >
      {url != null ? descMap[product] : '即将上线，欢迎垂询'}
    </Card>
  )
}

function tabPaneForPcCategory(category: Category, active: Category) {
  const Icon = categoryIconMap[category]
  const tabView = (
    <span className={styles.tab}>
      <Icon />{categoryNameMap[category]}
    </span>
  )
  const products: readonly Product[] = categoryProductsMap[category]
  const cardsView = products.map(
    product => <CardForPcProduct key={product} product={product} />
  )
  return (
    <TabPane key={category} value={category} tab={tabView} className={styles.pane}>
      {/* 目前缺少合适的文案，先藏起来 */}
      {/* <div className={styles.tip}>七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产</div> */}
      <Anim active={active === category}>
        {cardsView}
      </Anim>
    </TabPane>
  )
}

export function ProductsForPc() {
  const [activeKey, setActiveKey] = useState(Category.Intelligence)
  const onTabChange = (key: string) => {
    setActiveKey(key as Category)
  }
  const tabPanesView = categories.map(category => (
    tabPaneForPcCategory(category, activeKey)
  ))
  return (
    <>
      <Tabs value={activeKey} onChange={onTabChange}>
        {tabPanesView}
      </Tabs>
      <Link href="/events/free" className={styles.explore}>开始免费体验</Link>
    </>
  )
}

export default function Products() {
  const isMobile = useMobile()
  return (
    <Section grey className={styles.products} title="云产品" style={{ padding: isMobile ? '0' : 'auto' }}>
      {
        isMobile ? <ProductsForMobile /> : <ProductsForPc />
      }
    </Section>
  )
}
