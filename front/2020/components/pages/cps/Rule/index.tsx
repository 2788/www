import React from 'react'
import Section from 'components/Product/Section'
import Link from 'components/Link'
import { Button } from 'components/OperationCard'

import { useMobile } from 'hooks/ua'

import code from './images/code.png'
import style from './style.less'

export default function Rule() {
  const isMobile = useMobile()
  return (
    <Section name="rule" title="规则解释" withTailPadding>
      <div className={style.content}>
        <ol>
          <li>
            <h4>1、申请规则</h4>
            <p>申请成为 CPS 推广者必须同时满足：个人实名认证、非七牛（前）员工、非七牛代理商的条件。</p>
          </li>
          <li>
            <h4>2、客户关联规则</h4>
            <p>
              推广者通过分享专属的推广链接、吸引客户访问推广链接注册账号，注册成功后新客户即与推广者建立 30 天的关联期。
              在关联期内，新客户完成指定返佣产品的首单支付，推广者将获得首单返佣。关联期结束后，新客户将于推广者解除关联关系。
              <br /><br />
              注意：新客户不得与推广者、七牛已注册用户为同一人，判定条件包括注册邮箱、手机号、认证信息、IP 等信息。七牛将剔除同人客户的首单奖励。
            </p>
          </li>
          <li>
            <h4>3、奖励计算规则</h4>
            <p>首购订单：客户首次支付的、符合指定返佣产品的、订单金额不为 0 的订单。 奖励计算将根据首购订单的实付金额（即现金支付部分，不包括抵用券抵扣）和返佣比例计算奖励金额，并按照推广者等级分期发放奖励。</p>
          </li>
          <li>
            <h4>4、奖励发放</h4>
            <p>七牛云将在每月 10 号发放上月奖励，统一打款至推广者的银行卡账户。奖励预计将在 5 个工作日左右到账，具体以银行到账时间为准。</p>
          </li>
          <li>
            <h4>5、常见问题</h4>
            <p>更多常见问题请查看文档<Link blue href="https://developer.qiniu.com/mkt/manual/7261/cps-promotion-rules"> CPS 推广规则解释</Link></p>
          </li>
          <li>
            <h4>6、七牛云 CPS 推广交流</h4>
            <p>QQ 群号：1106335666，通过 QQ 扫一扫二维码，加入群聊了解更多。</p>
            {isMobile ? <Button className={style.btn} target="_blank" href="https://jq.qq.com/?_wv=1027&k=f7BABHHj">加入群聊</Button> : <img src={code} />}
          </li>
        </ol>
      </div>
    </Section>
  )
}
