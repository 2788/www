import React, { PropsWithChildren, ReactNode, useState, useMemo } from 'react'
import { observer } from 'mobx-react'
import { RcFile } from 'react-icecream-1/lib/upload'
import { Button, Loading, Dialog, DialogFooter } from 'react-icecream'
import { IState, FieldState } from 'formstate-x'
import { InputWrapper } from 'react-icecream-form'

import ImgPreview from 'components/common/ImgPreview'

import CommonUpload, { IProps as CommonUploadProps } from '..'

import getDesc, { defaultMaxFileSize } from './desc'
import ClearableUploadBtn, { IProps as ClearableUploadBtnProps } from './ClearableUploadBtn'

import style from './style.m.less'

export { getDesc, ClearableUploadBtn, ClearableUploadBtnProps }

// 图片筛选
const imgFilter = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

export interface IProps extends Pick<CommonUploadProps, 'uploadBucketKeyRule'> {
  state: State
  maxSize?: number // 支持的图片大小，单位为 kb
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
  accept?: string[]
  /** 默认 contain */
  previewType?: 'contain' | 'cover' | 'none'
  width?: number
  height?: number
  /** 图片规格说明，默认为跟 width height maxSize 等相匹配的尺寸说明 */
  desc?: string
  children?: ReactNode
}

export type State = IState<string>

export function createState(value: string): State {
  return new FieldState(value)
}

/** @deprecated use `UploadImgInput` instead */
const UploadImg = observer(function _UploadImg(props: PropsWithChildren<IProps>) {
  const { state, maxSize = defaultMaxFileSize, children } = props
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

  const desc = useMemo(
    () => props.desc ?? getDesc(props.width, props.height, maxSize),
    [props.desc, props.width, props.height, maxSize]
  )

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
            accept={(props.accept ?? imgFilter).join(', ')}
            uploadBucketKeyRule={props.uploadBucketKeyRule}
            beforeUpload={beforeUpload}
            onUploaded={onUploaded}
          >
            {childrenView}
          </CommonUpload>
        </Loading>
        {previewView}
      </div>
      {desc && (
        <p className={style.desc}>{desc}</p>
      )}
      <Dialog
        visible={visible}
        onOk={() => { setVisible(false) }}
        onCancel={() => { setVisible(false) }}
        icon
        footer={<DialogFooter okText="知道了" cancelButtonProps={{ className: style.hidden }} />}
      >
        上传的图片大小不能超过 {maxSize} KB
      </Dialog>
    </div>
  )
})

export default UploadImg

export interface UploadImgInputProps extends IProps {
  clearable?: boolean
}

/** for react-icecream-form */
export const UploadImgInput = observer(function _UploadImgInput({ children, ...props }: UploadImgInputProps) {
  const clearable = props.clearable ?? true
  const defaultChildren = clearable ? (<ClearableUploadBtn state={props.state} />) : undefined
  return (
    <InputWrapper state={props.state}>
      <UploadImg {...props}>{children ?? defaultChildren}</UploadImg>
    </InputWrapper>
  )
})
