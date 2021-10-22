import React from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { Tooltip } from 'react-icecream-2'
import { HelpIcon } from 'react-icecream-2/lib/icons'

import AccessTypeSelect, * as accessTypeSelect from './inputs/AccessType'
import BitrateInput, * as bitrateInput from './inputs/Bitrate'
import CountInput, * as countInput from './inputs/Count'
import { AccessType, deviceManagePrice } from './constants'

import style from './index.less'

export function createState() {
  return new FormState({
    accessType: accessTypeSelect.createState(),
    bitrate: bitrateInput.createState(),
    deviceCount: countInput.createState()
  })
}

export type State = ReturnType<typeof createState>

export function getBitrate(state: State): number {
  return bitrateInput.getBps(state.$.bitrate)
}

export function getDeviceManagePrice(state: State): number {
  const { accessType, deviceCount } = state.value
  return accessType === AccessType.GB28181 ? deviceCount * deviceManagePrice : 0
}

export function getDeviceManageUsage(state: State) {
  const { accessType, deviceCount } = state.value
  return accessType === AccessType.GB28181 ? deviceCount + ' 路/天' : '--'
}

export default observer(function DeviceSection({ state }: { state: State }) {
  return (
    <div className={style.section}>
      <div className={style.inputGroup}>
        <div className={style.inputItem}>
          <p>接入类型</p>
          <AccessTypeSelect state={state.$.accessType} />
        </div>
        <div className={style.inputItem}>
          <p>摄像头码率</p>
          <BitrateInput state={state.$.bitrate} />
        </div>
        {
          state.value.accessType === AccessType.GB28181 && (
            <div className={style.inputItem}>
              <p>
                接入摄像头路数
                <Tooltip title="NVR 设备请以该设备需要接入的通道数来统计，一个通道对应一路" placement="right"><HelpIcon /></Tooltip>
              </p>
              <CountInput state={state.$.deviceCount} unit="路" />
            </div>
          )
        }
      </div>
      {
        state.value.accessType === AccessType.GB28181 && (
          <div className={style.sectionSummary}>设备管理用量：{state.value.deviceCount} 路/天</div>
        )
      }
    </div>
  )
})
