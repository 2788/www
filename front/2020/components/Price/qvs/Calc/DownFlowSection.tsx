import React from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { Tooltip } from 'react-icecream-2'
import { HelpIcon } from 'react-icecream-2/lib/icons'

import BillingTypeSelect, * as billingTypeSelect from './inputs/BillingType'
import DurationInput, * as durationInput from './inputs/StreamDuration'
import CountInput, * as countInput from './inputs/Count'
import { BillingType, bandwidthDownMbPrice, trafficDownGBPrice } from './constants'
import { getTotalBandwidth, getTotalTraffic } from './transforms'

import style from './index.less'

export function createState() {
  return new FormState({
    billingType: billingTypeSelect.createState(),
    duration: durationInput.createState(),
    concurrent: countInput.createState(0)
  })
}

export type State = ReturnType<typeof createState>

export function getDownFlowPrice(state: State, bitrate: number): number {
  const { billingType, concurrent } = state.value
  if (billingType === BillingType.Bandwidth) {
    return getTotalBandwidth(bitrate, concurrent) * bandwidthDownMbPrice
  }
  const duration = durationInput.getSeconds(state.$.duration)
  return getTotalTraffic(bitrate, concurrent, duration) * trafficDownGBPrice
}

export function getDownFlowUsage(state: State, bitrate: number) {
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

export default observer(function DownFlowSection({ state, bitrate }: Props) {
  return (
    <div className={style.section}>
      <div className={style.inputGroup}>
        <div className={style.inputItem}>
          <p>下行播放计费类型</p>
          <BillingTypeSelect state={state.$.billingType} />
        </div>
        {
          state.value.billingType === BillingType.Traffic && (
            <div className={style.inputItem}>
              <p>下行播放时长<Tooltip title="一天内实时视频观看的时长总和" placement="right"><HelpIcon /></Tooltip></p>
              <DurationInput state={state.$.duration} />
            </div>
          )
        }
        <div className={style.inputItem}>
          <p>下行播放观看人数<Tooltip title="同时观看实时视频的并发人数" placement="right"><HelpIcon /></Tooltip></p>
          <CountInput state={state.$.concurrent} min={0} emptyValue={0} unit="个" />
        </div>
      </div>
      <div className={style.sectionSummary}>下行使用量：{getDownFlowUsage(state, bitrate)}</div>
    </div>
  )
})
