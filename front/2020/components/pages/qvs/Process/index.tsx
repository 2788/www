import React from 'react'
import AccessProcess, { Step } from 'components/Product/AccessProcess'

import Step1 from './images/01.svg'
import Step2 from './images/02.svg'
import Step3 from './images/03.svg'
import Step4 from './images/04.svg'

export default function Process() {
  return (
    <AccessProcess header="接入流程">
      <Step icon={<Step1 />}>注册登录</Step>
      <Step icon={<Step2 />}>创建空间</Step>
      <Step icon={<Step3 />}>获取推流地址配置<br />到设备端</Step>
      <Step icon={<Step4 />}>功能体验</Step>
    </AccessProcess>
  )
}
