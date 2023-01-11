/**
 * @file 解决方案”视频冷存储“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import VcsFeature from 'components/pages/vcs/Feature'
import Navigator from 'components/Product/Navigator'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import VcsIndustry from 'components/pages/vcs/Industry'
import VcsAdvantage from 'components/pages/vcs/Advantage'
import VcsScene from 'components/pages/vcs/Scene'
import VcsCase from 'components/pages/vcs/Case'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { getGlobalBanners } from 'apis/admin/global-banners'

import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'

import imgBannerPc from './images/banner-pc.jpg'
import imgBannerMobile from './images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = `${nameMap[Solution.Vcs]}解决方案`

function PageContent() {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()
  const isMobile = useMobile()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' },
    { href: '/products/kodo', children: '了解更多' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛云视频冷存储解决方案是专为综合视频平台打造的 EB 级数据存储解决方案，
        低成本高可用，有效帮助客户承载突发流量，控制访问延时，优化写入性能。"
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <VcsFeature />

      <Navigator>{btns.nav}</Navigator>

      <VcsIndustry />

      <VcsAdvantage />

      <VcsScene />

      <VcsCase />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function VcsPage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title={title}
        keywords="视频冷存储, 冷备, 冷存储, 归档存储, 点播存储, 高清视频原片, 媒体资源库"
        description="七牛云视频冷存储解决方案是专为综合视频平台打造的 EB 级数据存储解决方案，低成本高可用，有效帮助客户承载突发流量，控制访问延时，优化写入性能。"
        globalBanners={globalBanners}
      >
        <PageContent />
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
