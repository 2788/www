/**
 * @file 人脸核验页面的使用流程
 */

import React, { useState } from 'react'
import { RawAccessProcess as AccessProcess, Step as AccessStep } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import IconStepTODO from './step-todo.svg'
import style from './style.less'

enum ProcessType {
  IdAuth, // 活体人脸身份验证
  FaceCompare // 活体人脸比对
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

  const tabsView = (
    <div className={style.tabs}>
      <Tab type={ProcessType.IdAuth} activeType={activeType} setActiveType={setActiveType} />
      <Tab type={ProcessType.FaceCompare} activeType={activeType} setActiveType={setActiveType} />
    </div>
  )

  return (
    <Section name="usage" title="使用流程" header="产品使用流程">
      {tabsView}
      {processIdAuthView}
      {processFaceCompareView}
    </Section>
  )
}

type TabProps = {
  type: ProcessType
  activeType: ProcessType
  setActiveType: (type: ProcessType) => void
}

function Tab({ type, activeType, setActiveType }: TabProps) {
  const className = [style.tab, type === activeType && style.active].filter(Boolean).join(' ')
  const text = typeTextMap[type]
  return (
    <div className={className} onClick={() => setActiveType(type)}>{text}</div>
  )
}
