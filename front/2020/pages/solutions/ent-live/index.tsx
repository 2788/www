/**
 * @file    企业直播解决方案
 * @author  zhangqiang
 */
/* eslint-disable max-len */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { useMobile } from 'hooks/ua'
import { headerThemeContext } from 'components/Header/Pc'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import Cases, { Case } from 'components/Solution/Cases'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Scene from 'components/pages/Entlive/Scene'
import Advantage from 'components/pages/Entlive/Advantage'
import Architecture from 'components/pages/Entlive/Architecture'

import pcBanner from './banner.jpg'
import mobileBanner from './banner-mobile.jpg'

import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'
import imgCase3 from './_images/case-3.png'

const title = `${nameMap[Solution.EntLive]}解决方案`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {

  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛云企业直播解决方案，覆盖营销、带货、企业培训、活动直播等场景。无需开发即可使用，帮助企业快速集成和接入直播服务，支持与企业自有的会员系统、商城系统进行对接。丰富的营销互动及数据分析能力，帮助企业实现内容生产、直播数据与流量三方面的闭环。"
        btns={btns.banner}
        bgImgUrl={isMobile ? mobileBanner : pcBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Advantage />

      <Architecture />

      <Section name="cases" title="客户案例" withTailPadding>
        <Cases>
          <Case logo={imgCase1} title="复星健康" onConsult={showWechatConsultModal}>
            复星健康的每个业务线都有不同的直播场景，培训、营销、科普，七牛云企业直播方案具备 SaaS 层到 APaaS 层的能力，支持定制开发，实现了多层次的直播需求。同时提供了子账号和讲师账号，满足了不同部门和合作医院的运营需求。
          </Case>
          <Case logo={imgCase2} title="东莞证券" onConsult={showWechatConsultModal}>
            七牛云为东莞证券提供从底层资源到上层功能全链路自主可控的业务价值，实现了微信、H5、PC、APP 多终端的直播与观看。
          </Case>
        </Cases>
        <Cases>
          <Case logo={imgCase3} title="三节课" onConsult={showWechatConsultModal}>
            七牛云企业直播方案与三节课会员系统打通，实现了会员课程智能推荐，并通过接口追踪观看行为记录，进行课后复盘，提升课程质量。
          </Case>
        </Cases>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EntlivePage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title={`${title}_通用解决方案`}
        keywords="企业直播,营销直播,带货直播,电商带货,活动直播,培训直播,快速集成,SaaS,私有化部署"
        description="七牛云企业直播解决方案，覆盖营销、带货、企业培训、活动直播等场景。无需开发即可使用，帮助企业快速集成和接入直播服务，支持与企业自有的会员系统、商城系统进行对接。丰富的互营销互动及数据分析能力，帮助企业实现内容生产、直播数据与流量三方面的闭环。"
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
