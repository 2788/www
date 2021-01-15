
/**
 * @file 云数据库
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { urlForPrice } from 'utils/route'
import { useBtns } from 'hooks/product-btn'

import { Product } from 'constants/products'
import { getNotices, INotice } from 'apis/admin/notice'
import ProductNotice from 'components/Product/common/ProductNotice'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import SqlProduct from 'components/pages/cloud-sql/Product'
import Scene from 'components/pages/cloud-sql/Scene'
import ProductChoose from 'components/pages/cloud-sql/ProductChoose'
import QvmCommonCases from 'components/pages/qvm/Cases'

import banner from './banner.png'

function Page({ notices }: { notices: INotice[] }) {

  const priceCalculatorUrl = urlForPrice(Product.Qvm, true)
  const priceUrl = urlForPrice(Product.Qvm)

  const btns = useBtns(
    { children: '立即购买', href: 'https://portal.qiniu.com/qvm/db/rds/create', pcOnly: true },
    { children: '价格计算器', href: priceCalculatorUrl, pcOnly: true },
    { href: priceUrl, children: '产品价格', mobileOnly: true }
  )

  return (
    <>
      <PageBanner
        title="云数据库"
        desc="基于七牛云积累多年的数据库研发、搭建和维护经验，为您打造高可用、高性能、即开即用、弹性伸缩的云数据库服务，拥有容灾、备份、恢复、安防、监控、迁移等全方位解决方案。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <SqlProduct />

      <Scene />

      <ProductChoose />

      <QvmCommonCases title="客户案例" />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4267/qvm-mysql-quickstart">云数据库 MySQL 使用入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/6700/polardb-quick-start">云数据库 PolarDB 使用入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/5537/create-an-instance">云数据库 SQL Server 使用入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4264/redis-userguide">云数据库 Redis 使用入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/5508/single-node-quick-start">云数据库 MongoDB 使用入门</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/qvm/manual/6830/how-to-query-and-limit-the-number-of-connections">MongoDB 如何查询及限制连接数</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/6831/screening-directing-the-problem-of-high-cpu-utilization">如何排查 MongoDB CPU 使用率高的情况</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/kb/5099/connection-on-redis">为什么云主机连接不上 Redis</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function CloudSql({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="云数据库"
      keywords="七牛云, 数据库, 云数据库, 高可用, 高性能, 弹性伸缩, 容灾, 备份, 恢复, 安防, 监控, 迁移, PolarDB, RDS MySQL, RDS SQL, Redis, MongoDB"
      description="基于七牛云积累多年的数据库研发、搭建和维护经验，为您打造高可用、高性能、即开即用、弹性伸缩的云数据库服务，拥有容灾、备份、恢复、安防、监控、迁移等全方位解决方案。"
    >
      <Page notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.CloudSql)
    }
  }
}
