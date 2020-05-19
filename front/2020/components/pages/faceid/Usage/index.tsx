/**
 * @file 人脸核验页面的使用流程
 */

import React, { useState } from 'react'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'
import { RawAccessProcess as AccessProcess, Step as AccessStep } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import IconStepTODO from './step-todo.svg'
import style from './style.less'

enum ProcessType {
  IdAuth = 'id-auth', // 活体人脸身份验证
  FaceCompare = 'face-compare' // 活体人脸比对
}

const typeTextMap = {
  [ProcessType.IdAuth]: '活体人脸身份验证',
  [ProcessType.FaceCompare]: '活体人脸比对'
}

export default function FaceIdUsage() {

  const [activeType, setActiveType] = useState(ProcessType.IdAuth)

  const processIdAuthView = (
    <div style={{ display: activeType === ProcessType.IdAuth ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<IconStepTODO />}>
          扫描身份证
          <p className={style.op}>OCR</p>
        </AccessStep>
        <AccessStep icon={<IconStepTODO />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<IconStepTODO />}>
          公安权威核验
          <p className={style.op}>身份验证/人脸对比</p>
        </AccessStep>
        <AccessStep icon={<IconStepTODO />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const processFaceCompareView = (
    <div style={{ display: activeType === ProcessType.FaceCompare ? 'block' : 'none' }}>
      <AccessProcess>
        <AccessStep icon={<IconStepTODO />}>
          活体检测自拍视频
          <p className={style.op}>活体识别</p>
        </AccessStep>
        <AccessStep icon={<IconStepTODO />}>
          客户预留照片
          <p className={style.op}>人脸对比</p>
        </AccessStep>
        <AccessStep icon={<IconStepTODO />}>认证成功</AccessStep>
      </AccessProcess>
    </div>
  )

  const radiosView = (
    <RadioGroup className={style.radios} value={activeType} onChange={t => setActiveType(t as ProcessType)}>
      <Radio className={style.radio} value={ProcessType.IdAuth}>{typeTextMap[ProcessType.IdAuth]}</Radio>
      <Radio className={style.radio} value={ProcessType.FaceCompare}>{typeTextMap[ProcessType.FaceCompare]}</Radio>
    </RadioGroup>
  )

  return (
    <Section name="usage" title="使用流程" header="产品使用流程">
      {radiosView}
      {processIdAuthView}
      {processFaceCompareView}
    </Section>
  )
}
