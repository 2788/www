/**
 * 七牛云产品
 */
import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Link from 'components/Link'
import MpBanner from 'components/mp/Banner'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Category, categoryNameMapForMp, categories, getCategoryProducts, normalizeProduct, PartialProductData } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { MpPage } from 'constants/mp'
import { getGlobalBanners } from 'apis/admin/global-banners'

import banner from './banner.png'
import bannerContact from './banner_contact.png'
import style from './index.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Main({ globalBanners }: Props) {
  return (
    <Layout title="七牛云产品" keywords="" description="" globalBanners={globalBanners}>
      <div style={{ padding: '16px', background: '#FFFFFF' }}>
        <MpBanner banner={banner} />
        <Tabs value={Category.Service} size="middle" className={style.tabs} contentClassName={style.tabsContent} shadow={false}>
          {
            categories.map(category => (
              <TabPane value={category} tab={categoryNameMapForMp[category]} key={category}>
                {
                  getCategoryProducts(category).map((product, index) => (
                    <Card key={index} product={product} />
                  ))
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
  product: PartialProductData
}

function Card({ product }: CardProps) {
  const productData = normalizeProduct(product)
  return (
    <>
      {
        productData.desc
          ? (
            <Link className={style.card} href={productData.url as string} >
              <div className={style.cardIcon}>
                <ProductIcon product={productData.product} />
              </div>
              <div>
                <div className={style.cardTitle}>{productData.name}</div>
                <div className={style.cardDesc}>{productData.desc}</div>
              </div>
            </Link>
          )
          : null
      }
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
