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

import { useMobile } from 'hooks/ua'

import Activities from 'components/pages/index/Activities'
import ProductsForMobile from 'components/pages/index/Products'
import CloudProduct from 'components/pages/index/CloudProduct'
import Solutions from 'components/pages/index/Solutions'
import News from 'components/pages/index/News'
import TryAndContact from 'components/pages/index/TryAndContact'
import { getBanners, Banner, getActivities, Activity, getNews, NewsType } from 'apis/admin/homepage'

import styles from './style.less'

import YigouCoreIcon from './_images/core1.svg'
import ChuanshuCoreIcon from './_images/core2.svg'
import ShijueCoreIcon from './_images/core3.svg'
import JiqiIcon from './_images/core4.svg'
import ZhiboCoreIcon from './_images/core5.svg'
import YunCoreIcon from './_images/core6.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent({ banners, activities, news }: { banners: Banner[], activities: Activity[], news: NewsType[] }) {

  const isMobile = useMobile()

  return (
    <>
      <Carousel className={styles.headerBanner} autoplay>
        {
          banners.map(({ name, pcImg, mobileImg, backgroundColor, link }: Banner) => (
            <PageBanner
              key={name}
              bgImg={isMobile ? mobileImg : pcImg}
              bgColor={backgroundColor}
              href={link}
            />
          ))
        }
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
            icon={<YigouCoreIcon />}
            title="异构数据湖"
          >
            <FeatureDesc>完全自主知识产权，可实现任意来源、任意规模、任意类型数据的全量获取、全量存储、多模式处理与全生命周期管理，助您在 DT 时代持续挖掘海量数据的无限价值。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<ShijueCoreIcon />}
            title="视觉数据处理"
          >
            <FeatureDesc>
              独创的 AI 产品体系，以统一 API 提供服务，零运维、高可用、高性能，不仅提供图片处理、音视频转码等基础功能，基于海量数据深度学习的内容审核和 AI 分析，助您更好理解数据。
            </FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<JiqiIcon />}
            title="机器数据处理"
          >
            <FeatureDesc>
              数据科技赋能是产业升级的核心，然而大量数据却未被妥善收集和分析应用，Pandora 专注于格式多样、实时生产的海量机器数据，让您不仅读懂机器，更能了解顾客的想法，成为行业的领先者。
            </FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<ZhiboCoreIcon />}
            title="互动直播"
          >
            <FeatureDesc>
              全新一站式“多路音视频互动”解决方案，实现连麦、直播、美颜滤镜与 IM 完美融合，通过七牛自主研发的 QRTC SDK 打造跨平台一对多、多对多的超清互动直播场景。
            </FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<ChuanshuCoreIcon />}
            title="数据传输"
          >
            <FeatureDesc>独家的 CDN 加速和质量监控体系，可实现全网一体化调度和优化，助您在性能和成本之间得到良好平衡。面向不同音视频数据特别优化的传输网络让数据实现真正闭环。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<YunCoreIcon />}
            title="云主机服务"
          >
            <FeatureDesc>
              云主机秒级创建，海量计算资源瞬间获得，完美相应业务需求，随时调整配置，多种计费模式灵活选择，无缝衔接丰富产品，持续为业务发展提供完整的计算、储存、安全等解决方案。
            </FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      {isMobile ? <ProductsForMobile /> : <CloudProduct />}

      <Solutions />

      <News news={news} />

      <TryAndContact />

    </>
  )
}

export default function IndexPage({ banners, activities, news }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title=""
      keywords="七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速, 七牛短视频, 七牛智能视频云, 七牛实时音视频云, 七牛数据分析平台"
      description="七牛云（隶属于上海七牛信息技术有限公司）是国内知名的云计算及数据服务提供商， 七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
    >
      <PageContent banners={banners} activities={activities} news={news} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      banners: await getBanners(),
      activities: await getActivities(),
      news: await getNews()
    }
  }
}
