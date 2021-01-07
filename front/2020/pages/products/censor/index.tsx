/**
 * @file 产品“内容审核”
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { useMobile } from 'hooks/ua'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import UsageGuide, { Button as UGButton } from 'components/Product/UsageGuide'

import { getNotices, INotice } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import PurchaseInfo, { PurchaseInfoItem, PurchaseInfoAction } from 'components/Product/PurchaseInfo'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Section from 'components/Product/Section'
import Playground from 'components/pages/censor/Playground'
import { useBtns } from 'hooks/product-btn'
import imgBanner from './banner.png'
import IconAdAudit from './_icons/ad-audit.svg'
import IconImgAudit from './_icons/img-audit.svg'
import IconPoliticAudit from './_icons/politic-audit.svg'
import IconSexAudit from './_icons/sex-audit.svg'
import IconVideoAudit from './_icons/video-audit.svg'
import IconViolenceAudit from './_icons/violence-audit.svg'
import LogoBlue from './_logos/blue.png'
import LogoChangba from './_logos/changba.png'
import LogoFaceu from './_logos/faceu.png'
import LogoHujiang from './_logos/hujiang.png'
import LogoHupu from './_logos/hupu.png'
import LogoMakalong from './_logos/makalong.png'
import LogoTangdou from './_logos/tangdou.png'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent({ notices }: { notices: INotice[] }) {

  const isPc = !useMobile()
  const priceUrl = urlForPrice(Product.Censor)

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/censor', children: '立即使用', pcOnly: true },
    { href: priceUrl, children: '产品价格', mobileOnly: true }
  )

  return (
    <>
      <PageBanner
        title="内容审核"
        desc="七牛云提供图片、视频等多媒体内容的审核服务，为你精准识别过滤色情、暴恐、敏感人物、广告等违规内容。"
        bgColor="#34A1EC"
        btns={isPc ? btns.banner : undefined}
        icon={imgBanner}
      />

      <ProducNotice notices={notices} />

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      <Feature name="specs" title="产品规格">
        <feature.Group>
          <feature.Item pos="left-right" title="图片审核" icon={<IconImgAudit />}>
            <feature.Desc>高效精准识别图片中的违规内容，支持的审核类型包括：图片鉴黄、图片鉴暴恐、图片敏感人物识别、图片广告识别</feature.Desc>
          </feature.Item>
          <feature.Item pos="left-right" title="视频审核" icon={<IconVideoAudit />}>
            <feature.Desc>
              高效精准识别视频中的违规内容，包括涉黄、涉暴、涉恐、涉政检测等，准确率高达 99.95%，
              可替代 80% 以上的人工审核，节省人力成本。并且能通过机器学习不断提高准确率
            </feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Feature name="advantages" title="产品优势">
        <feature.Group>
          <feature.Item title="色情内容审核" icon={<IconSexAudit />}>
            <feature.Desc>精准识别图片、视频、直播中的涉黄内容，准确率高达 98%</feature.Desc>
          </feature.Item>
          <feature.Item title="暴恐内容审核" icon={<IconViolenceAudit />}>
            <feature.Desc>支持识别血腥、爆炸、枪支等 10 余种贴合真实场景的暴恐类型</feature.Desc>
          </feature.Item>
          <feature.Item title="政治敏感审核" icon={<IconPoliticAudit />}>
            <feature.Desc>覆盖 2500+ 政治、敏感人物。第一时间更新，从容应对突发事件</feature.Desc>
          </feature.Item>
          <feature.Item title="恶意广告审核" icon={<IconAdAudit />}>
            <feature.Desc>实时过滤图片、视频中的二维码、QQ 号等恶意广告信息</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      {isPc && (
        <Section name="playground" title="功能体验" header="在此体验丰富功能">
          <Playground />
        </Section>
      )}

      <CustomerCaseGroup>
        <CustomerCase pic={LogoHujiang} />
        <CustomerCase pic={LogoFaceu} />
        <CustomerCase pic={LogoBlue} />
        <CustomerCase pic={LogoTangdou} />
        <CustomerCase pic={LogoChangba} />
        <CustomerCase pic={LogoHupu} />
        <CustomerCase pic={LogoMakalong} />
      </CustomerCaseGroup>

      <PurchaseInfo title="产品优惠">
        <PurchaseInfoItem title="智能审核" desc="按次阶梯价格">
          <PurchaseInfoAction url={priceUrl}>查看详情</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="资源包" desc="特惠套餐包">
          <PurchaseInfoAction url="https://qmall.qiniu.com/template/NTg">立即购买</PurchaseInfoAction>
        </PurchaseInfoItem>
      </PurchaseInfo>

      <LinkGroups title="产品文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://developer.qiniu.com/censor/manual/4829/censor-introduction">产品简介</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/censor/api/5588/image-censor">图片审核</LinkItem>
          <LinkItem href="https://developer.qiniu.com/censor/api/5620/video-censor">视频审核</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide title="体验全方位内容安全保护" description="更享 24 万次免费使用额度">
        <UGButton href="https://portal.qiniu.com/censor">免费试用</UGButton>
      </UsageGuide>
    </>
  )
}

export default function ExpressPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="内容审核_内容安全_多媒体内容审核服务"
      keywords="内容审核, 视频审核, 图片审核, 智能鉴黄, 鉴暴恐, 政治人物识别, 内容安全"
      description="七牛云提供图片、视频等多媒体内容的审核服务，为你精准识别过滤色情、暴恐、敏感人物、广告等违规内容。"
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Censor)
    }
  }
}
