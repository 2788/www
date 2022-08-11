/**
 * @file 解决方案”监控视频边缘存储“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import GeneAdvantage from 'components/pages/gene/Advantage'
import GeneScene from 'components/pages/gene/Scene'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { useBtns } from 'hooks/product-btn'
import GeneArch from 'components/pages/gene/Arch'
import { getGlobalBanners } from 'apis/admin/global-banners'
import imgBanner from './images/banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = '基因测序行业解决方案'

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
        desc="生物技术的发展和逐步成熟使得生物信号转换成数字信号已经相对容易，生物技术不再是限制基因测序行业发展的主要瓶颈。基因测序行业的快速发展使得基因测序服务提供商、独立软件提供商（ISV）和科学研究机构所面对的生物信息处理工作量显著增加，使得计算、存储需求不断扩大。云计算、云存储技术被广泛应用到生物信息数据的处理当中。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <GeneScene />

      <GeneArch />

      <GeneAdvantage />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function GenePage({ globalBanners }: Props) {
  return (
    <Layout
      title="基因测序行业解决方案"
      keywords="基因测序、生命科学、云计算、云存储、七牛云"
      description="生物技术的发展和逐步成熟使得生物信号转换成数字信号已经相对容易，生物技术不再是限制基因测序行业发展的主要瓶颈。基因测序行业的快速发展使得基因测序服务提供商、独立软件提供商（ISV）和科学研究机构所面对的生物信息处理工作量显著增加，使得计算、存储需求不断扩大，云计算、云存储技术被广泛应用到生物信息数据的处理当中。为满足基因测序行业客户对计算、存储等基础技术快速增长需求，七牛云为行业客户提供弹性可扩展的云计算资源，为海量生信数据提供多级存储解决方案。"
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
