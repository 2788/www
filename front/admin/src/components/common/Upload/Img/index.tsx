import React, { PropsWithChildren, useState } from 'react'
import { observer } from 'mobx-react'
import { RcFile } from 'react-icecream-1/lib/upload'
import { Button, Loading, Dialog, DialogFooter } from 'react-icecream-2'
import { FieldState } from 'formstate-x'

import ImgPreview from 'components/common/ImgPreview'

import CommonUpload, { IProps as CommonUploadProps } from '..'
import style from './style.m.less'

// 图片筛选
const imgFilter = '.png, .jpg, .jpeg, .gif'

export interface IProps extends Pick<CommonUploadProps, 'uploadBucketKeyRule'> {
  state: State
  maxSize?: number // 支持的图片大小，单位为 kb
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
  /** 默认 contain */
  previewType?: 'contain' | 'cover' | 'none'
  width?: number
  height?: number
}

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value)
}

export default observer(function UploadImg(props: PropsWithChildren<IProps>) {
  const { state, maxSize = 500, children } = props
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const childrenView = children || (
    <Button type="link" className={style.btn}>上传</Button>
  )

  const previewType = props.previewType ?? 'contain'
  const previewView = previewType === 'none'
    ? null
    : (
      <ImgPreview
        url={state.value}
        type={previewType}
        width={props.width}
        height={props.height}
        className={style.icon}
      />
    )

  const descView = props.width && props.height
    ? (
      <p className={style.desc}>
        推荐尺寸： {props.width} × {props.height} px
      </p>
    )
    : null

  function beforeUpload(file: RcFile): boolean {
    const isOver = file.size > maxSize * 1024
    if (isOver) {
      setVisible(true)
      return false
    }

    setIsLoading(true)
    return true
  }
  function onUploaded(url: string, file: File) {
    state.onChange(url)
    setIsLoading(false)
    if (props.onUploaded) {
      props.onUploaded(url, file)
    }
  }

  return (
    <div className={style.uploadImg}>
      <div className={style.main}>
        <Loading loading={isLoading}>
          <CommonUpload
            accept={imgFilter}
            uploadBucketKeyRule={props.uploadBucketKeyRule}
            beforeUpload={beforeUpload}
            onUploaded={onUploaded}
          >
            {childrenView}
          </CommonUpload>
        </Loading>
        {previewView}
      </div>
      {descView}
      <Dialog
        visible={visible}
        onOk={() => { setVisible(false) }}
        onCancel={() => { setVisible(false) }}
        footer={<DialogFooter okText="知道了" cancelButtonProps={{ className: style.hidden }} />}
      >
        上传的图片大小不能超过 {maxSize} KB
      </Dialog>
    </div>
  )
})
