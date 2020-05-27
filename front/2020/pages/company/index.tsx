/**
 * @file 公司简介页面
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import Timeline from 'components/company/Timeline'

import styles from './style.less'

import BannerIcon from './_images/banner-icon.svg'
import Culture1Img from './_images/culture1.svg'
import Culture2Img from './_images/culture2.svg'
import Culture3Img from './_images/culture3.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  return (
    <>
      <PageBanner
        title="连接数据 重塑价值"
        desc="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量"
        bgColor="#34A1EC"
        icon={<BannerIcon />}
      />

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

      <div className={styles.nav}><Navigator /></div>

      <Section title="关于七牛" name="about" header="七牛是一家怎样的公司？">
        <section className={styles.about}>
          <p className={styles.passage}>七牛云创立于 2011 年，是国内知名的云计算及数据服务提供商，持续在海量文件存储、CDN 内容分发、视频点播、
            互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。</p>
          <p className={styles.passage}>从最初的提升客户的 IT 效能，缩短从想法到产品之间的距离，到今天更进一步致力于提升客户的 DT 效能，七牛云基于领先的云存储能力建立了统一的异构数据湖，
            打造了完备的视频云服务闭环，并创建了简洁开放的机器数据处理平台。</p>
          <p className={styles.passage}>七牛云始终追求为用户提供全方位的一站式云 + 数据的服务和多场景解决方案，客户数已经超过百万。</p>
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

      <Feature grey name="advantages" title="功能与优势">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Culture1Img className={styles.coreIcon} />}
            title="做一个简单的人"
          >
            <FeatureDesc>以认定方向为坚持目标，以奋斗者为发展根本，坚持劳有所得，多劳多得，赢得员工的信赖。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Culture2Img className={styles.coreIcon} />}
            title="做一款简单的产品"
          >
            <FeatureDesc>以客户为中心，以结果为导向，坚持化繁为简，追求极致，赢得客户的信赖。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Culture3Img className={styles.coreIcon} />}
            title="做一家简单的公司"
          >
            <FeatureDesc>以社会责任为己任，以公司信用为重要资产，坚持言出必行，诚实守信，赢得社会的信赖。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Timeline />

    </>
  )
}

export default function IntroductionPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
