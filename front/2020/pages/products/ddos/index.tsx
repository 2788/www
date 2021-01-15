
/**
 * @file DDoS 高防
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { useBtns } from 'hooks/product-btn'

import { Product } from 'constants/products'
import Section from 'components/Product/Section'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNotices, INotice } from 'apis/admin/notice'
import ProductNotice from 'components/Product/common/ProductNotice'

import DdosProduct from 'components/pages/ddos/Product'
import Advantage from 'components/pages/ddos/Advantage'
import QvmCommonCases from 'components/pages/qvm/Cases'

import banner from './banner.png'

function Page({ notices }: { notices: INotice[] }) {

  const btns = useBtns(
    { children: '立即购买', href: 'https://portal.qiniu.com/qvm/security/bgpip/create', pcOnly: true },
    { children: '查看价格', href: 'https://developer.qiniu.com/qvm/manual/4973/security-ddos-ip-price-list' }
  )

  return (
    <>
      <PageBanner
        title="DDoS 高防"
        desc="DDoS 高防是针对互联网服务器（包括非七牛云主机）在遭受大规模 DDoS / CC 攻击后导致服务不可用的情况下，推出的全面、高效专业的抗 D 安全服务。用户可通过七牛云 T 级高防 IP ，应对 DDoS / CC 攻击问题，确保关键业务连续性，安全运行。该解决方案广泛应用于游戏、电商、企业服务等场景。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <DdosProduct />

      <Advantage />

      <QvmCommonCases title="客户案例" />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct name="云主机" product={Product.Qvm} />
          <RelatedProduct product={Product.CloudSql} />
        </Related>
      </Section>
    </>
  )
}

export default function Ddos({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="DDoS 高防"
      keywords="DDoS, 高防, DoS, 互联网服务器, 大规模, CC, DDoS / CC, 全面, 高效专业, 安全服务, 七牛云"
      description="DDoS 高防是针对互联网服务器（包括非七牛云主机）在遭受大规模 DDoS / CC 攻击后导致服务不可用的情况下，推出的全面、高效专业的抗 D 安全服务。用户可通过七牛云 T 级高防 IP ，应对 DDoS / CC 攻击问题，确保关键业务连续性，安全运行。该解决方案广泛应用于游戏、电商、企业服务等场景。"
    >
      <Page notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Ddos)
    }
  }
}
