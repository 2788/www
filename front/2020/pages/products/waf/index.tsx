import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Product/Layout'
import { useBtns } from 'hooks/product-btn'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import QvmCommonCases from 'components/pages/qvm/Cases'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Advantage from 'components/pages/waf/Advantage'
import Scenes from 'components/pages/waf/Scene'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import Section from 'components/Product/Section'
import imgBanner from './images/banner.png'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function PageContent({ notices, newsRes }: Props) {

  const btns = useBtns(
    { children: '立即购买', href: 'https://portal.qiniu.com/qvm/security/waf' },
    { children: '查看价格', href: urlForPrice(Product.Qvm, true) }
  )

  return (
    <>
      <PageBanner
        title="Web 应用防火墙"
        desc="Web 应用防火墙对网站或者 APP 的业务流量进行恶意特征识别及防护，将正常、安全的流量回源到服务器。避免网站服务器被恶意入侵，保障业务的核心数据安全，解决因恶意攻击导致的服务器性能异常问题。"
        btns={btns.banner}
        icon={imgBanner}
      />
      <ProductNotice {...notices} />
      <Navigator>{btns.nav}</Navigator>
      <Advantage />
      <Scenes />
      <QvmCommonCases title="客户案例" />
      <ProductNews newsRes={newsRes} />

      <LinkGroups title="相关文档">
        <LinkGroup title="产品文档">
          <LinkItem href="https://developer.qiniu.com/qvm/8034/functions">WAF 功能和接入方式</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/8035/waf-specs">套餐和规格说明</LinkItem>
        </LinkGroup>
        <LinkGroup title="使用指南">
          <LinkItem href="https://developer.qiniu.com/qvm/8046/operate-domain">网站接入域名操作</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/8038/web-defense-protect">Web 入侵防护</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/8056/crawler-rule">Bot 管理设置爬虫规则</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/8058/app-protect">APP 防护</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <Section name="related" title="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Qvm} />
          <RelatedProduct product={Product.CloudSql} />
          <RelatedProduct product={Product.Ddos} />
        </Related>
      </Section>
    </>
  )
}

export default function Page(props: Props) {
  return (
    <Layout
      title="Web 应用防火墙"
      keywords="Web 应用防火墙, WAF, Web 应用防火墙价格, 网站防火墙, 网站安全防护"
      description="Web 应用防火墙对网站或者 APP 的业务流量进行恶意特征识别及防护，将正常、安全的流量回源到服务器。避免网站服务器被恶意入侵，保障业务的核心数据安全，解决因恶意攻击导致的服务器性能异常问题。"
    >
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.WAF),
      newsRes: await getNews({ product: Product.WAF })
    }
  }
}
