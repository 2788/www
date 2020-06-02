/**
 * @file 公司简介页面
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import Banner, { Title, Desc } from 'components/Banner'
import PageNotice from 'components/Product/PageNotice'
import Navigator from 'components/Navigator'
import Section from 'components/Product/Section'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import Timeline from 'components/company/Timeline'
import Honor from 'components/company/Honor'

import styles from './style.less'

import banner from './_images/banner-icon.file.svg'
import Culture1Img from './_images/culture1.svg'
import Culture2Img from './_images/culture2.svg'
import Culture3Img from './_images/culture3.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  return (
    <>
      <Banner background={banner}>
        <Title>连接数据 重塑价值</Title>
        <Desc>我们的使命是：用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量<br /><br />
          我们的愿景是：成为 5G 时代的异构数据湖与数据分析平台的第一品牌</Desc>
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
          <p className={styles.passage}>七牛云创立于 2011 年，总部位于上海，在北京、深圳、广州、成都、杭州、厦门、武汉等地设有分公司和研发中心。作为国内知名的云计算及数据服务提供商，
            七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。</p>
          <p className={styles.passage}>经过八年的技术沉淀和打磨，七牛云紧跟音视频行业发展趋势，提供了一套音视频领域端到端的一站式服务。数据的采集、上传、存储、处理、分析都可以在七牛云平台完成。
            目前，已经有超过 100 万企业客户和开发者长期使用七牛云的音视频服务，其中包括 OPPO、B 站、爱奇艺、平安银行、招商银行等知名企业，间接覆盖了 90% 的中国网民。</p>
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

      <Feature grey name="culture" title="七牛云文化">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<Culture3Img className={styles.coreIcon} />}
            title="价值观与文化"
          >
            <FeatureDesc>简单，可信赖，客户第一<br />极客精神、开放协作、拥抱变化<br />坚韧、诚信、激情</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<Culture1Img className={styles.coreIcon} />}
            title="使命"
          >
            <FeatureDesc>用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="center"
            icon={<Culture2Img className={styles.coreIcon} />}
            title="愿景"
          >
            <FeatureDesc>成为 5G 时代的异构数据湖与数据分析平台的第一品牌</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Timeline />

      <Honor />

    </>
  )
}

export default function IntroductionPage() {
  return (
    <Layout title="公司介绍">
      <PageContent />
    </Layout>
  )
}
