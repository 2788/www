import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import { RawAccessProcess, Step } from 'components/Product/AccessProcess'
import Section, { Provider as SectionProvider, SectionArrowLink } from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'
import Arch from 'components/pages/partner/Arch'
import Benefit from 'components/pages/partner/Benefit'

import imgBannerPc from './_images/banner-pc.jpg'
import imgBannerMobile from './_images/banner-mobile.jpg'
import Step1 from './_images/step1.svg'
import Step2 from './_images/step2.svg'
import Step3 from './_images/step3.svg'
import Step4 from './_images/step4.svg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  const isMobile = useMobile()

  const btns = useBtns(
    { children: '加入合作伙伴', href: 'https://jinshuju.net/f/ueonw5' },
    { children: '登录管理后台', href: 'https://portal.qiniu.com/invitation', pcOnly: true }
  )

  return (
    <>
      <PageBanner
        title="七牛合作伙伴与生态"
        desc=""
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <SectionProvider startWithGrey>
        <Section title="七牛云伙伴申请流程" name="apply" grey>
          <RawAccessProcess>
            <Step icon={<Step1 />}>1. 注册七牛云账号</Step>
            <Step icon={<Step2 />}>2. 企业实名认证</Step>
            <Step icon={<Step3 />}>3. 完成伙伴资质认证</Step>
            <Step icon={<Step4 />}>4. 成为七牛云合作伙伴</Step>
          </RawAccessProcess>
          <SectionArrowLink href="https://jinshuju.net/f/ueonw5">立即加入</SectionArrowLink>
        </Section>

        <Arch />

        <Benefit />
      </SectionProvider>
    </>
  )
}

export default function Main({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="七牛合作伙伴与生态"
        keywords="合作伙伴, 生态, 七牛云, 合作伙伴与生态, 七牛合作伙伴生态, 七牛代理合作伙伴, 行业开拓"
        description="七牛合作伙伴与生态，加入七牛合作伙伴生态，完善的培训与支持体系，专家技术支持，品牌背书，并有各种各样的内部分享会等，欢迎加入七牛合作伙伴与生态"
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
