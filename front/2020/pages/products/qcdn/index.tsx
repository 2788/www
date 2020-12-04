/**
 * @file 产品“CDN”
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNotices, INotice } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import Coverage from 'components/pages/qcdn/Coverage'
import Packages from 'components/pages/qcdn/Packages'
import CustomerRemarks from 'components/pages/qcdn/CustomerRemarks'
import CdnScene from 'components/pages/qcdn/Scene'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import { MpPage } from 'constants/mp'

import AnXing from './_images/customer-anxing.png'
import HuangYou from './_images/customer-huangyou.png'
import KuaiKan from './_images/customer-kuaikan.png'
import MangGuo from './_images/customer-mangguo.png'
import MoMo from './_images/customer-momo.png'
import QiCheZhiJia from './_images/customer-qichezhijia.png'
import TanTan from './_images/customer-tantan.png'
import ZhongXin from './_images/customer-zhongxin.png'

import imgBanner from './_images/banner.png'
import Advantage1Icon from './_images/advantage1.svg'
import Advantage2Icon from './_images/advantage2.svg'
import Advantage3Icon from './_images/advantage3.svg'
import Advantage4Icon from './_images/advantage4.svg'
import Advantage5Icon from './_images/advantage5.svg'
import Advantage6Icon from './_images/advantage6.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent({ notices }: { notices: INotice[] }) {

  const priceUrl = urlForPrice(Product.Cdn)

  const btns = useBtns(
    { children: '立即使用', onClick: () => wx.miniProgram.navigateTo({ url: MpPage.PortalQCDN }), mpOnly: true },
    { href: 'https://portal.qiniu.com/cdn', children: '立即使用', pcOnly: true },
    { href: 'https://qmall.qiniu.com/template/NTI', children: '立即购买' }
  )

  return (
    <>
      <PageBanner
        title="CDN"
        desc="七牛 CDN 是在传统 CDN 基础上实现的对数据网络加速进一步优化的智能管理服务。通过全方位的 CDN 质量监控，以及智能易用的节点调度等功能，提供稳定快速的网络访问服务。保障客户的音视频点播、大文件下载、应用及 Web 加速服务的稳定及连续性。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <ProducNotice notices={notices} />

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      <Coverage />

      <Packages />

      <Feature name="core" title="核心功能" header="核心功能及服务">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage1Icon />}
            title="无盲区覆盖"
          >
            <FeatureDesc>精选主流厂商高质量节点，全面覆盖各地区、各运营商的网络，实现全地域无盲区的覆盖</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage2Icon />}
            title="零故障品控"
          >
            <FeatureDesc>基于第三方 APM 的全网覆盖和七牛自研的监控数据，打造七牛 CDN 零故障质量保障体系</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage3Icon />}
            title="精准智能调度"
          >
            <FeatureDesc>支持 DNS、HTTPDNS、HTTP302 调度模式，有效提高访问响应速度，防止劫持，实现全网实时精准调度调度</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage4Icon />}
            title="降低回源成本"
          >
            <FeatureDesc>自建中间源，消除跨运营商回源慢甚至不可达等问题，保护源站不受边缘节点请求波动影响，节省回源成本</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage5Icon />}
            title="灵活分时计费"
          >
            <FeatureDesc>日间、闲时、忙时可分开计费，根据使用场景精细化运营，为用户最大化降低 成本费用</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<Advantage6Icon />}
            title="私有协议优化"
          >
            <FeatureDesc>使用私有传输协议作为 CDN 内部数据交换的基础，确保客户资源在 CDN 内部安全、快速的传输到各个节点，实现客户内容高效、可靠的进行分发</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <CdnScene />

      <CustomerRemarks />

      <CustomerCaseGroup header="他们都在用" grey>
        <CustomerCase pic={ZhongXin} />
        <CustomerCase pic={MoMo} />
        <CustomerCase pic={AnXing} />
        <CustomerCase pic={HuangYou} />
        <CustomerCase pic={MangGuo} />
        <CustomerCase pic={QiCheZhiJia} />
        <CustomerCase pic={TanTan} />
        <CustomerCase pic={KuaiKan} />
      </CustomerCaseGroup>

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/fusion/manual/1228/fusion-quick-start">快速入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3667/ssl-certificate-of-free-dns-validation-guide">DV 证书验证指南</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/manual/1360/seven-cattle-download-speed-of-the-world-s-overseas-schedule">七牛全球下载加速的海外一览表</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/manual/1367/custom-domain-name-binding-process">绑定加速域名和域名解析流程</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/fusion/api/1230/traffic-bandwidth">流量带宽</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/api/1229/cache-refresh">缓存刷新与查询</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/api/1227/file-prefetching">文件预取与查询</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/api/1226/download-the-log">日志下载</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及工具">
          <LinkItem href="https://developer.qiniu.com/fusion/tools/1665/qlogfetch">CDN 日志查询</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/fusion/kb/1322/how-to-configure-cname-domain-name">域名配置问题</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/kb/3644/refresh-the-cache-fails-consistency-method-validation-file">缓存刷新问题</LinkItem>
          <LinkItem href="https://developer.qiniu.com/fusion/kb/3725/how-to-apply-for-and-use-free-certificate">HTTPS 相关问题</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function CdnPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="CDN"
      keywords="高防CDN, 动态CDN, 静态CDN, CDN, CDN加速, CDN加速服务, 七牛CDN, CDN服务器, 内容分发, 云加速, CDN, 图片CDN, 视频CDN"
      description="七牛 CDN 是在传统 CDN 基础上实现的对数据网络加速进一步优化的智能管理服务。通过全方位的 CDN 质量监控，以及智能易用的节点调度等功能，提供稳定快速的网络访问服务。保障客户的音视频点播、大文件下载、应用及 Web 加速服务的稳定及连续性。"
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Cdn)
    }
  }
}
