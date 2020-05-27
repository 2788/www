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

import BannerIcon from './_images/headerBanner.png'
import Banner1Icon from './_images/headerBanner1.png'
import Banner2Icon from './_images/headerBanner2.png'
import MobileBannerIcon from './_images/mobileHeaderBanner.png'
import MobileBanner1Icon from './_images/mobileHeaderBanner1.png'
import MobileBanner2Icon from './_images/mobileHeaderBanner2.png'
import Core1Icon from './_images/core1.svg'
import Core2Icon from './_images/core2.svg'
import Core3Icon from './_images/core3.svg'
import Core4Icon from './_images/core4.svg'

function useBannerImg() {
  const webImgList = [BannerIcon, Banner1Icon, Banner2Icon]
  const mobileImgList = [MobileBannerIcon, MobileBanner1Icon, MobileBanner2Icon]
  const isMobile = useMobile()
  return isMobile ? mobileImgList : webImgList
}

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const headerBannerImgs = useBannerImg()

  return (
    <>
      <Carousel className={styles.headerBanner}>
        <PageBanner
          title={<span className={styles.headerBannerTitle}>海外云存储 优惠专场</span>}
          desc={<span className={styles.headerBannerDesc}>免费套餐 任你选 出海快人一步</span>}
          bgColor="#0A1639"
          bgImg={headerBannerImgs[1]}
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
          title={<span className={styles.headerBannerTitle}>私有云存储</span>}
          desc={<span className={styles.headerBannerDesc}>企业数字资产的管理专家</span>}
          bgColor="#20176B"
          bgImg={headerBannerImgs[2]}
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
      </Carousel>

      <Activities />

      <Feature className={styles.core} title="连接数据 重塑价值" subtitle="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量">
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

      <Product />

      <Solutions />

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
