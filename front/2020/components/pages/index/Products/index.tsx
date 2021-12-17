import React, { PropsWithChildren, MouseEvent } from 'react'
import cls from 'classnames'

import { useModal } from 'components/Feedback'
import Section from 'components/pages/index/Section'
import Menu, { SubMenu } from 'components/UI/Menu'
import { Product, urlMap, Category, categoryNameMap, categories, getCategoryProducts, PartialProductData, normalizeProduct } from 'constants/products'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { joinText } from 'utils/text'

import styles from './style.less'

import cdn from './images/paas/cdn.png'
import dora from './images/paas/dora.png'
import express from './images/paas/express.png'
import kodo from './images/paas/kodo.png'
import liveBroadcast from './images/paas/liveBroadcast.png'
import qvm from './images/paas/qvm.png'

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

function Pane({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.pane}>
      {children}
    </div>
  )
}

function menuItemForProduct(product: PartialProductData, startConsulting: () => void) {
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

function subMenuForCategory(category: Category, startConsulting: (intention: string) => void) {
  const products: PartialProductData[] = getCategoryProducts(category)
  const menuItemsView = products.map(
    product => menuItemForProduct(
      product,
      () => startConsulting(joinText(normalizeProduct(product).name, '产品'))
    )
  )
  return (
    <SubMenu key={category} title={categoryNameMap[category]}>
      <Pane>
        {menuItemsView}
      </Pane>
    </SubMenu>
  )
}

function CloudProducts() {
  const { startIntentConsulting } = useModal()
  const subMenusView = categories.map(category => (
    subMenuForCategory(category, startIntentConsulting)
  ))
  return (
    <Menu mode="inline" className={styles.cloudMenu}>
      {subMenusView}
    </Menu>
  )
}

function PaasProducts() {
  return (
    <div className={styles.paasProducts}>
      <Button className={styles.item} type="default-grey" href={urlMap[Product.Kodo]} withBorder>
        <img src={kodo} className={styles.img} />
        对象存储 Kodo
      </Button>
      <Button className={styles.item} type="default-grey" href={urlMap[Product.Dora]} withBorder>
        <img src={dora} className={styles.img} />
        智能多媒体服务 Dora
      </Button>
      <Button className={styles.item} type="default-grey" href={urlMap[Product.Express]} withBorder>
        <img src={express} className={styles.img} />
        机器数据分析平台 Pandora
      </Button>
      <Menu mode="inline" className={cls(styles.paasMenu, styles.item)}>
        <SubMenu title={<><img src={liveBroadcast} className={styles.img} />直播与实时互动</>}>
          <Pane>
            <Link className={styles.link} href={urlMap[Product.Pili]}>
              视频直播 Pili
            </Link>
            <Link className={styles.link} href={urlMap[Product.Geek]}>
              低延时直播 Geek
            </Link>
            <Link className={styles.link} href={urlMap[Product.Rtn]}>
              实时音视频 QRTC
            </Link>
            <Link className={styles.link} href={urlMap[Product.Qvs]}>
              视频监控 QVS
            </Link>
          </Pane>
        </SubMenu>
      </Menu>
      <Button className={styles.item} type="default-grey" href={urlMap[Product.Cdn]} withBorder>
        <img src={cdn} className={styles.img} />
        内容分发网络 QCDN
      </Button>
      <Button className={styles.item} type="default-grey" href={urlMap[Product.Qvm]} withBorder>
        <img src={qvm} className={styles.img} />
        云主机服务 QVM
      </Button>
    </div>
  )
}

export default function Products() {
  return (
    <>
      <Section className={styles.section} rootClassName={cls(styles.block, styles.paasBlock)} title="“云+数据” 一体化 PaaS 平台">
        <PaasProducts />
      </Section>
      <Section className={styles.section} rootClassName={styles.block} title="云产品">
        <CloudProducts />
      </Section>
    </>
  )
}
