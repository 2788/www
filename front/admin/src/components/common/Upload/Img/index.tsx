import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'
import { Button, Modal } from 'react-icecream-1'
import { RcFile } from 'react-icecream-1/lib/upload'

import { FieldState } from 'formstate-x'

import ImgPreview from '../../ImgPreview'
import CommonUpload from '..'
import style from './style.m.less'

// 图片筛选
const imgFilter = '.png, .jpg, .jpeg, .gif'

interface IProps {
  state: State
  maxSize: number // 支持的图片大小，单位为 kb
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
}

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value)
}

export default observer(function UploadImg(props: PropsWithChildren<IProps>) {
  const { state, maxSize, children } = props

  const childrenView = children || (
    <>
      <Button type="link">上传</Button>
      {state.value ? <ImgPreview url={state.value} className={style.icon} /> : null}
    </>
  )

  function beforeUpload(file: RcFile): boolean {
    const isOver = file.size > maxSize * 1024
    if (isOver) {
      Modal.info({
        content: `上传的图片大小不能超过 ${maxSize} KB`,
        okText: '知道了'
      })
    }
    return !isOver
  }
  function onUploaded(url: string, file: File) {
    state.onChange(url)
    if (props.onUploaded) {
      props.onUploaded(url, file)
    }
  }

  return (
    <CommonUpload accept={imgFilter} beforeUpload={beforeUpload} onUploaded={onUploaded}>
      {childrenView}
    </CommonUpload>
  )
})
