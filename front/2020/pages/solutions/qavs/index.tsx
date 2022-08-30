/**
 * @file 解决方案”智能视频云“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import QavsFeature from 'components/pages/qavs/Feature'
import QavsArch from 'components/pages/qavs/Arch'
import QavsScene from 'components/pages/qavs/Scene'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { getGlobalBanners } from 'apis/admin/global-banners'

import { categoryMedia } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import { useBtns } from 'hooks/product-btn'

import imgBanner from './images/banner.png'

const title = nameMap[Solution.Qavs]

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent() {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' },
    { href: 'https://dn-mars-assets.qbox.me/lsm7Yon7_XwirC_mGIQvRe1Fmkx3', children: '下载白皮书' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，
        并集海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能于一体。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="音视频 SDK 下载" href="https://developer.qiniu.com/rtn/sdk/4330/download-the-sdk">
            音视频 SDK 下载
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>{btns.nav}</Navigator>

      <QavsArch />

      <QavsFeature />

      <QavsScene />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          {
            categoryMedia.map(product => <RelatedProduct key={product} product={product} />)
          }
        </Related>
      </Section>

    </>
  )
}

export default function QavsPage({ globalBanners }: Props) {
  return (
    <Layout
      title="智能视频云_视频解决方案_视觉智能_实时音视频"
      keywords="智能视频云, 智能视频, 视频云, 视频云服务, 视频云存储, 视频云平台"
      description="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，并集海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能于一体。"
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
