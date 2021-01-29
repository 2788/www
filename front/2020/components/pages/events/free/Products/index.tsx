/**
 * @file 免费云产品
 */

import React, { PropsWithChildren } from 'react'
import { chunk } from 'lodash'
import { Product, nameMap, urlMap, descMap } from 'constants/products'
import { Row, InvisibleCard } from 'components/UI/Card'
import Card, { Title, Desc, List, HookItem, Button } from 'components/OperationCard'
import Link from 'components/Link'
import { useMp } from 'hooks/ua'
import { useOverlay } from 'components/Overlay'
import MpModal from 'components/mp/Modal'
import { MpPage } from 'constants/mp'
import { useUserInfo } from 'components/UserInfo'

import style from './style.less'

const data = [
  {
    title: nameMap[Product.Rtn],
    desc: descMap[Product.Rtn],
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/rtn/rtc/create',
    moreUrl: urlMap[Product.Rtn],
    items: ['每月免费连麦语音、标清、超清、高清各 5000 分钟']
  },
  {
    title: nameMap[Product.Plsv],
    desc: '免费使用一个月专业版短视频 SDK license',
    getUrl: 'https://portal.qiniu.com/sdk/licenses?showDrawer',
    moreUrl: urlMap[Product.Plsv],
    items: ['集合视频拍摄、上传、编辑等全套功能，快速打造手机 Vlog 制作神器']
  },
  {
    title: nameMap[Product.FaceID],
    desc: descMap[Product.FaceID],
    getUrl: 'https://qmall.qiniu.com/template/Mjg',
    moreUrl: urlMap[Product.FaceID],
    items: ['免费领取人脸检测、动作活体、防翻拍活体、公安核验各 100 次']
  },
  {
    title: nameMap[Product.Kodo],
    desc: '广泛应用于海量数据管理的场景',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/kodo/bucket?shouldCreateBucket=true',
    moreUrl: urlMap[Product.Kodo],
    items: ['标准存储免费空间 10 GB', '每月免费上传流量 无上限', '10 万次 PUT/月，100 万次 GET/月']
  },
  {
    title: nameMap[Product.Cdn],
    desc: '无盲区、智能调度、立体品控、降低回源',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/cdn/domain/create',
    moreUrl: urlMap[Product.Cdn],
    items: ['每月免费赠送 10 GB HTTP 流量']
  },
  {
    title: nameMap[Product.Qvm],
    desc: '提供云服务器、数据库、负载均衡、高防 IP 和安全等服务，用户可以轻松灵活地在云主机上构建稳定、高效的应用程序',
    getUrl: 'https://marketing.qiniu.com/activity/qvm0rmbv2',
    moreUrl: urlMap[Product.Qvm],
    items: ['高达 4 C 4 G 的专业云服务器 0 元起']
  },
  {
    title: nameMap[Product.Sms],
    desc: '支持快速发送验证码短信、通知短信和营销推广短信，服务范围覆盖国内（含港澳台地区）及全球 200 多个国家和地区，到达率高达 99%。',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/sms',
    moreUrl: urlMap[Product.Sms],
    items: ['开通赠送 300 条免费短信套餐']
  },
  {
    title: '云镜像',
    desc: '提供启动云主机实例所需的所有信息，包括特定操作系统和用户自定义镜像系统',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/qvm/vm/image',
    moreUrl: 'https://developer.qiniu.com/qvm/manual/4292/qvm-mirror-overview',
    items: ['快速灵活迁移部署的工具', '支持多副本镜像', '免费']
  },
  {
    title: nameMap[Product.Censor],
    desc: '精准识别触发审核机制的相关内容',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/v2/censor/main/overview',
    items: ['免费赠送内容审核（三鉴）各 6 万张，有效规避内容不合规风险']
  },
  {
    title: nameMap[Product.Insight],
    desc: '适用于运维监控、安全审计及业务数据分析等场景',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/insight/logdb/overview',
    moreUrl: urlMap[Product.Insight],
    items: ['新增日志数据 1 GB/月', '存量日志数据 1 GB/月', '日志仓库 1 个/月']
  },
  {
    title: nameMap[Product.Dora],
    desc: '针对海量多媒体数据提供高效、稳定、丰富的多媒体数据处理服务',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/dora/media-gate/overview',
    moreUrl: urlMap[Product.Dora],
    items: ['750 小时/月 免费自定义数据处理服务', '20 元/月 多媒体处理服务']
  },
  {
    title: nameMap[Product.Ssl],
    desc: '数据加密传输、高兼容性、提升搜索排名',
    btnTitle: '立即使用',
    getUrl: 'https://portal.qiniu.com/certificate/apply?years=1&limit=1&shortName=TrustAsiaDVG5',
    moreUrl: urlMap[Product.Ssl],
    items: ['域名型 DV SSL 证书免费申请']
  }
] as Array<ProductCardProps & { items: string[] } | null>

export default function FreeProducts() {
  return (
    <div className="wrapper">
      {
        chunk(data, 3).map((group, i) => {
          while (group.length < 3) {
            group.push(null)
          }
          return (
            <Row key={i}>
              {group.map((ele, j) => (ele !== null
                ? (
                  <ProductCard {...ele} key={j}>
                    <List>
                      {
                        ele.items.map((item, k) => (
                          <HookItem key={k}>{item}</HookItem>
                        ))
                      }

                    </List>
                  </ProductCard>
                ) : <InvisibleCard />))}
            </Row>
          )
        })
      }
    </div>
  )
}

type ProductCardProps = PropsWithChildren<{
  title: string
  desc: string
  btnTitle?: string // 按钮文案，默认为免费领取
  getUrl: string // 免费领取链接
  moreUrl?: string // 了解更多链接
}>

function ProductCard({ title, desc, btnTitle = '免费领取', getUrl, moreUrl, children }: ProductCardProps) {
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
        ? <>领取成功，请在电脑端<br />登录七牛控制台管理产品</>
        : <>请在电脑端登录七牛控制台<br />完成实名认证，即可领取免费产品</>

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
          : <Button href={getUrl}>{btnTitle}</Button>
      }
      <p className={style.moreLink} style={moreUrl !== undefined ? undefined : { visibility: 'hidden' }}>
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
