import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import PageBanner from 'components/Product/PageBanner'
import Collaborate from 'components/pages/contact/Collaborate'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import Distribution from 'components/pages/contact/Distribution'
import { getGlobalBanners } from 'apis/admin/global-banners'

import { useMobile } from 'hooks/ua'

import imgBannerPc from './_images/banner-pc.jpg'
import imgBannerMobile from './_images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent() {
  const isMobile = useMobile()

  return (
    <>
      <PageBanner
        title="联系我们"
        desc="客户第一，您的满意是我们追求的目标"
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <Collaborate />
      <Distribution />
    </>
  )
}

export default function Contact({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="联系我们"
        keywords="联系, 联系七牛"
        description=""
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
