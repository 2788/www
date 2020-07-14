/**
 * @file 产品“机器数据分析平台” demo 聚合页
 */

import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import Banner, { Title } from 'components/Banner'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Link from 'components/Link'
import DemoCard from 'components/pages/pandora-demos/DemoCard'
import Breadcrumb from 'components/pages/pandora-demos/Breadcrumb'
import {
  maintenanceDemos,
  securityDemos,
  BIDemos
} from 'constants/products/pandora-demos'
import { useHash } from 'hooks/url'
import bannerImg from './_images/banner.png'
import ArrowIcon from './_images/arrow.svg'

import style from './style.less'

const BreadcrumbItem = Breadcrumb.Item

export default function ExpressDemoPage() {
  const [active, setActive] = useHash()
  useEffect(() => {
    window.scroll({ top: 0 })
  }, [])

  return (
    <Layout
      title="Pandora Demo 体验"
      keywords="Pandora, demo, demo 体验, 数据分析平台"
      description="Pandora 机器数据分析平台 Demo 在线体验"
    >
      <div className={style.demoPage}>
        <Banner
          className={style.banner}
          background={bannerImg}
          backgroundSize="cover"
          backgroundAnchor="root"
        >
          <Title className={style.title}>Demo 体验</Title>
        </Banner>
        <div className={style.mainContainer}>
          <Breadcrumb className={style.breadcrumb}>
            <BreadcrumbItem href="/products/pandora">
              Pandora 机器数据分析平台
            </BreadcrumbItem>
            <BreadcrumbItem>Demo 体验</BreadcrumbItem>
          </Breadcrumb>
          <Tabs
            value={active || 'maintenance'}
            onChange={setActive}
            contentClassName={style.tabContent}
          >
            <TabPane tab="运维监控" value="maintenance">
              {maintenanceDemos.map((item, index) => (
                <DemoCard key={index} {...item} />
              ))}
            </TabPane>
            <TabPane tab="安全分析" value="security">
              {securityDemos.map((item, index) => (
                <DemoCard key={index} {...item} />
              ))}
            </TabPane>
            <TabPane tab="BI 分析" value="BI">
              {BIDemos.map((item, index) => (
                <DemoCard key={index} {...item} />
              ))}
            </TabPane>
          </Tabs>
          <div className={style.footer}>
            <Link href="https://pandora-express.qiniu.com/apps">
              <span>更多详情见应用市场</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
