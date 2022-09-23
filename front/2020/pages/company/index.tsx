/**
 * @file 公司简介页面
 */

/* eslint-disable max-len */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useMobile } from 'hooks/ua'
import Layout from 'components/Product/Layout'
import Banner, { Title } from 'components/Banner'
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
      <Banner background={imgBanner} backgroundSize="contain" backgroundPosition="right bottom" >
        <Title className={styles.bannerTitle}>一站式场景化智能视频云</Title>
      </Banner>

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
          <p className={styles.passage}>七牛云（上海七牛信息技术有限公司）成立于 2011 年，公司致力于打造全球领先的一站式场景化智能音视频服务，总部位于上海，同时在北京、深圳、广州、成都、杭州、厦门、武汉等地设有分部，公司累计融资超 30 亿人民币，股东包括经纬中国、启明创投、张江高科、中国国有企业结构调整基金等明星机构。</p>
          <p className={styles.passage}>七牛云成立以来围绕数字化浪潮下的在线音视频需求，基于强大的云边一体化能力和低代码能力，深耕视频点播、互动直播、实时音视频、摄像头上云等领域，提供面向场景的音视频服务，赋能产业数字化转型。目前，公司公有云管理文件数超 1 万亿；覆盖全球节点近 3000 个；每日直播与实时互动时长超 2.3 亿分钟；企业客户和开发者数量超过 100 万，广泛分布在互联网、广电与新媒体、汽车、金融、生命科学、智能制造等行业，包括 OPPO 、爱奇艺、平安银行、招商银行、上汽集团、芒果 TV 等知名企业。</p>
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
      description="七牛云创立于 2011 年，总部位于上海，在北京、深圳、广州、成都、杭州、厦门等地设有分公司和研发中心。作为国内知名的云计算及数据服务提供商，七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
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
