import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { FormState, ValueOf } from 'formstate-x'

import { bindFormItem, textNotBlank } from 'admin-base/common/form'

import FormItem from 'components/common/FormItem'
import UploadImg, * as uploadImg from 'components/common/Upload/Img'
import ColorPicker, * as colorPicker from 'components/common/ColorPicker'

export type State = FormState<{
  img: uploadImg.State
  color: colorPicker.State
}>

type Value = ValueOf<State>

export function createState({ img, color }: Value): State {
  return new FormState({
    img: uploadImg.createState(img).validators(textNotBlank),
    color: colorPicker.createState(color)
  })
}

export function getValue(state: State): Value {
  return {
    img: uploadImg.getValue(state.$.img),
    color: state.$.color.value
  }
}

interface IProps {
  state: State
  labels?: string[]
  extra?: React.ReactNode[]
  imgMaxSize?: number
}

export default observer(function ImgColor(
  { state, labels = ['图片', '背景色'], extra, imgMaxSize = 500 }: IProps
) {

  const onUploaded = useCallback(
    (_url: string, file: File) => {
      const img = new Image()
      img.style.display = 'none'
      getBase64(file, (url: string) => { img.src = url })

      img.onload = () => {
        const borderColor = getBorderColor(img)
        if (borderColor) {
          state.$.color.set(borderColor)
        }
      }
    },
    [state.$.color]
  )
  return (
    <>
      <FormItem
        label={labels[0]}
        extra={extra && extra[0]}
        {...bindFormItem(state.$.img)}
      >
        <UploadImg state={state.$.img} maxSize={imgMaxSize} onUploaded={onUploaded} />
      </FormItem>
      <FormItem
        label={labels[1]}
        extra={extra && extra[1]}
        {...bindFormItem(state.$.color)}
      >
        <ColorPicker state={state.$.color} />
      </FormItem>
    </ >
  )
})

function getBorderColor(img: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  const height = img.height
  // 取最左边上中下三点px的颜色数据
  const start = ctx.getImageData(0, 0, 1, 1).data as unknown as number[]
  const mid = ctx.getImageData(0, Math.floor(height / 2), 1, 1).data as unknown as number[]
  const end = ctx.getImageData(0, height - 1, 1, 1).data as unknown as number[]
  const red = Math.round((start[0] + mid[0] + end[0]) / 3)
  const green = Math.round((start[1] + mid[1] + end[1]) / 3)
  const blue = Math.round((start[2] + mid[2] + end[2]) / 3)

  return _rgbToHex(red, green, blue)
  // 获取 hex 格式颜色
  function _rgbToHex(r: number, g: number, b: number) {
    return '#' + _componentToHex(r) + _componentToHex(g) + _componentToHex(b)
  }
  function _componentToHex(c: number) {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
}

function getBase64(img: File, callback: (url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(`${reader.result}`))
  reader.readAsDataURL(img)
}
