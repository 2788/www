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
import ProductsForMobile from 'components/pages/index/Products'
import CloudProduct from 'components/pages/index/CloudProduct'
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

import bannerFaceidPc from './_images/banner-faceid-pc.png'
import bannerFaceidMobile from './_images/banner-faceid-mobile.png'
import bannerKodoPc from './_images/banner-kodo-pc.png'
import bannerKodoMobile from './_images/banner-kodo-mobile.png'

// TODO: 这个内容后边改为从接口来，对接 BO 的数据
const simpleBanners = [
  {
    title: '人脸核验 特惠来袭',
    bgColor: '#051B3F',
    imgPc: bannerFaceidPc,
    imgMobile: bannerFaceidMobile,
    href: 'https://marketing.qiniu.com/activity/activity-faceid?entry=index-banner'
  },
  {
    title: '对象存储 Kodo 专场特惠',
    bgColor: '#0A1048',
    imgPc: bannerKodoPc,
    imgMobile: bannerKodoMobile,
    href: 'https://marketing.qiniu.com/activity/kodopackage?entry=index-banner'
  }
]

function useBannerImg() {
  const webImgList = [Banner1Icon, Banner2Icon, Banner3Icon, Banner4Icon, Banner5Icon]
  const mobileImgList = [MobileBanner1Icon, MobileBanner2Icon, MobileBanner3Icon, MobileBanner4Icon, MobileBanner5Icon]
  const isMobile = useMobile()
  return isMobile ? mobileImgList : webImgList
}

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent() {

  const headerBannerImgs = useBannerImg()
  const isMobile = useMobile()

  // 简单内容的 banner，后边会走运营后台进行配置
  // 这部分 banner 放到代码中写死的 banner 项的前面（同老官网行为）
  const simpleBannersView = simpleBanners.map(
    ({ imgPc, imgMobile, bgColor, href }, i) => (
      <PageBanner
        key={i}
        bgImg={isMobile ? imgMobile : imgPc}
        bgColor={bgColor}
        href={href}
      />
    )
  )

  return (
    <>
      <Carousel className={styles.headerBanner} autoplay>
        {simpleBannersView}
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

      <Feature
        className={styles.core}
        title="连接数据 重塑价值"
        grey
      // 先注释，这里好像说要换句话？@yiling @jifeng
      // subtitle="成为 5G 时代的异构数据湖与数据分析平台的第一品牌"
      >
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core1Icon className={styles.coreIcon} />}
            title="异构数据湖"
          >
            <FeatureDesc>完全自主知识产权，可实现任意来源、任意规模、任意类型数据的全量获取、全量存储、多模式处理与全生命周期管理，助您在 DT 时代持续挖掘海量数据的无限价值。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core2Icon className={styles.coreIcon} />}
            title="数据传输"
          >
            <FeatureDesc>独家的 CDN 加速和质量监控体系，可实现全网一体化调度和优化，助您在性能和成本之间得到良好平衡。面向不同音视频数据特别优化的传输网络让数据实现真正闭环。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core3Icon className={styles.coreIcon} />}
            title="多媒体数据处理"
          >
            <FeatureDesc>
              独创的 AI 产品体系，以统一 API 提供服务，零运维、高可用、高性能，不仅提供图片处理、音视频转码等基础功能，基于海量数据深度学习的内容审核和 AI 分析，助您更好理解数据。
            </FeatureDesc>
          </FeatureItem>

          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core4Icon className={styles.coreIcon} />}
            title="机器数据处理"
          >
            <FeatureDesc>
              数据科技赋能是产业升级的核心，然而大量数据却未被妥善收集和分析应用，Pandora 专注于格式多样、实时生产的海量机器数据，让您不仅读懂机器，更能了解顾客的想法，成为行业的领先者。
            </FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      {isMobile ? <ProductsForMobile /> : <CloudProduct />}

      <Solutions />

      <News />

      <TryAndContact />

    </>
  )
}

export default function IndexPage() {
  return (
    <Layout
      title=""
      keywords="七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速, 七牛短视频, 七牛智能视频云, 七牛实时音视频云, 七牛数据分析平台"
      description="七牛云（隶属于上海七牛信息技术有限公司）是国内知名的云计算及数据服务提供商， 七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
    >
      <PageContent />
    </Layout>
  )
}
