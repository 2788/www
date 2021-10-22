import React from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { Tooltip } from 'react-icecream-2'
import { HelpIcon } from 'react-icecream-2/lib/icons'

import BillingTypeSelect, * as billingTypeSelect from './inputs/BillingType'
import DurationInput, * as durationInput from './inputs/StreamDuration'
import CountInput, * as countInput from './inputs/Count'
import { BillingType, bandwidthUpMbPrice, trafficUpGBPrice } from './constants'
import { getTotalBandwidth, getTotalTraffic } from './transforms'

import style from './index.less'

export function createState() {
  return new FormState({
    billingType: billingTypeSelect.createState(),
    duration: durationInput.createState(),
    concurrent: countInput.createState()
  })
}

export type State = ReturnType<typeof createState>

export function getUpFlowPrice(state: State, bitrate: number): number {
  const { billingType, concurrent } = state.value
  if (billingType === BillingType.Bandwidth) {
    return getTotalBandwidth(bitrate, concurrent) * bandwidthUpMbPrice
  }
  const duration = durationInput.getSeconds(state.$.duration)
  return getTotalTraffic(bitrate, concurrent, duration) * trafficUpGBPrice
}

export function getUpFlowUsage(state: State, bitrate: number) {
  const { billingType, concurrent } = state.value
  if (billingType === BillingType.Bandwidth) {
    return getTotalBandwidth(bitrate, concurrent) + ' Mbps/天'
  }
  const duration = durationInput.getSeconds(state.$.duration)
  return getTotalTraffic(bitrate, concurrent, duration) + ' GB/天'
}

export interface Props {
  state: State
  bitrate: number
}

export default observer(function UpFlowSection({ state, bitrate }: Props) {
  return (
    <div className={style.section}>
      <div className={style.inputGroup}>
        <div className={style.inputItem}>
          <p>上行接入计费类型</p>
          <BillingTypeSelect state={state.$.billingType} />
        </div>
        {
          state.value.billingType === BillingType.Traffic && (
            <div className={style.inputItem}>
              <p>上行推流时长<Tooltip title="一天内摄像头推流的总时长" placement="right"><HelpIcon /></Tooltip></p>
              <DurationInput state={state.$.duration} />
            </div>
          )
        }
        <div className={style.inputItem}>
          <p>上行推流并发路数</p>
          <CountInput state={state.$.concurrent} unit="路" />
        </div>
      </div>
      <div className={style.sectionSummary}>上行使用量：{getUpFlowUsage(state, bitrate)}</div>
    </div>
  )
})
