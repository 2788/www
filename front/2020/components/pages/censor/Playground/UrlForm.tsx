/**
 * @file URL 输入表单
 * @description 用于输入网络图片 / 视频 URL
 */

import React, { useState, FormEvent } from 'react'
import Button from 'components/UI/Button'
import { isUrl } from 'utils'
import style from './style.less'

export type Props = {
  placeholder: string
  onSubmit(url: string): void
  isAudio?: boolean
}

export default function UrlForm({ placeholder, onSubmit, isAudio = false }: Props) {
  const [input, setInput] = useState('')

  const isValid = isUrl(input)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(input)
  }

  return (
    <form className={isAudio ? style.audioInputLine : style.inputLine} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.input}
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button
        type="primary"
        disabled={!isValid}
        className={style.submitBtn}
      >检测</Button>
    </form>
  )
}
