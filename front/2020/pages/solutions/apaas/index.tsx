
/**
 * @file 音视频低代码工厂
 * @author  zhangqiang
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import Cases, { Case } from 'components/Solution/Cases'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'
import { headerThemeContext } from 'components/Header/Pc'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { useMobile } from 'hooks/ua'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/apaas/Advantage'
import Scene from 'components/pages/apaas/Scene'
import Code from 'components/pages/apaas/Code'

import styles from './style.less'

import pcBanner from './banner.jpg'
import mobileBanner from './banner-mobile.jpg'

import imgCase1 from './_images/case1.jpg'
import imgCase2 from './_images/case2.jpg'
import imgCase3 from './_images/case3.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = nameMap[Solution.Apaas]

function Page() {

  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询', type: 'primary' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛音视频低代码工厂覆盖泛娱乐互动直播、电商直播带货、语聊房、在线教育等多应用场景，基于七牛云音视频、AI智能算法和网络等先进技术，提供易接入、强扩展、高效部署和覆盖多场景的音视频服务，助力企业快速搭建高品质的专属音视频业务平台。"
        bgColor="#213149"
        btns={btns.banner}
        bgImgUrl={isMobile ? mobileBanner : pcBanner} />

      <Navigator>{btns.nav}</Navigator>

      <Advantage />

      <Scene />

      <Code />

      <Section name="cases" title="客户案例">
        <Cases>
          <Case logo={imgCase1} title="华商网" onConsult={showWechatConsultModal} logoClassName={styles.logo}>
            <div className={styles.desc}>七牛低代码方案帮助华商网快速实现直播、连线等功能开发，为华商网“应用驱动，产品致胜”的发展理念提供支撑。</div>
          </Case>
          <Case logo={imgCase2} title="心跳觅友" onConsult={showWechatConsultModal} logoClassName={styles.logo}>
            <div className={styles.desc}>七牛低代码方案助力心跳觅友 App 快速上线，为用户提供一对一的视频通话社交服务。</div>
          </Case>
          <Case logo={imgCase3} title="心尚臻品" onConsult={showWechatConsultModal} logoClassName={styles.logo}>
            <div className={styles.desc}>七牛低代码方案助力心尚臻品 App 快速上线直播带货功能板块。</div>
          </Case>
        </Cases>
      </Section>

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Geek} />
          <RelatedProduct product={Product.Qvs} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function ApaasPage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title={title}
        keywords="互动直播,连麦,带货直播,电商带货,直播带货,低代码,快速集成,电商直播带货,语聊房,互动课堂,在线监考,连麦 PK"
        description="七牛音视频低代码工厂覆盖泛娱乐互动直播、电商直播带货、语聊房、在线教育等多应用场景，基于七牛云音视频、AI智能算法和网络等先进技术，提供易接入、强扩展、高效部署和覆盖多场景的音视频服务，助力企业快速搭建高品质的专属音视频业务平台。 IT 基础架构建设与运维成本。以高性能、高可扩展、高可靠、高资源利用率的存储能力和对软、硬件资源统一管理能力，帮助企业轻松管理和智能处理 EB 级海量数据。"
        globalBanners={globalBanners}
      >
        <Page />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
