/**
 * @file svg file input
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 抽公共组件

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { RcFile } from 'react-icecream-1/lib/upload'
import { Button, Loading, Dialog, DialogFooter } from 'react-icecream-2'
import { InputWrapper } from 'react-icecream-form'
import { DebouncedFieldState } from 'formstate-x'
import { getMessage } from 'qn-fe-core/exception'

import { iconConfig } from 'constants/icon'
import CommonUpload from 'components/common/Upload'

import SvgIconPreview from './SvgIconPreview'

import style from './style.m.less'

export function createState(svg?: string) {
  return new DebouncedFieldState(svg ?? '')
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function SvgFileInput({ state }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  function updateFileContent(file: RcFile): boolean {
    const isOver = file.size > iconConfig.maxSize * 1024
    if (isOver) {
      setErrorText(`上传的图片大小不能超过 ${iconConfig.maxSize} KB`)
      return false
    }

    setIsLoading(true)
    file.text()
      .then(
        svg => { state.set(svg) },
        err => { setErrorText(getMessage(err) ?? '') }
      )
      .finally(() => {
        setIsLoading(false)
      })

    return false
  }

  return (
    <InputWrapper state={state}>
      <div className={style.wrapper}>
        <div className={style.main}>
          <Loading loading={isLoading}>
            <CommonUpload
              accept=".svg"
              uploadBucketKeyRule="icon"
              beforeUpload={updateFileContent}
            >
              <Button type="link" className={style.btn}>选择文件</Button>
            </CommonUpload>
          </Loading>
          <SvgIconPreview svg={state.value} />
        </div>
        <p className={style.desc}>最大 {iconConfig.maxSize} KB</p>
        <Dialog
          visible={!!errorText}
          onOk={() => { setErrorText('') }}
          onCancel={() => { setErrorText('') }}
          footer={<DialogFooter okText="知道了" cancelButtonProps={{ className: style.hidden }} />}
        >
          {errorText}
        </Dialog>
      </div>
    </InputWrapper>
  )
})
