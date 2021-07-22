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

import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import PurchaseInfo, { PurchaseInfoItem, PurchaseInfoAction } from 'components/Product/PurchaseInfo'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Section from 'components/Product/Section'
import Playground from 'components/pages/censor/Playground'
import { Card, InvisibleCard, Row } from 'components/UI/Card'
import { useBtns } from 'hooks/product-btn'
import imgBanner from './banner.png'
import IconCoreAdvantage1 from './_icons/core-advantage1.svg'
import IconCoreAdvantage2 from './_icons/core-advantage2.svg'
import IconCoreAdvantage3 from './_icons/core-advantage3.svg'
import IconCoreAdvantage4 from './_icons/core-advantage4.svg'
import IconImgAudit from './_icons/img-audit.svg'
import IconVideoAudit from './_icons/video-audit.svg'
import IconAudioAudit from './_icons/audio-audit.svg'
import IconTextAudit from './_icons/text-audit.svg'
import IconLiveAudit from './_icons/live-audit.svg'
import LogoBlue from './_logos/blue.png'
import LogoChangba from './_logos/changba.png'
import LogoFaceu from './_logos/faceu.png'
import LogoHujiang from './_logos/hujiang.png'
import LogoHupu from './_logos/hupu.png'
import LogoMakalong from './_logos/makalong.png'
import LogoTangdou from './_logos/tangdou.png'

import style from './style.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {

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
        desc="七牛云提供图片、视频、语音、文本、直播流等多媒体内容的审核服务，为您精准识别过滤色情、暴恐、敏感人物、广告、水印 Logo、不良场景等各类违规内容，可依据您的具体业务场景灵活配置，帮助您提前防范内容违规风险，提高审核效率，提升用户体验。"
        bgColor="#34A1EC"
        btns={isPc ? btns.banner : undefined}
        icon={imgBanner}
      />

      <ProductNotice notices={notices} />

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      <Feature name="specs" title="产品规格">
        <feature.Group>
          <feature.Item pos="left-right" title="图片审核" icon={<IconImgAudit />}>
            <feature.Desc>
              高效精准识别图片中的违规内容，支持的审核类型包括：
              图片鉴黄，图片鉴暴恐，图片敏感人物识别，图片广告识别、图片水印 Logo，不良场景等类型。
            </feature.Desc>
          </feature.Item>
          <feature.Item pos="left-right" title="视频审核" icon={<IconVideoAudit />}>
            <feature.Desc>
              高效精准识别视频中的违规内容，包括涉黄、涉暴恐、涉政敏感人物检测等，准确率高达 99.95%， 可替代 80% 以上的人工审核。
            </feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item pos="left-right" title="语音审核" icon={<IconAudioAudit />}>
            <feature.Desc>
              为音频文件的内容审核场景提供涉政，国歌，色情，广告，娇喘，等违规内容的识别，并支持识别唱歌，性别，音色标签等功能。
            </feature.Desc>
          </feature.Item>
          <feature.Item pos="left-right" title="文本审核" icon={<IconTextAudit />}>
            <feature.Desc>
              帮助您检测文本是否存在色情，暴恐，涉政，辱骂，灌水，违禁，无意义等违规内容。
            </feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item pos="left-right" title="直播审核" icon={<IconLiveAudit />}>
            <feature.Desc>
              帮助您检测直播中的不良信息，并给出审核结果管控建议。<br />
              支持的审核类型包括：直播鉴黄、直播鉴暴恐、<br />
              直播敏感人物识别、直播语音违规内容识别。
            </feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Feature name="features" title="产品功能">
        <Row>
          <FeatureCard title="色情内容审核" desc="精准识别图片、语音、视频、直播中的涉黄内容，准确率高达 98%。" />
          <FeatureCard title="暴恐内容审核" desc="支持识别血腥、爆炸、枪支等 10 余种贴合真实场景的暴恐类型。" />
          <FeatureCard title="政治敏感审核" desc="支持识别各类敏感人物，含国内国际政要，官员，革命英烈，恐怖分子，劣迹艺人等。" />
        </Row>
        <Row>
          <FeatureCard title="垃圾广告审核" desc="实时过滤图片、视频中利用微信号、手机号、QQ 开展的违法垃圾广告内容。" />
          <FeatureCard title="水印 Logo 识别" desc="高精度 Logo 水印检测识别技术，支持竞品 Logo 检测、涉政 Logo 检测，帮助维护您的品牌形象。" />
          <FeatureCard title="不良场景识别" desc="支持识别吸烟、喝酒、吸毒、避孕套和无意义画面，并支持未成年人画面识别。" />
        </Row>
        <Row>
          <FeatureCard title="赌博识别" desc="精准识别图片、视频、直播中涉及的各类涉赌内容，帮助打击违法行为" />
          {isPc && <InvisibleCard className={style.cardWrapper} />}
          {isPc && <InvisibleCard className={style.cardWrapper} />}
        </Row>
      </Feature>

      {isPc && (
        <Section name="playground" title="功能体验" header="在此体验丰富功能">
          <Playground />
        </Section>
      )}

      <Feature name="advantages" title="核心优势">
        <feature.Group>
          <feature.Item align="left" title="准确率高" icon={<IconCoreAdvantage1 />}>
            <feature.Desc>深度多种融合，实时监测舆情趋势，识别精准高效。</feature.Desc>
          </feature.Item>
          <feature.Item align="left" title="节约成本" icon={<IconCoreAdvantage2 />}>
            <feature.Desc>帮助您节约 80% 以上的人工审核成本。</feature.Desc>
          </feature.Item>
          <feature.Item align="left" title="接入方便" icon={<IconCoreAdvantage3 />}>
            <feature.Desc>服务使用简单快捷，兼容性强，并提供全流程技术支持。</feature.Desc>
          </feature.Item>
          <feature.Item align="left" title="贴合场景" icon={<IconCoreAdvantage4 />}>
            <feature.Desc>支持业务场景维度的配置，全方位识别各类违规内容，极大降低平台监管风险。</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

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

      <ProductNews newsRes={newsRes} />

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

export default function ExpressPage({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="内容审核_内容安全_多媒体内容审核服务"
      keywords="内容审核, 视频审核, 图片审核, 智能鉴黄, 鉴暴恐, 政治人物识别, 内容安全"
      description="七牛云提供图片、视频等多媒体内容的审核服务，为你精准识别过滤色情、暴恐、敏感人物、广告等违规内容。"
    >
      <PageContent notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Censor),
      newsRes: await getNews({ product: Product.Censor })
    }
  }
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <Card className={style.cardWrapper}>
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDesc}>{desc}</div>
    </Card>
  )
}
