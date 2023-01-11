/**
 * @file 人脸核验页面的使用流程
 */

import React, { useState } from 'react'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'
import { RawAccessProcess as AccessProcess, Step as AccessStep } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import iconStep1 from './step-1.png'
import iconStep2 from './step-2.png'
import iconStep3 from './step-3.png'
import iconStep4 from './step-4.png'
import iconStep5 from './step-5.png'
import iconStep6 from './step-6.png'
import iconStep7 from './step-7.png'
import style from './style.less'

enum ProcessType {
  IdAuth = 'id-auth', // 活体人脸身份验证
  FaceCompare = 'face-compare', // 活体人脸比对
  CardCompare = 'card-compare'  // 人证对比
}

const typeTextMap = {
  [ProcessType.IdAuth]: '活体人脸身份验证',
  [ProcessType.FaceCompare]: '活体人脸比对',
  [ProcessType.CardCompare]: '人证对比'
}

function Icon({ src }: { src: string }) {
  return (
    <img src={src} alt="icon" />
  )
}

export default function FaceIdUsage() {

  const [activeType, setActiveType] = useState(ProcessType.IdAuth)

  const processIdAuthView = (
    <div style={{ display: activeType === ProcessType.IdAuth ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<Icon src={iconStep1} />}>
          扫描身份证
          <p className={style.op}>OCR</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep2} />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep3} />}>
          公安权威核验
          <p className={style.op}>身份验证/人脸对比</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep4} />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const processFaceCompareView = (
    <div style={{ display: activeType === ProcessType.FaceCompare ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<Icon src={iconStep2} />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep5} />}>
          客户预留照片
          <p className={style.op}>人脸对比</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep4} />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const processCardCompareView = (
    <div style={{ display: activeType === ProcessType.CardCompare ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<Icon src={iconStep1} />}>
          扫描身份证
          <p className={style.op}>OCR</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep6} />}>
          自拍视频/自拍照片
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep7} />}>
          人证对比
          <p className={style.op}>人脸对比</p>
        </AccessStep>
        <AccessStep icon={<Icon src={iconStep4} />}>
          认证成功
        </AccessStep>
      </AccessProcess>
    </div>
  )

  const radiosView = (
    <RadioGroup className={style.radios} value={activeType} onChange={t => setActiveType(t as ProcessType)}>
      <Radio className={style.radio} value={ProcessType.IdAuth}>{typeTextMap[ProcessType.IdAuth]}</Radio>
      <Radio className={style.radio} value={ProcessType.FaceCompare}>{typeTextMap[ProcessType.FaceCompare]}</Radio>
      <Radio className={style.radio} value={ProcessType.CardCompare}>{typeTextMap[ProcessType.CardCompare]}</Radio>
    </RadioGroup>
  )

  return (
    <Section name="usage" title="产品方案" className={style.section}>
      {radiosView}
      {processIdAuthView}
      {processFaceCompareView}
      {processCardCompareView}
    </Section>
  )
}
