/**
 * @file 免费云产品
 */

import React, { PropsWithChildren } from 'react'
import { Product, nameMap, urlMap, descMap } from 'constants/products'
import { Row } from 'components/UI/Card'
import Card, { Title, Desc, List, HookItem, Button } from 'components/OperationCard'
import Link from 'components/Link'
import { useMp } from 'hooks/ua'
import { useOverlay } from 'components/Overlay'
import MpModal from 'components/mp/Modal'
import { MpPage } from 'constants/mp'
import { useUserInfo } from 'components/UserInfo'

import style from './style.less'

const signupUrl = 'https://portal.qiniu.com/signup'

export default function FreeProducts() {
  return (
    <div className="wrapper">
      <Row>
        <ProductCard
          title={nameMap[Product.Rtn]}
          desc={descMap[Product.Rtn]}
          getUrl="https://portal.qiniu.com/rtn/rtc/report/duration"
          moreUrl={urlMap[Product.Rtn]}
        >
          <List>
            <HookItem>每月免费连麦语音、标清、超清、高清各 5000 分钟</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Plsv]}
          desc="免费使用一个月专业版短视频 SDK license"
          getUrl="https://portal.qiniu.com/sdk/licenses?showDrawer"
          moreUrl={urlMap[Product.Plsv]}
        >
          <List>
            <HookItem>集合视频拍摄、上传、编辑等全套功能，快速打造手机 Vlog 制作神器</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.FaceID]}
          desc={descMap[Product.FaceID]}
          getUrl="https://qmall.qiniu.com/template/Mjg"
          moreUrl={urlMap[Product.FaceID]}
        >
          <List>
            <HookItem>免费领取人脸检测、动作活体、防翻拍活体、公安核验各 100 次</HookItem>
          </List>
        </ProductCard>
      </Row>
      <Row>
        <ProductCard
          title={nameMap[Product.Kodo]}
          desc="广泛应用于海量数据管理的场景"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Kodo]}
        >
          <List>
            <HookItem>标准存储免费空间 10 GB</HookItem>
            <HookItem>每月免费上传流量 无上限</HookItem>
            <HookItem>10 万次 PUT/月，100 万次 GET/月</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Cdn]}
          desc="无盲区、智能调度、立体品控、降低回源"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Cdn]}
        >
          <List>
            <HookItem>HTTP 免费下载流量 10 GB/月</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Qvm]}
          desc="提供云服务器、数据库、负载均衡、高防 IP 和安全等服务，用户可以轻松灵活地在云主机上构建稳定、高效的应用程序"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Qvm]}
        >
          <List>
            <HookItem>高达 4 C 8 G 的专业云服务器 0 元起</HookItem>
          </List>
        </ProductCard>
      </Row>
      <Row>
        <ProductCard
          title={nameMap[Product.Sms]}
          desc="支持快速发送验证码短信、通知短信和营销推广短信，服务范围覆盖国内（含港澳台地区）及全球 200 多个国家和地区，到达率高达 99%。"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Sms]}
        >
          <List>
            <HookItem>开通赠送 300 条免费短信套餐</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title="云镜像"
          desc="提供启动云主机实例所需的所有信息，包括特定操作系统和用户自定义镜像系统"
          getUrl={signupUrl}
          moreUrl="https://developer.qiniu.com/qvm/manual/4292/qvm-mirror-overview"
        >
          <List>
            <HookItem>快速灵活迁移部署的工具</HookItem>
            <HookItem>支持多副本镜像</HookItem>
            <HookItem>免费</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Censor]}
          desc="精准识别色情、暴恐、敏感人物等内容"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Censor]}
        >
          <List>
            <HookItem>免费鉴黄额度 6 万张</HookItem>
            <HookItem>免费鉴暴恐额度 6 万张</HookItem>
            <HookItem>免费政治敏感人物识别额度 6 万张</HookItem>
          </List>
        </ProductCard>
      </Row>
      <Row>
        <ProductCard
          title={nameMap[Product.Insight]}
          desc="适用于运维监控、安全审计及业务数据分析等场景"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Insight]}
        >
          <List>
            <HookItem>新增日志数据 1 GB/月</HookItem>
            <HookItem>存量日志数据 1 GB/月</HookItem>
            <HookItem>日志仓库 1 个/月</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Dora]}
          desc="针对海量多媒体数据提供高效、稳定、丰富的多媒体数据处理服务"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Dora]}
        >
          <List>
            <HookItem>750 小时/月 免费自定义数据处理服务</HookItem>
            <HookItem>20 元/月 多媒体处理服务</HookItem>
          </List>
        </ProductCard>
        <ProductCard
          title={nameMap[Product.Ssl]}
          desc="数据加密传输、高兼容性、提升搜索排名"
          getUrl={signupUrl}
          moreUrl={urlMap[Product.Ssl]}
        >
          <List>
            <HookItem>域名型 DV SSL 证书免费申请</HookItem>
          </List>
        </ProductCard>
      </Row>
    </div>
  )
}

type ProductCardProps = PropsWithChildren<{
  title: string
  desc: string
  getUrl: string // 免费领取链接
  moreUrl: string // 了解更多链接
}>

function ProductCard({ title, desc, getUrl, moreUrl, children }: ProductCardProps) {
  const userInfo = useUserInfo()
  const isMp = useMp()
  const { add } = useOverlay()
  const headerView = (
    <>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </>
  )

  function handleMpButtonClick() {
    // 用户已登录
    if (userInfo && userInfo.signedIn) {
      const mpModalTitle = userInfo.is_certified
        ? <>领取成功，请在电脑端<br />登录七牛云管理控制台管理产品</>
        : <>请在电脑端登录七牛管理控制台<br />完成实名认证，即可领取免费产品</>

      add(<MpModal title={mpModalTitle} />)
    } else {
      // 未登录跳转到小程序登录页
      wx.miniProgram.navigateTo({ url: MpPage.Signin })
    }
  }

  const footerView = (
    <>
      {
        isMp
          ? <Button onClick={handleMpButtonClick}>免费领取</Button>
          : <Button href={getUrl}>免费领取</Button>
      }
      <p className={style.moreLink}>
        <Link href={moreUrl}>了解更多 &gt;&gt;</Link>
      </p>
    </>
  )

  return (
    <Card header={headerView} footer={footerView}>
      <div className={style.body}>{children}</div>
    </Card>
  )
}
