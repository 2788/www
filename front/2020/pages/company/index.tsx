/**
 * @file 公司简介页面
 */

/* eslint-disable max-len */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useMobile } from 'hooks/ua'
import Layout from 'components/Product/Layout'
import Banner from 'components/Banner'
import PageNotice from 'components/Product/PageNotice'
import Navigator from 'components/Navigator'
import Section, { Provider as SectionProvider } from 'components/Product/Section'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import Timeline from 'components/company/Timeline'
import Honor from 'components/company/Honor'
import { getGlobalBanners } from 'apis/admin/global-banners'

import styles from './style.less'

import imgBanner from './_images/banner.png'
import IconCultureMan from './_images/icon-culture-man.svg'
import IconCultureProduct from './_images/icon-culture-product.svg'
import IconCultureCompany from './_images/icon-culture-company.svg'

import imgMission from './_images/mission.png'
import mobileImgMission from './_images/mission-mobile.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const isMobile = useMobile()

  return (
    <div className={styles.pageContent}>
      <Banner background={imgBanner} backgroundSize="contain" backgroundPosition="right bottom" />

      <PageNotice>
        <div className={styles.overview}>
          <div className={styles.item}>
            <div className={styles.title}>1,000,000+</div>
            <div className={styles.desc}>企业用户和开发者</div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>90%</div>
            <div className={styles.desc}>间接服务网民数</div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>2011</div>
            <div className={styles.desc}>成立</div>
          </div>
        </div>
      </PageNotice>

      <Navigator />

      <Section title="关于七牛" name="about" header="七牛是一家怎样的公司？">
        <section className={styles.about}>
          <p className={styles.passage}>七牛云（上海七牛信息技术有限公司）成立于 2011 年，作为国内知名的云计算及数据服务提供商，七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。从最初的提升客户的 IT 效能，缩短从想法到产品之间的距离，到今天更进一步致力于提升客户的数据价值效能，七牛云基于领先的云存储能力建立了统一的异构数据湖，打造了完备的视频云服务闭环，并创建了简洁开放的机器数据处理平台。七牛云始终追求为用户提供全方位的一站式云 + 数据的服务和多场景解决方案，客户数已经超过百万。</p>
          <p className={styles.passage}>作为国内第一批在 Go 语言方面进行实践的公司，七牛云是全球最早将 Go 语言大规模应用于商业化产品的团队。</p>
          <p className={styles.passage}>七牛云具有强大的产品研发能力和卓越的客户服务精神，专注云计算、音视频领域核心 PaaS 能力搭建和数据湖与数据分析产品研发，可迅速对接全国各地的服务部署实施，并以开放的心态和共赢的理念寻求与产业链伙伴的互联互补、互惠互通，共同构建中国云计算领域的科技服务生态圈。</p>
          <div className={styles.gallery}>
            <div className={styles.main} />
            <div className={styles.right1} />
            <div className={styles.right2} />
            <div className={styles.bottom1} />
            <div className={styles.bottom2} />
            <div className={styles.bottom3} />
          </div>
        </section>
      </Section>

      <div className={styles.missionWrapper}>
        <img src={isMobile ? mobileImgMission : imgMission} className={styles.img} />
        <div className={styles.missionContent}>
          <h2>企业使命</h2>
          <p className={styles.subTitle}>缩短从想法到产品之间的距离</p>
        </div>
      </div>

      <Feature name="culture" title="七牛云文化">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<IconCultureMan />}
            title="做一个简单的人"
          >
            <FeatureDesc className={styles.cultureDesc}>拥抱变化，开放协作，专注匠心，怀抱纯粹之心，专注价值实现，朝着目标不断迈进</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<IconCultureProduct />}
            title="做一款简单的产品"
          >
            <FeatureDesc className={styles.cultureDesc}>始终坚持以客户价值为导向，快速迭代，努力让用户获得体验最简、品质最高的产品与服务</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<IconCultureCompany />}
            title="做一家简单的公司"
          >
            <FeatureDesc className={styles.cultureDesc}>坚持诚信，以社会责任为己任，赢得社会信赖；打造赋能型组织，为每一位七牛人提供舞台，赢得员工信赖</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Timeline />

      <Honor />

    </div>
  )
}

export default function IntroductionPage({ globalBanners }: Props) {
  return (
    <Layout
      title="关于七牛云_七牛云公司_七牛云提供一站式云上解决方案"
      keywords="七牛云, 七牛, 关于七牛, 七牛介绍, 七牛云愿景, 七牛文化, 七牛发展历史"
      description="七牛云创立于 2011 年，总部位于上海，在北京、深圳、广州、成都、杭州、厦门、武汉等地设有分公司和研发中心。作为国内知名的云计算及数据服务提供商，七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
      globalBanners={globalBanners}
    >
      <SectionProvider startWithGrey>
        <PageContent />
      </SectionProvider>
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
