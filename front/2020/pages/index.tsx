/**
 * @file 首页内容
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

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
import { useNow } from 'hooks/timer'

import Activities from 'components/pages/index/Activities'
import ProductsForMobile from 'components/pages/index/Products'
import CloudProduct from 'components/pages/index/CloudProduct'
import Solutions from 'components/pages/index/Solutions'
import News from 'components/pages/index/News'
import TryAndContact from 'components/pages/index/TryAndContact'
import { getBanners, Banner, getActivities, Activity } from 'apis/lego'

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

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent({ banners, activities }: { banners: Banner[], activities: Activity[] }) {

  const headerBannerImgs = useBannerImg()
  const isMobile = useMobile()

  const now = useNow()
  // 这部分 banner 放到代码中写死的 banner 项的前面（同老官网行为）
  const bannersView = banners.filter(
    banner => new Date(banner.effect_at).valueOf() <= now && new Date(banner.dead_at).valueOf() > now
  ).map(
    ({ mobile_image_src, image_src, color, link, id }) => (
      <PageBanner
        key={id}
        bgImg={isMobile ? mobile_image_src : image_src}
        bgColor={color}
        href={link}
      />
    )
  )

  return (
    <>
      <Carousel className={styles.headerBanner} autoplay>
        {bannersView}
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
              href="https://www.qiniu.com/events/qvm0rmb?entry=index-banner"
              type="default"
            >
              立即领取
            </Button>
          ]}
        />
      </Carousel>

      <Activities activities={activities} />

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

export default function IndexPage({ banners, activities }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title=""
      keywords="七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速, 七牛短视频, 七牛智能视频云, 七牛实时音视频云, 七牛数据分析平台"
      description="七牛云（隶属于上海七牛信息技术有限公司）是国内知名的云计算及数据服务提供商， 七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
    >
      <PageContent banners={banners} activities={activities} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      banners: await getBanners({ page_size: 10 }),
      activities: await getActivities({ page_size: 4 })
    }
  }
}
