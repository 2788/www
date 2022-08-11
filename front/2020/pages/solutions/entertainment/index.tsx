/**
 * @file 泛娱乐解决方案
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Solution, nameMap } from 'constants/solutions'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'

import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Scene from 'components/pages/entertainment/Scene'
import Advantage from 'components/pages/entertainment/Advantage'

import imgBanner from './_images/banner.png'
import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'

const title = `${nameMap[Solution.Entertainment]}解决方案`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent() {
  const { startIntentConsulting } = useFeedbackModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛云提供泛娱乐一站式解决方案，覆盖内容生产、处理、审核、存储、分发的全业务流程，助力企业快速构建泛娱乐应用。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Advantage />

      <Section name="cases" title="客户案例" withTailPadding>
        <Cases>
          <Case logo={imgCase1} title="爱奇艺" onConsult={handleConsult}>
            爱奇艺（iQIYI.COM）是拥有海量、优质、高清的网络视频的大型视频网站。七牛云为爱奇艺提供 CDN 加速等多种服务，助力爱奇艺将视频内容更快速地分到到各地用户。
          </Case>
          <Case logo={imgCase2} title="懂球帝" onConsult={handleConsult}>
            懂球帝是一款提供全球体育足球新闻、深度报道、足球社区的手机 App。七牛云为懂球帝提供存储及 CDN 加速功能，助力懂球帝实现海量内容的稳定存储和快速分发。
          </Case>
        </Cases>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EntertainmentPage({ globalBanners }: Props) {
  return (
    <Layout
      title="泛娱乐_兴趣社区_长视频点播_秀场直播_游戏直播_赛事直播_电台播客"
      keywords="泛娱乐, 兴趣社区, 长视频点播, 秀场直播, 游戏直播, 赛事直播, 电台播客"
      description="七牛云提供泛娱乐一站式解决方案，覆盖内容生产、处理、审核、存储、分发的全业务流程，助力企业快速构建泛娱乐应用。"
      globalBanners={globalBanners}
    >
      <PageContent />
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
