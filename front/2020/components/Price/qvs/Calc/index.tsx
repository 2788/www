import React from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { useFormstateX } from 'react-icecream-2/lib/form-x'

import CalcPane from 'components/Price/Tabs/CalcPane'
import { useShoppingCart, Product } from 'components/Price/Tabs/CalcPane/ShoppingCart'

import DeviceSection, * as deviceSection from './DeviceSection'
import UpFlowSection, * as upFlowSection from './UpFlowSection'
import DownFlowSection, * as downFlowSection from './DownFlowSection'
import DurationSection, * as durationSection from './DurationSection'

function createState() {
  return new FormState({
    device: deviceSection.createState(),
    upFlow: upFlowSection.createState(),
    downFlow: downFlowSection.createState(),
    duration: durationSection.createState()
  })
}

type State = ReturnType<typeof createState>

function getPrice(state: State): string {
  const { device, upFlow, downFlow, duration } = state.$

  const bitrate = deviceSection.getBitrate(device)
  const unitPrice = upFlowSection.getUpFlowPrice(upFlow, bitrate)
    + downFlowSection.getDownFlowPrice(downFlow, bitrate)
    + deviceSection.getDeviceManagePrice(device)

  const price = unitPrice * durationSection.getDays(duration)

  return price.toFixed(2)
}

// 把 State 转换成购物车需要的产品信息
function transformShoppingCartProduct(state: State): Product {
  const bitrate = deviceSection.getBitrate(state.$.device)

  const items: Array<{ text: string, unit: string }> = [{
    text: '上行使用量',
    unit: upFlowSection.getUpFlowUsage(state.$.upFlow, bitrate)
  }, {
    text: '下行使用量',
    unit: downFlowSection.getDownFlowUsage(state.$.downFlow, bitrate)
  }, {
    text: '设备管理用量',
    unit: deviceSection.getDeviceManageUsage(state.$.device)
  }, {
    text: '使用时间',
    unit: durationSection.getDesc(state.$.duration)
  }]

  return {
    name: 'QVS 视频监控',
    regions: [{ name: '', items }],
    price: getPrice(state)
  }
}

export default observer(function QvsCalc() {
  const state = useFormstateX(createState, [])
  const addProduct = useShoppingCart()

  function handleAdd() {
    addProduct(transformShoppingCartProduct(state))
  }

  const bitrate = deviceSection.getBitrate(state.$.device)

  return (
    <CalcPane
      onAdd={handleAdd}
      buyLink="https://qmall.qiniu.com/template/NDY=?ref=qvsprices&spec_combo=MTgxMw"
      total={getPrice(state)}
    >
      <DeviceSection state={state.$.device} />
      <UpFlowSection state={state.$.upFlow} bitrate={bitrate} />
      <DownFlowSection state={state.$.downFlow} bitrate={bitrate} />
      <DurationSection state={state.$.duration} />
    </CalcPane>
  )
})
