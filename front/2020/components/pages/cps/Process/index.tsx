import React from 'react'
import Section from 'components/Product/Section'
import { RawAccessProcess as AccessProcess, Step } from 'components/Product/AccessProcess'
import { Title, Desc } from 'components/UI/Card'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'

import style from './style.less'

const steps = [{
  title: '加入新推官',
  desc: '注册账号，完成个人实名认证加入新推官',
  icon: <Icon1 />
}, {
  title: '分享推广链接',
  desc: '前往 CPS 推广复制链接，分享推广链接',
  icon: <Icon2 />
}, {
  title: '新客注册下单',
  desc: '新客登录推广页面，30 天内下单即返现',
  icon: <Icon3 />
}, {
  title: '次月发放奖励',
  desc: '推广成功，次月即发放免税奖励',
  icon: <Icon4 />
}]

export default function Reward() {
  return (
    <Section
      name="process"
      title="推广流程"
    >
      <AccessProcess>
        {
          steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
            >
              <Title className={style.title}>
                {step.title}
              </Title>
              <Desc className={style.desc}>
                {step.desc}
              </Desc>
            </Step>
          ))
        }
      </AccessProcess>
    </Section>
  )
}
