import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { FormState, ValueOf } from 'formstate-x'

import { textNotBlank } from 'admin-base/common/form'

import { bindFormItem } from 'utils/bind'
import { getBgColor } from 'utils/color'
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
    img: uploadImg.createState(img).withValidator(textNotBlank),
    color: colorPicker.createState(color)
  })
}

interface IProps {
  state: State
  labels?: string[]
  extra?: React.ReactNode[]
  upload?: Pick<uploadImg.IProps, 'maxSize' | 'previewType' | 'width' | 'height'>
}

export default observer(function ImgColor(
  { state, labels = ['图片', '背景色'], extra, upload }: IProps
) {

  const onUploaded = useCallback(
    (_url: string, file: File) => {
      getBgColor(file).then(
        borderColor => { state.$.color.set(borderColor) },
        () => undefined
      )
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
        <UploadImg state={state.$.img} onUploaded={onUploaded} {...upload} />
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
