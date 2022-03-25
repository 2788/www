/**
 * @file 上传文件
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

export default observer(function UploadFile(props: Props) {
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
              <a
                href={state.value}
                download
                // eslint-disable-next-line react/jsx-no-target-blank
                target="_blank"
                className={style.download}
              >
                下载
              </a>
            )}
          </div>
        </Loading>
      </div>
    </InputWrapper>
  )
})
