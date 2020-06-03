/**
 * @file 邀请好友落地页
 */

import React, { PropsWithChildren, useState } from 'react'
import * as cases from 'constants/cases'
import Layout from 'components/Layout'
import { Card, Row } from 'components/UI/Card'
import Swiper from 'components/UI/Swiper'
import Banner, * as banner from 'components/Banner'
// 这个页面用这些 `Product/xxx` 的组件不太合适，先用着，后边考虑把这些组件从 Product 中拎出来
import Navigator, { Navigatable } from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import Section from 'components/Product/Section'
import { RawAccessProcess, Step as AccessProcessStep } from 'components/Product/AccessProcess'
import UsageGuide, { Button as UGButton } from 'components/Product/UsageGuide'
import { RawCustomerCaseGroup as CustomerCaseGroup, CustomerCase } from 'components/Product/CustomerCaseGroup'

import IconStep1 from './_icons/step-1.svg'
import IconStep2 from './_icons/step-2.svg'
import IconStep3 from './_icons/step-3.svg'
import IconStep4 from './_icons/step-4.svg'
import IconArrow from './_icons/circle-arrow.svg'
import IconQuestionMark from './_icons/question.svg'
import imgBanner from './banner.file.svg'
import IconTitle from './_icons/title.svg'

import style from './style.less'

const inviteUrl = 'https://portal.qiniu.com/invitation'

export default function InvitePage() {
  const btns = useBtns({
    children: '立即邀请',
    href: inviteUrl
  })

  const rewardHeader = (
    <>
      丰厚奖励
      <p className={style.rewardLink}><a>活动规则 &gt;&gt;</a></p>
    </>
  )

  return (
    <Layout
      title="邀请有礼活动"
      keywords="七牛云, 邀请活动, 七牛优惠券, 七牛免费CDN"
      description="邀请好友注册七牛云，即可获得CDN免费下载流量，购物卡、产品代金券、七牛云活动VIP门票、优先产品内测资格等福利。"
    >
      <Navigatable>
        <Banner className={style.banner} background={imgBanner} pcBackgroundSize="auto 100%" backgroundPosition="right">
          <banner.Title className={style.title}>
            <IconTitle />
          </banner.Title>
          <banner.Desc>
            <p className={style.subtitle}>温馨回馈限时复工防疫包</p>
            <div className={style.btnLine}>{btns.banner}</div>
          </banner.Desc>
        </Banner>

        <Navigator>{btns.nav}</Navigator>

        <Section name="reward" title="丰厚奖励" header={rewardHeader}>
          <table className={style.rewardTable}>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>达成目标</th>
                <th>邀请人奖励</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>邀请一个标准用户</td>
                <td>
                  <ul>
                    <li className={style.rewardItem}>5 GB/月 CDN 免费 HTTP 下载流量（最高累计 40 GB/月）</li>
                    <li className={style.rewardItem}>100 元对象存储抵用券（不可累计）</li>
                    <li className={style.rewardItem}>100 元智能多媒体服务抵用券（不可累计）</li>
                    <li className={style.rewardItem}>500 元充值抵用券（单次充值 5000 送 500，不可累计）</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>每自然月邀请 2 个及以上企业标准用户</td>
                <td>
                  <ul>
                    <li className={style.rewardItem}>额外获得价值 100 元购物卡</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>受邀人首充金额 &gt;= 1000 元，并 &lt; 5000 元</td>
                <td>
                  <ul>
                    <li className={style.rewardItem}>100 元购物卡</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>受邀人首充金额 &gt;= 5000 元</td>
                <td>
                  <ul>
                    <li className={style.rewardItem}>500 元购物卡</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section name="process" title="邀请流程">
          <RawAccessProcess>
            <AccessProcessStep icon={<IconStep1 />}>注册登录七牛云账户</AccessProcessStep>
            <AccessProcessStep icon={<IconStep2 />}>点击“邀请好友”</AccessProcessStep>
            <AccessProcessStep icon={<IconStep3 />}>分享链接邀请好友</AccessProcessStep>
            <AccessProcessStep icon={<IconStep4 />}>邀请成功获得奖励</AccessProcessStep>
          </RawAccessProcess>
          <p className={style.processLink}>
            <a href={inviteUrl}>
              获取专属推广链接
              <IconArrow className={style.processLinkIcon} />
            </a>
          </p>
        </Section>

        <Section name="faq" title="常见问题">
          <Row>
            <Card>
              <FaqItem title="标准用户是什么？">标准用户指完成实名认证的个人或企业用户。</FaqItem>
            </Card>
            <Card>
              <FaqItem title="购物卡何时发放？怎么发放？">邀请人达成目标后，我们会在次月通过邮件发放至邀请人邮箱。</FaqItem>
            </Card>
          </Row>
          <Row>
            <Card>
              <FaqItem title="免费 CDN 下载流量什么时候生效？">邀请成功后，免费流量次月生效。</FaqItem>
            </Card>
            <Card>
              <FaqItem title="产品抵用券什么时候发放？">产品抵用券在受邀人实名认证后，自动发放至邀请人账户。</FaqItem>
            </Card>
          </Row>
        </Section>

        <Section name="cases" title="客户" header="与 1,000,000+ 企业和开发者一起使用七牛云">
          <Cases />
        </Section>

        <UsageGuide title="邀请好友用七牛云" description="携手创造更多的商业价值">
          <UGButton href={inviteUrl}>立即邀请</UGButton>
        </UsageGuide>

      </Navigatable>
    </Layout>
  )
}

function FaqItem({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className={style.faqItem}>
      <IconQuestionMark className={style.faqIcon} />
      <h5 className={style.faqTitle}>{title}</h5>
      <p className={style.faqContent}>{children}</p>
    </div>
  )
}

function Cases() {
  const [index, setIndex] = useState(0)
  const pageInfo = {
    num: 2,
    index,
    onIndexChange: setIndex
  }
  return (
    <Swiper withArrow withPagination {...pageInfo}>
      <CustomerCaseGroup>
        <CustomerCase pic={cases.sap.logo} alt={cases.sap.name} />
        <CustomerCase pic={cases.lx.logo} alt={cases.lx.name} />
        <CustomerCase pic={cases.oppo.logo} alt={cases.oppo.name} />
        <CustomerCase pic={cases.hw.logo} alt={cases.hw.name} />
        <CustomerCase pic={cases.bbg.logo} alt={cases.bbg.name} />
        <CustomerCase pic={cases.zgdx.logo} alt={cases.zgdx.name} />
        <CustomerCase pic={cases.zyd.logo} alt={cases.zyd.name} />
        <CustomerCase pic={cases.mb.logo} alt={cases.mb.name} />
      </CustomerCaseGroup>
      <CustomerCaseGroup>
        <CustomerCase pic={cases.zs.logo} alt={cases.zs.name} />
        <CustomerCase pic={cases.sfsy.logo} alt={cases.sfsy.name} />
        <CustomerCase pic={cases.zgtp.logo} alt={cases.zgtp.name} />
        <CustomerCase pic={cases.zgpa.logo} alt={cases.zgpa.name} />
        <CustomerCase pic={cases.zh.logo} alt={cases.zh.name} />
        <CustomerCase pic={cases.xhs.logo} alt={cases.xhs.name} />
        <CustomerCase pic={cases.bilibili.logo} alt={cases.bilibili.name} />
        <CustomerCase pic={cases.dj.logo} alt={cases.dj.name} />
      </CustomerCaseGroup>
    </Swiper>
  )
}
