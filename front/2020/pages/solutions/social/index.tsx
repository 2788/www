/**
 * @file 社交解决方案
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Cases, { Case } from 'components/Solution/Cases'

import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Scene from 'components/pages/social/Scene'
import Advantage from 'components/pages/social/Advantage'

import imgBanner from './_images/banner.png'
import imgCase1 from './_images/case-1.png'
import imgCase2 from './_images/case-2.png'

const title = `${nameMap[Solution.Social]}解决方案`

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
        desc="七牛云社交解决方案提供端到端的一站式解决方案，助力客户快速打造属于自己的社交产品。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Advantage />

      <Section name="cases" title="客户案例">
        <Cases>
          <Case logo={imgCase1} title="bilibili" onConsult={handleConsult}>
            bilibili 是国内领先的年轻人文化社区，被粉丝亲切的称为「B 站」。七牛自 2017 年成为 bilibli 的供应商后，长期为 bilibli 提供稳定、高效的内容分发服务。
          </Case>
          <Case logo={imgCase2} title="Blued" onConsult={handleConsult}>
            Blued 是一款倡导健康生活的直播互动应用和健康教育平台。七牛云为 Blued 提供包括存储、CDN、质量数据监控等各种产品，助力 Blued 业务稳定运行。
          </Case>
        </Cases>
      </Section>

      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Geek} />
          <RelatedProduct product={Product.Kodo} />
          <RelatedProduct product={Product.Cdn} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function SocialPage({ globalBanners }: Props) {
  return (
    <Layout
      title="社交_图片社交_短视频社交_直播连麦_视频相亲_互动游戏_语音聊天室"
      keywords="社交, 图片社交, 短视频社交, 直播连麦, 视频相亲, 互动游戏, 语音聊天室"
      description="七牛云社交解决方案提供端到端的一站式解决方案，助力客户快速打造属于自己的社交产品。"
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
