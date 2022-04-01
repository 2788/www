/**
 * @file 上传视频
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { IState } from 'formstate-x'
import { InputWrapper } from 'react-icecream-form'
import { Button, Loading } from 'react-icecream-2'

import CommonUpload, { IProps as CommonUploadProps } from '..'

import style from './style.m.less'

export interface Props extends Required<Pick<CommonUploadProps, 'uploadBucketKeyRule'>> {
  state: IState<string>
}

export default observer(function UploadVideo(props: Props) {
  const { state } = props
  const [isLoading, setIsLoading] = useState(false)

  function start(): boolean {
    setIsLoading(true)
    return true
  }

  function end(url: string) {
    state.onChange(url)
    setIsLoading(false)
  }

  return (
    <InputWrapper state={state}>
      <div className={style.wrapper}>
        <Loading loading={isLoading}>
          <div className={style.main}>
            <CommonUpload
              accept={undefined}
              uploadBucketKeyRule={props.uploadBucketKeyRule}
              beforeUpload={start}
              onUploaded={end}
            >
              <Button type="link">上传</Button>
            </CommonUpload>
            {state.value && (
              <video src={state.value} controls className={style.preview}></video>
            )}
          </div>
        </Loading>
      </div>
    </InputWrapper>
  )
})