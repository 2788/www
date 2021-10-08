import React, { ReactNode, PropsWithChildren, useState, MouseEvent } from 'react'
import QueueAnim from 'rc-queue-anim'

import { useModal } from 'components/Feedback'
import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'
import { Card as UICard, Title, Content, Desc } from 'components/UI/Card'
import { Category, categoryNameMap, categories, getCategoryProducts, PartialProductData, normalizeProduct } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Link from 'components/Link'
import { joinText } from 'utils/text'

import styles from './style.less'

import TabServiceIcon from './images/tabs/product2.svg'
import TabMediaIcon from './images/tabs/product3.svg'
import TabDataIcon from './images/tabs/product4.svg'

const categoryIconMap = {
  [Category.Service]: TabServiceIcon,
  [Category.Media]: TabMediaIcon,
  [Category.Data]: TabDataIcon
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
        active ? children : null
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

function menuItemForMobileProduct(product: PartialProductData, startConsulting: () => void) {
  const productData = normalizeProduct(product)
  return (
    <MenuItem
      key={`${productData.product}-${productData.name}`}
      title={productData.name}
      href={productData.url !== null ? productData.url : undefined}
      onClick={productData.url != null ? undefined : startConsulting}
    >
      {productData.url != null ? productData.desc : '即将上线，欢迎垂询'}
    </MenuItem>
  )
}

function subMenuForMobileCategory(category: Category, startConsulting: (intention: string) => void) {
  const Icon = categoryIconMap[category]
  const title = (
    <span className={styles.tab}>
      <Icon />{categoryNameMap[category]}
    </span>
  )
  const products: PartialProductData[] = getCategoryProducts(category)
  const menuItemsView = products.map(
    product => menuItemForMobileProduct(
      product,
      () => startConsulting(joinText(normalizeProduct(product).name, '产品'))
    )
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
  const { startIntentConsulting } = useModal()
  const subMenusView = categories.map(category => (
    subMenuForMobileCategory(category, startIntentConsulting)
  ))
  return (
    <Menu mode="inline">
      {subMenusView}
    </Menu>
  )
}

function CardForPcProduct({ product }: { product: PartialProductData }) {
  const productData = normalizeProduct(product)
  const { startIntentConsulting } = useModal()

  function handleClick() {
    if (productData.url == null) {
      startIntentConsulting(joinText(productData.name, '产品'))
    }
  }

  return (
    <Card
      key={`${productData.product}-${productData.name}`}
      icon={<ProductIcon className={styles.icon} product={productData.product} />}
      title={productData.name}
      href={productData.url}
      onClick={handleClick}
    >
      {productData.url !== null ? productData.desc : '即将上线，欢迎垂询'}
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
  const products: PartialProductData[] = getCategoryProducts(category)
  const cardsView = products.map(
    (product, index) => (
      <CardForPcProduct key={index} product={product} />
    )
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
  const [activeKey, setActiveKey] = useState(Category.Data)
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
