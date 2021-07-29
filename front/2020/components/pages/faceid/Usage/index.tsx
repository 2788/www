/**
 * @file 人脸核验页面的使用流程
 */

import React, { useState } from 'react'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'
import { RawAccessProcess as AccessProcess, Step as AccessStep } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import IconStep1 from './step-1.svg'
import IconStep2 from './step-2.svg'
import IconStep3 from './step-3.svg'
import IconStep4 from './step-4.svg'
import IconStep5 from './step-5.svg'
import IconStep6 from './step-6.svg'
import IconStep7 from './step-7.svg'
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

export default function FaceIdUsage() {

  const [activeType, setActiveType] = useState(ProcessType.IdAuth)

  const processIdAuthView = (
    <div style={{ display: activeType === ProcessType.IdAuth ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<IconStep1 />}>
          扫描身份证
          <p className={style.op}>OCR</p>
        </AccessStep>
        <AccessStep icon={<IconStep2 />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<IconStep3 />}>
          公安权威核验
          <p className={style.op}>身份验证/人脸对比</p>
        </AccessStep>
        <AccessStep icon={<IconStep4 />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const processFaceCompareView = (
    <div style={{ display: activeType === ProcessType.FaceCompare ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<IconStep2 />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<IconStep5 />}>
          客户预留照片
          <p className={style.op}>人脸对比</p>
        </AccessStep>
        <AccessStep icon={<IconStep4 />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const processCardCompareView = (
    <div style={{ display: activeType === ProcessType.CardCompare ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<IconStep1 />}>
          扫描身份证
          <p className={style.op}>OCR</p>
        </AccessStep>
        <AccessStep icon={<IconStep6 />}>
          自拍视频/自拍照片
        </AccessStep>
        <AccessStep icon={<IconStep7 />}>
          人证对比
          <p className={style.op}>人脸对比</p>
        </AccessStep>
        <AccessStep icon={<IconStep4 />}>
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
