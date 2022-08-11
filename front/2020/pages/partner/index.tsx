import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import Banner, * as banner from 'components/Banner'
import Button from 'components/UI/Button'
import { RawAccessProcess, Step } from 'components/Product/AccessProcess'
import Section, { Provider as SectionProvider, SectionArrowLink } from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import { getGlobalBanners } from 'apis/admin/global-banners'
import Arch from 'components/pages/partner/Arch'
import Benefit from 'components/pages/partner/Benefit'

import bannerImg from './_images/banner.png'
import Step1 from './_images/step1.svg'
import Step2 from './_images/step2.svg'
import Step3 from './_images/step3.svg'
import Step4 from './_images/step4.svg'
import style from './index.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  const isMobile = useMobile()
  return (
    <>
      <Banner background={bannerImg} backgroundSize="contain" backgroundPosition="right">
        <banner.Title>七牛合作伙伴与生态</banner.Title>
        <banner.Desc className={style.desc}>
          <Button href="https://jinshuju.net/f/ueonw5">加入合作伙伴</Button>
          {!isMobile && <Button href="https://portal.qiniu.com/invitation" type="primary-hollow" style={{ marginLeft: '15px' }} withBorder>登录管理后台</Button>}
        </banner.Desc>
      </Banner>
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
    <Layout
      title="七牛合作伙伴与生态"
      keywords="合作伙伴, 生态, 七牛云, 合作伙伴与生态, 七牛合作伙伴生态, 七牛代理合作伙伴, 行业开拓"
      description="七牛合作伙伴与生态，加入七牛合作伙伴生态，完善的培训与支持体系，专家技术支持，品牌背书，并有各种各样的内部分享会等，欢迎加入七牛合作伙伴与生态"
      globalBanners={globalBanners}
    >
      <Page />
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
