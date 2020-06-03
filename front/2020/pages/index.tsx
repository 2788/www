/**
 * @file 首页内容
 */

import React from 'react'

import Carousel from 'react-icecream/lib/carousel'

import Layout from 'components/Layout'
import PageBanner from 'components/pages/index/PageBanner'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/pages/index/Feature'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'

import Activities from 'components/pages/index/Activities'
import Product from 'components/pages/index/Products'
import Solutions from 'components/pages/index/Solutions'
import News from 'components/pages/index/News'
import TryAndContact from 'components/pages/index/TryAndContact'

import styles from './style.less'

import Banner1Icon from './_images/headerBanner1.png'
import Banner2Icon from './_images/headerBanner2.png'
import Banner3Icon from './_images/headerBanner3.png'
import Banner4Icon from './_images/headerBanner4.png'
import Banner5Icon from './_images/headerBanner5.png'
import MobileBanner1Icon from './_images/mobileHeaderBanner1.png'
import MobileBanner2Icon from './_images/mobileHeaderBanner2.png'
import MobileBanner3Icon from './_images/mobileHeaderBanner3.png'
import MobileBanner4Icon from './_images/mobileHeaderBanner4.png'
import MobileBanner5Icon from './_images/mobileHeaderBanner5.png'
import Core1Icon from './_images/core1.svg'
import Core2Icon from './_images/core2.svg'
import Core3Icon from './_images/core3.svg'
import Core4Icon from './_images/core4.svg'

function useBannerImg() {
  const webImgList = [Banner1Icon, Banner2Icon, Banner3Icon, Banner4Icon, Banner5Icon]
  const mobileImgList = [MobileBanner1Icon, MobileBanner2Icon, MobileBanner3Icon, MobileBanner4Icon, MobileBanner5Icon]
  const isMobile = useMobile()
  return isMobile ? mobileImgList : webImgList
}

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const headerBannerImgs = useBannerImg()

  return (
    <>
      <Carousel className={styles.headerBanner} autoplay>
        <PageBanner
          className={styles.bannerKodoOversea}
          title={<>海外云存储 <strong>优惠专场</strong></>}
          desc={<><strong>免费套餐</strong> 任你选 出海快人一步</>}
          bgColor="#0A1639"
          bgImg={headerBannerImgs[0]}
          btns={[
            <Button
              key="1"
              className={styles.btnKodoOverseaPrimary}
              href="/products/kodo/goglobal?entry=index-banner"
              type="default"
            >
              查看详情
            </Button>
          ]}
        />
        <PageBanner
          title="私有云存储"
          desc="企业数字资产的管理专家"
          bgColor="#20176B"
          bgImg={headerBannerImgs[1]}
          btns={[
            <Button
              key="1"
              className={styles.btnKodoePrimary}
              href="/products/private-cloud-kodo?entry=index-banner"
              type="default"
            >
              查看详情
            </Button>,
            <Button
              key="2"
              className={styles.btnKodoeHollow}
              href="https://developer.qiniu.com/kodoe/manual/5867/a-free-trial"
              type="primary-hollow"
              withBorder
            >
              下载试用
            </Button>
          ]}
        />
        <PageBanner
          className={styles.bannerQuery}
          title={<>数据分析平台 <span className={styles.upgrade}>重磅升级</span></>}
          desc={<>新功能 <strong>业务链路关联查询</strong> 为您还原业务路径、全面分析业务</>}
          bgColor="#2C6DD2"
          bgImg={headerBannerImgs[2]}
          btns={[
            <>
              <Button
                key="1"
                className={styles.btnQueryPrimary}
                href="/products/pandora?entry=index-banner"
                type="default"
              >
                免费体验
              </Button>
              <p className={styles.tip}>更多新功能持续放出中</p>
            </>
          ]}
        />
        <PageBanner
          title="转码时长包 年中优惠来袭"
          desc="为您还原业务路径、全面分析业务"
          bgColor="#ED5620"
          bgImg={headerBannerImgs[3]}
          btns={[
            <Button
              key="1"
              className={styles.btnTransCodePrimary}
              href="/events/dora-package?entry=index-banner"
              type="default"
            >
              查看详情
            </Button>
          ]}
        />
        <PageBanner
          className={styles.bannerUpClouds}
          title={<>企业 <strong className={styles.cost}>0</strong> 成本上云</>}
          desc={<>最高可达 <strong>4 核 8 G</strong></>}
          bgColor="#5708C6"
          bgImg={headerBannerImgs[4]}
          btns={[
            <Button
              key="1"
              className={styles.btnReceivePrimary}
              href="https://marketing.qiniu.com/activity/618activity?entry=index-banner&ref=www.qiniu.com"
              type="default"
            >
              立即领取
            </Button>
          ]}
        />
      </Carousel>

      <Activities />

      <Product />

      <Solutions />

      <Feature
        className={styles.core}
        grey
        title="连接数据 重塑价值"
        subtitle="成为 5G 时代的异构数据湖与数据分析平台的第一品牌"
      >
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core1Icon className={styles.coreIcon} />}
            title="海量存储"
          >
            <FeatureDesc>所有数据都有有效期，面对不断膨胀的数据领域，数据如何管理？七牛云完全自主知识产权的对象存储，已经过较严酷的考验，为 EB 规模的数据存储做好充分准备。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core2Icon className={styles.coreIcon} />}
            title="数据洞察"
          >
            <FeatureDesc>让数据从负担变成资产的关键步骤是数据的价值挖掘。七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core3Icon className={styles.coreIcon} />}
            title="加速传输"
          >
            <FeatureDesc>七牛独家的 CDN 加速和监控体系，实现全网一体化调度和优化，让您能够在性能和成本之间得到一个良好的平衡。</FeatureDesc>
          </FeatureItem>

          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core4Icon className={styles.coreIcon} />}
            title="高性能计算"
          >
            <FeatureDesc>为了能让数据流转，我们需要对数据进行高速处理。七牛云构建了基于容器的计算平台，并基于容器平台构建了功能丰富且开放性的智能媒体云平台。
              您只需考虑怎么处理数据，而无需考虑数据的规模和系统性能。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <News />

      <TryAndContact />

    </>
  )
}

export default function IndexPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
