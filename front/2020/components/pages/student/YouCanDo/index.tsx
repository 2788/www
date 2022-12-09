/**
 * @file 校园开发者成长计划页面 - 你可以实现
 */

import React, { PropsWithChildren } from 'react'

import { useMobile } from 'hooks/ua'
import { Card, Row } from 'components/UI/Card'
import Menu, { SubMenu } from 'components/UI/Menu'
import { ProductInfo } from 'apis/admin/product'

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image1Mobile from './images/image1_mobile.png'
import image2Mobile from './images/image2_mobile.png'
import image3Mobile from './images/image3_mobile.png'
import image4Mobile from './images/image4_mobile.png'
import styles from './style.less'

const allProductIdMap = {
  kodo: 'kodo',
  qcdn: 'qcdn',
  dora: 'dora',
  voice: 'voice'
} as const

export const allProductIds = Object.values(allProductIdMap)

const data = [
  { title: '个人博客/校园论坛', imgUrl: image1, imgUrlMobile: image1Mobile, productIds: [allProductIdMap.kodo, allProductIdMap.qcdn, allProductIdMap.dora] },
  { title: '选课与课表系统', imgUrl: image2, imgUrlMobile: image2Mobile, productIds: [allProductIdMap.kodo, allProductIdMap.qcdn] },
  { title: '校园失物招领 APP', imgUrl: image3, imgUrlMobile: image3Mobile, productIds: [allProductIdMap.kodo, allProductIdMap.qcdn, allProductIdMap.dora] },
  { title: '机器人开发', imgUrl: image4, imgUrlMobile: image4Mobile, productIds: [allProductIdMap.voice, allProductIdMap.dora] }
]

export function YouCanDo({ productInfoMap }: { productInfoMap: Record<(typeof allProductIds)[number], ProductInfo> }) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <Menu mode="inline">
          {data.map(({ title, imgUrlMobile, productIds }) => (
            <SubMenu title={title} key={title}>
              <div className={styles.img}>
                <img src={imgUrlMobile} alt={title} />
              </div>
              <ProductList productInfos={[...productIds].map(id => productInfoMap[id])} />
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <Row className={styles.pcWrapper}>
      {data.map(({ title, imgUrl, productIds }) => (
        <MyCard key={title} title={title} imgUrl={imgUrl}>
          <ProductList productInfos={[...productIds].map(id => productInfoMap[id])} />
        </MyCard>
      ))}
    </Row>
  )
}

function MyCard({ title, imgUrl, children }: PropsWithChildren<{ title: string, imgUrl: string }>) {
  return (
    <Card className={styles.myCard}>
      <img src={imgUrl} alt={title} />
      <div className={styles.bg}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </Card>
  )
}

function ProductList({ productInfos }: { productInfos: ProductInfo[] }) {
  return (
    <div className={styles.list}>
      <h3 className={styles.recommend}>推荐产品</h3>
      <ul>
        {productInfos.map(({ path, name }) => (
          <MyProduct key={path} name={name} />
        ))}
        <MyProduct key="more" name="..." />
      </ul>
    </div>
  )
}

function MyProduct({ name }: { name: string }) {
  return (
    <li className={styles.productItem}>
      {name}
    </li>
  )
}
