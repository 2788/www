/**
 * @file 产品“dora”
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { headerThemeContext } from 'components/Header/Pc'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useApiWithParams } from 'hooks/api'
import { useBtns } from 'hooks/product-btn'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import DoraCore from 'components/pages/dora/Core'
import DoraScene from 'components/pages/dora/Scene'
import DoraFunctions from 'components/pages/dora/Functions'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import { useMobile } from 'hooks/ua'

import Customer1Icon from './_images/客户-聚美.png'
import Customer2Icon from './_images/客户-大疆.png'
import Customer3Icon from './_images/客户-blue.png'
import Customer4Icon from './_images/客户-流利说.png'
import Customer5Icon from './_images/客户-唱吧.png'
import Customer6Icon from './_images/客户-虎扑.png'
import Customer7Icon from './_images/客户-房多多.png'
import Customer8Icon from './_images/客户-小红书.png'

import bgImgUrl from './_images/banner.jpg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const isMobile = useMobile()

  const priceUrl = urlForPrice(Product.Dora)

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/dora/media-gate/overview', children: '立即使用', pcOnly: true, type: 'primary' },
    { href: priceUrl, children: '产品价格', type: isMobile ? 'primary' : 'primary-hollow' },
    { href: 'https://developer.qiniu.com/dora?source_page=dora', children: '帮助文档' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Dora]
  })

  return (
    <>
      <PageBanner
        title="智能多媒体服务"
        desc="智能多媒体服务（Dora），是一种零运维、高可用、高性能的多媒体数据处理服务。提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签。"
        bgColor="#18243C"
        btns={btns.banner}
        bgImgUrl={bgImgUrl} />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      <DoraFunctions />

      <DoraCore />

      <DoraScene />

      <CustomerCaseGroup>
        <CustomerCase pic={Customer1Icon} />
        <CustomerCase pic={Customer2Icon} />
        <CustomerCase pic={Customer3Icon} />
        <CustomerCase pic={Customer4Icon} />
        <CustomerCase pic={Customer5Icon} />
        <CustomerCase pic={Customer6Icon} />
        <CustomerCase pic={Customer7Icon} />
        <CustomerCase pic={Customer8Icon} />
      </CustomerCaseGroup>

      <ProductNews newsRes={newsRes} />

      <LinkGroups>
        <LinkGroup title="用户指南">
          <LinkItem href="https://developer.qiniu.com/dora?source_page=dora&ref=www.qiniu.com">如何使用智能多媒体服务</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及文档">
          <LinkItem href="https://developer.qiniu.com/dora/tools/1222/qdoractl?source_page=dora">快速实现 API 调用及 SDK 集成开发</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/faq?space=dora&source_page=dora">智能多媒体服务使用过程中常遇到的问题</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="注册即可免费试用智能多媒体服务"
      >
        <UsageGuideButton href="https://portal.qiniu.com/create?source_page=dora">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function DoraPage({ globalBanners, ...pageProps }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="智能多媒体服务_图片处理_音视频转码_水印截图_瘦身处理"
        keywords="图片处理, 音视频处理, 智能识别, 视频分析, 视频画质优化, 智能审核, 版权保护, 音视频转码, 图片瘦身"
        description="智能多媒体服务（Dora），是一种零运维、高可用、高性能的多媒体数据处理服务。提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签。"
        globalBanners={globalBanners}
      >
        <PageContent {...pageProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Dora),
      newsRes: await getNews({ product: Product.Dora }),
      globalBanners: await getGlobalBanners()
    }
  }
}
