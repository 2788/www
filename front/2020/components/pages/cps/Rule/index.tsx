import React from 'react'
import Section from 'components/Product/Section'
import Link from 'components/Link'

import style from './style.less'

export default function Rule() {
  return (
    <Section
      name="rule"
      title="规则解释"
      withTailPadding
    >
      <div className={style.content}>
        <ol>
          <li>
            <h4>1、申请规则</h4>
            <p>申请成为七牛云新推官必须同时满足：个人实名认证、非七牛（前）员工、非七牛代理商的条件。</p>
          </li>
          <li>
            <h4>2、客户关联规则</h4>
            <p>
              新推官通过分享专属的推广链接，吸引客户访问推广链接注册 / 登录账号，客户与新推官建立 30 天的关联期。在关联期内客户购买的所有订单推广者均可获得返佣奖励。关联期结束后，客户将与推广者解除关联关系。
              <br /><br />
              注意：新客户不得与推广者、七牛已注册用户为同一人，判定条件包括注册邮箱、手机号、认证信息、IP 等信息。七牛将剔除同人客户的订单返佣奖励。
            </p>
          </li>
          <li>
            <h4>3、奖励计算规则</h4>
            <p>关联期订单：客户在与新推官关联期内所购买的订单。奖励计算将根据关联期内客户购买订单的实付金额（即现金支付部分，不包括抵用券抵扣）和新推官当前对应的返佣比例计算奖励金额，并分期发放奖励。</p>
          </li>
          <li>
            <h4>4、奖励发放</h4>
            <p>七牛云将在每月 1-6 号发放上月奖励，奖励预计在 5 个工作日内统一打款至推广者的银行卡账户，具体以银行到账时间为准。</p>
          </li>
          <li>
            <h4>5、常见问题</h4>
            <p>更多常见问题请查看文档 <Link href="https://developer.qiniu.com/mkt/manual/7261/cps-promotion-rules" blue>推广规则解释 &gt;</Link></p>
          </li>
        </ol>
      </div>
    </Section>
  )
}
