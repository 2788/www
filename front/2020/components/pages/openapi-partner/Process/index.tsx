import React, { useCallback } from 'react'
import { Modal } from 'react-icecream'

import Section from 'components/Product/Section'
import { RawAccessProcess as AccessProcess, Step } from 'components/Product/AccessProcess'
import { Card, Title } from 'components/UI/Card'
import Button from 'components/UI/Button'
import { useUserInfo } from 'components/UserInfo'
import { useUrl } from 'hooks/url'
import { urlForSignin } from 'utils/route'
import { useMobile } from 'hooks/ua'

import partner from './images/partner.png'
import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'

import style from './style.less'

const steps = [
  {
    title: '提交合作申请',
    icon: <Icon1 />
  },
  {
    title: '沟通具体合作事宜',
    icon: <Icon2 />
  },
  {
    title: '产品上线',
    icon: <Icon3 />
  },
  {
    title: '对账结算',
    icon: <Icon4 />
  }
]
export default function Process() {
  const currentUrl = useUrl()
  const userInfo = useUserInfo()
  const handelClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // 未登录
    if (!userInfo || !userInfo.signedIn) {
      Modal.info({
        content: '未登录，请先登录再申请',
        okText: <a target="_blank" rel="noopener" href={urlForSignin(currentUrl)}>登录</a>
      })
      e.preventDefault()
    }
  }, [currentUrl, userInfo])
  return (
    <Section name="process" title="如何加入我们">
      <AccessProcess>
        {
          steps.map((step, index) => (
            <Step icon={step.icon} key={index}>
              <Title className={style.stepTitle}>{step.title}</Title>
            </Step>
          ))
        }
      </AccessProcess>
      <Card className={style.wrapper}>
        <img src={partner} className={style.img} />
        <div className={style.content}>
          <p className={style.title}>成为合作伙伴</p>
          <p className={style.tip}>您需要满足以下条件：</p>
          <ul className={style.list}>
            <li className={style.item}>
              <p>符合国家相关法律法规，具有合法公司资质</p>
            </li>
            <li className={style.item}>
              <p>拥有技术开发能力和售后支持能力</p>
            </li>
            <li className={style.item}>
              <p>接受相关协议和云市场管理规范</p>
            </li>
            <li className={style.item}>
              <p>其他事宜以合同约定为准</p>
            </li>
          </ul>
          <Button type={useMobile() ? 'hollow' : 'primary'} withBorder={useMobile()} className={style.btn} href="https://jinshuju.net/f/SfA0D0" onClick={handelClick}>立即申请</Button>
        </div>
      </Card>
    </Section>
  )
}
