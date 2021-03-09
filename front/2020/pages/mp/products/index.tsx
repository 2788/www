/**
 * 七牛云产品
 */
import React from 'react'
import Layout from 'components/Layout'
import Link from 'components/Link'
import MpBanner from 'components/mp/Banner'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Category, categoryNameMapForMp, categories, Product, nameMap, descMap, urlMap, getCategoryProducts } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { MpPage } from 'constants/mp'

import banner from './banner.png'
import bannerContact from './banner_contact.png'
import style from './index.less'

export default function Main() {
  return (
    <Layout title="七牛云产品" keywords="" description="">
      <div style={{ padding: '16px', background: '#FFFFFF' }}>
        <MpBanner banner={banner} />
        <Tabs value={Category.Service} size="middle" className={style.tabs} contentClassName={style.tabsContent} shadow={false}>
          {
            categories.map(category => (
              <TabPane value={category} tab={categoryNameMapForMp[category]} key={category}>
                {
                  getCategoryProducts(category).map(product => <Card key={product} product={product} />)
                }
              </TabPane>
            ))
          }
        </Tabs>
        <MpBanner
          title="更多产品咨询"
          subtitle={<>关于云产品的更多咨询<br />欢迎联系我们</>}
          banner={bannerContact}
          style={{ marginTop: 24 }}
          onClick={() => wx.miniProgram.navigateTo({ url: MpPage.ServiceAndConsult })}
        />
      </div>
    </Layout>
  )
}

type CardProps = {
  product: Product
}

function Card({ product }: CardProps) {
  return (
    <>
      {
        descMap[product]
          ? (
            <Link className={style.card} href={urlMap[product] as string} >
              <div className={style.cardIcon}><ProductIcon product={product} /></div>
              <div>
                <div className={style.cardTitle}>{nameMap[product]}</div>
                <div className={style.cardDesc}>{descMap[product]}</div>
              </div>
            </Link>
          )
          : null
      }
    </>
  )
}
