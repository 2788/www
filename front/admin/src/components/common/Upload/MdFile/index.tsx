/**
 * @file          component  UploadMdFile
 * @description   上传 md 文件组件
 * @author        renpanpan
 */

import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'
import { Button, Modal } from 'react-icecream'
import { RcFile } from 'react-icecream/lib/upload'
import { FieldState, FormState, ValueOf } from 'formstate-x'
import CommonUpload from '..'

export type Props = PropsWithChildren<{
  state: State
  maxSize: number // 支持的 md 文件大小，单位为 kb
  beforeUpload?: (file: RcFile) => boolean | PromiseLike<void>
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
}>

export type State = FormState<{
  name: FieldState<string>
  url: FieldState<string>
}>

export type Value = ValueOf<State>

export function createState(value: Value = { name: '', url: '' }): State {
  return new FormState({
    name: new FieldState(value.name),
    url: new FieldState(value.url)
  })
}

export function getValue(state: State): Value {
  return state.value
}

export default observer(function UploadMdFile(props: Props) {
  const { state, maxSize, children } = props

  function beforeUpload(file: RcFile): Promise<void> {
    return new Promise((resolve, reject) => {
      const isOver = file.size > maxSize * 1024
      if (isOver) {
        Modal.info({
          content: `上传的 Markdown 文件大小不能超过 ${maxSize} KB`,
          okText: '知道了'
        })
        throw new Error(`Markdown 文件大于 ${maxSize} KB`)
      }
      // 如果没有 props.beforeUpload 则只做默认的上传前处理方法
      if (!props.beforeUpload) {
        return resolve()
      }
      // 如果有 props.beforeUpload，则接着使用 props.beforeUpload 处理
      const res = props.beforeUpload(file)
      if (typeof res === 'boolean') {
        return res ? resolve() : reject()
      }
      res.then(resolve, reject)
    })
  }

  function onUploaded(url: string, file: File) {
    const name = file.name
    state.$.name.onChange(name)
    state.$.url.onChange(url)
    if (props.onUploaded) {
      props.onUploaded(url, file)
    }
  }

  const childrenView = children || <Button type="link">{state.value.name || '上传'}</Button>

  return (
    <CommonUpload accept=".md" beforeUpload={beforeUpload} onUploaded={onUploaded}>
      {childrenView}
    </CommonUpload>
  )
})
