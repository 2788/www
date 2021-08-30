/**
 * @file File Input
 * @desc 文件输入组件，将文件上传并返回外链地址
 * @todo 支持多文件上传
 * @todo 脱离 meihua 并移植到公共代码里
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import * as qiniu from 'qiniu-js'
import { FieldState } from 'formstate-x'
import Icon from 'react-icecream/lib/icon' // FIXME: 换成 icecream-2 但缺 icon
import { useStateInFormItem } from 'react-icecream-2/lib/form-x'

import { meihuaUploadPrefix } from 'constants/appeal'
import { getNormalizedErrorMessage } from 'utils/fetch'
import { ensureValid } from 'utils/form'
import { getUploadToken } from 'apis/meihua'

import style from './style.less'

export type ValidValue = string
export type Value = ValidValue | undefined
export type State = FieldState<Value>

export function createState() {
  return new FieldState<string | undefined>(undefined).validators(
    v => v == null && '请选择文件'
  )
}

export function getValue(state: State): Value {
  return state.value
}

export function getValidValue(state: State): ValidValue {
  ensureValid(state)
  return getValue(state)!
}

export interface Props {
  state: State
}

export default observer(function FileUploadInput({ state }: Props) {
  useStateInFormItem(state)

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [percent, setPercent] = useState(0)

  const handleClick = useCallback(() => {
    inputRef.current!.dispatchEvent(new MouseEvent('click'))
  }, [])

  const handleChange = useCallback(async () => {
    const file = (inputRef.current!.files || [])[0] || null
    setSelectedFile(file)
  }, [])

  useEffect(() => {
    state.reset()
    if (selectedFile == null) return

    setPercent(0)
    setIsUploading(true)
    let abort = () => undefined as void
    upload(selectedFile, (percentage => { setPercent(Number(percentage.toFixed(0))) })).then(
      ctl => {
        abort = () => {
          setIsUploading(false)
          ctl.abort()
        }
        return ctl.promise
      }
    ).then(
      fileKey => {
        state.onChange(fileKey)
        setIsUploading(false)
      },
      (err: unknown) => {
        const message = err instanceof qiniu.QiniuError ? err.message : getNormalizedErrorMessage(err)
        inputRef.current!.value = ''
        state.onChange(undefined)
        state.setError(`上传失败：${message}`)
        setIsUploading(false)
      }
    )

    return () => { abort() }
  }, [selectedFile, state])

  return (
    <div className={style.fileInputMain}>
      <div onClick={handleClick} className={style.inputWrapper}>
        <input ref={inputRef} type="file" onChange={handleChange} />
        {selectedFile != null && isUploading && `正在上传文件（${percent}%）：`}
        {selectedFile != null ? selectedFile.name : '请选择文件'}
      </div>
      <a
        className={style.templateDownload}
        href="https://dn-market-edm.qbox.me/documentation.docx"
        download="申诉模板.docx" // FIXME: 不一定能触发下载，有各种条件限制，待优化
        target="_blank"
        rel="noopener nofollow" // noreferrer
      >
        <Icon type="file" className={style.downloadIcon} />
        下载模板
      </a>
    </div>
  )
})

async function upload(file: File, onNext: (percent: number) => void) {
  const now = dayjs().format('YYYY-MM-DD/HH:mm:ss:SSS')
  const randomNum = Math.floor(Math.random() * 1000)
  const fileName = file.name || 'untitled'
  const key = `${meihuaUploadPrefix}${now}-${randomNum}-${fileName}`
  const token = await getUploadToken(60 * 5)
  let abort = () => undefined as void
  const promise = new Promise<string>((resolve, reject) => {
    const subscription = qiniu.upload(file, key, token).subscribe({
      next: info => { onNext(info.total.percent) },
      error: reject,
      complete: () => resolve(key)
    })
    abort = () => { subscription.unsubscribe() }
  })
  return { abort, promise }
}
