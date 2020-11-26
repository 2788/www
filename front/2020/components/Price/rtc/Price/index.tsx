import React, { PropsWithChildren } from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Link from 'components/Link'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import { TextWrapper, Alert, TableWrapper } from '../../UI'
import style from './index.less'

export default function Price() {
  const piliUrl = urlForPrice(Product.Pili)
  const kodoUrl = urlForPrice(Product.Kodo)
  return (
    <PricePane>
      <PricePaneSection title="计费方式" padding>
        <TextWrapper>
          <p>实时音视频互动直播解决方案，可能产生的费用会有以下九部分：</p>
          <ol>
            <li>
              实时音视频连麦费用：使用实时音视频进行语音或视频连麦时，产生的费用。上行推流不收费、下行拉流则按照集合分辨率（连麦者所拉几路流的分辨率之和）划分档位计费。
              若拉流皆为音频则计为音频档，不拉流则不收费。具体价格见下方表格。
            </li>
            <li>
              实时音视频转推费用：七牛实时音视频云支持单路转推和合流转推两种模式，单路转推主要应用在单个主播直播的场景，合流转推主要应用在需要将多人画面拼合的场景中。
              以主播连麦 PK 的场景为例，由于主播有时是在单人直播，有时是在与其他主播连麦 PK，所以可以在单路转推和合流转推这两种模式上进行平滑切换，从而提高观众的观看体验，并且降低直播费用。具体价格见下方表格。
            </li>
            <li>
              直播上行（旁路直播）费用：实时音视频通过单路转推或合流转推后，使用 rtmp 协议将音视频流推向直播云的动作称为旁路直播。
              对于实时音视频的每一个连麦房间，使用七牛云默认的旁路直播域名，可免除一路旁路直播（即一路直播上行）的费用，但若一个连麦房间，同时向直播云上行推多路流，则会涉及到一部分直播上行费用。
              具体价格可参考七牛<Link href={piliUrl}>直播云价格页面</Link>。
            </li>
            <li>直播下行（CDN 分发）费用：详情可参考七牛<Link href={piliUrl}>直播云价格页面</Link>。</li>
            <li>直播实时转码费用：详情可参考七牛<Link href={piliUrl}>直播云价格页面</Link>。</li>
            <li>直播审核费用：详情可参考七牛<Link href={piliUrl}>直播云价格页面</Link>。</li>
            <li>直播内容录制（落存储）费用：详情可参考七牛<Link href={kodoUrl}>存储产品价格页面</Link>。</li>
            <li>视频特效 SDK 费用：该项是指七牛提供的美颜、滤镜、美妆、贴纸等视频特效功能的费用。详情可咨询您的七牛商务对接人，或向您的视频特效方案供应商获取。</li>
            <li>IM 即时通讯产品费用：该项是指直播间使用的 IM 聊天等功能的费用。详情可咨询您的七牛商务对接人，或向您的 IM 方案供应商获取。</li>
          </ol>
          <p>
            实时音视频现支持两种付费方式，即按量计费的<em>后付费</em>方式，以及
            <Link href="https://qmall.qiniu.com/template/NDA?ref=RTC2020801&spec_combo=MTY3Mg">购买资源包</Link>
            的预付费方式，购买资源包可享更多优惠。
          </p>
          <p>
            了解详细计费说明见价格详情；
          </p>

          <h4>实时音视频连麦</h4>
          <p>开通七牛云实时音视频服务的标准用户，每月可享受一定量的实时音视频连麦免费使用时长。</p>
          <p>每月计费时，会先抵扣免费额度，超出部分再按照价格详情付费结算。</p>
          <Card title="实时音视频连麦纯音频每月免费时长" num="5,000" unit="分钟" />
          <Card title="实时音视频连麦标清每月免费时长" num="5,000" unit="分钟" />
          <Card title="实时音视频连麦超清每月免费时长" num="5,000" unit="分钟" />
          <Card title="实时音视频连麦高清清每月免费时长" num="5,000" unit="分钟" />
          <h4>福利活动</h4>
          <PackageCard name="实时音视频资源包" href="https://qmall.qiniu.com/template/NDA?ref=RTC2020801">
            特惠 4 折起
          </PackageCard>
          <PackageCard name="新客套餐包" href="https://qmall.qiniu.com/template/NDM?ref=RTC2020801">
            低至 7.7 元
          </PackageCard>
        </TextWrapper>
      </PricePaneSection>
      <PricePaneSection title="价格详情">
        <PriceDetail />
      </PricePaneSection>
    </PricePane>
  )
}

type CardProps = {
  title: string
  num: string
  unit: string
}

function Card(props: CardProps) {
  const { title, num, unit } = props

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      <div><span className={style.num}>{num}</span><span className={style.unit}>{unit}</span></div>
    </div>
  )
}

type PackageCardProps = PropsWithChildren<{
  name: string
  href: string
}>

function PackageCard({ name, children, href }: PackageCardProps) {
  return (
    <div className={style.packageCard}>
      <div className={style.name}>{name}</div>
      <div className={style.content}>{children}</div>
      <Link className={style.link} href={href}>查看详情</Link>
    </div>
  )
}

function PriceDetail() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane value="1" tab="实时音视频">
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>项目</th>
                <th>计费项</th>
                <th>订阅集合分辨率（r）</th>
                <th>计费时长/月</th>
                <th>价格（元/千分钟）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={8}>实时音视频连麦</td>
                <td rowSpan={2}>纯音频</td>
                <td rowSpan={2}>标准语音规格</td>
                <td>0 - 5 千分钟</td>
                <td>免费</td>
              </tr>
              <tr>
                <td>5 千分钟以上</td>
                <td>5.00</td>
              </tr>
              <tr>
                <td rowSpan={2}>标清</td>
                <td rowSpan={2}>r ≤ 360P（640*360）</td>
                <td>0 - 5 千分钟</td>
                <td>免费</td>
              </tr>
              <tr>
                <td>5 千分钟以上</td>
                <td>14.00</td>
              </tr>
              <tr>
                <td rowSpan={2}>高清</td>
                <td rowSpan={2}>360P（640*360）&lt; r ≤ 720P(1280*720)</td>
                <td>0 - 5 千分钟</td>
                <td>免费</td>
              </tr>
              <tr>
                <td>5 千分钟以上</td>
                <td>28.00</td>
              </tr>
              <tr>
                <td rowSpan={2}>超清</td>
                <td rowSpan={2}>r &gt; 720P(1280*720)</td>
                <td>0 - 5 千分钟</td>
                <td>免费</td>
              </tr>
              <tr>
                <td>5 千分钟以上</td>
                <td>105.00</td>
              </tr>
              <tr>
                <td rowSpan={4}>实时音视频单路转推</td>
                <td>纯音频</td>
                <td>标准语音规格</td>
                <td></td>
                <td>3.00</td>
              </tr>
              <tr>
                <td>标清</td>
                <td>r ≤ 360P（640*360）</td>
                <td></td>
                <td>3.00</td>
              </tr>
              <tr>
                <td>高清</td>
                <td>360P（640*360）&lt; r ≤ 720P(1280*720)</td>
                <td></td>
                <td>3.00</td>
              </tr>
              <tr>
                <td>超清</td>
                <td>r &gt; 720P(1280*720)</td>
                <td></td>
                <td>3.00</td>
              </tr>
              <tr>
                <td rowSpan={4}>实时音视频合流转推</td>
                <td>纯音频</td>
                <td>标准语音规格</td>
                <td></td>
                <td>8.00</td>
              </tr>
              <tr>
                <td>标清</td>
                <td>r ≤ 360P（640*360）</td>
                <td></td>
                <td>45.00</td>
              </tr>
              <tr>
                <td>高清</td>
                <td>360P（640*360）&lt; r ≤ 720P(1280*720)</td>
                <td></td>
                <td>100.00</td>
              </tr>
              <tr>
                <td>超清</td>
                <td>r &gt; 720P(1280*720)</td>
                <td></td>
                <td>300.00</td>
              </tr>
            </tbody>
          </table>
        </TableWrapper>
        <TextWrapper style={{ marginTop: '12px' }}>
          <ol>
            <li>计费项：通话时长</li>
            <li>计费周期：按月出账，具体出账时间以系统为准</li>
            <li>
              <p>计费规则：</p>
              <ul>
                <li>以上费用只适用于国内使用</li>
                <li>
                  <p>订阅集合分辨率是每一个连麦用户的计费单价按该用户的“订阅集合分辨率”决定，即该用户所订阅视频的分辨率之和</p>
                  <p>
                    例如，假设通话中有 A、B、C 三个用户，对于 A 来说集合分辨率为：B、C分辨率（宽x高）的面积之和，<br />
                    B 面积 = 240x180 = 43200；C 面积 = 640x360 = 230400<br />
                    则 A 的集合分辨率 = B 面积 + C 面积 = 273600，落在高清档
                  </p>
                </li>
                <li>如果一个人既拉取纯音频，也拉取视频，按视频集合分辨率算视频的钱，即拉取的音频那部分不算钱</li>
              </ul>
            </li>
          </ol>
          <Alert>请联系对应销售或拨打 400-808-9176 转 1 了解收费详情</Alert>
        </TextWrapper>
      </TabPane>
    </Tabs>
  )
}
