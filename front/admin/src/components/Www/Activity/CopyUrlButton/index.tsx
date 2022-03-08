import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Input } from 'react-icecream-1'

import style from './style.m.less'

export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <>
      <Input.TextArea
        autosize={{ minRows: 2, maxRows: 4 }}
        value={url}
        readOnly
      />
      <section className={style.section}>
        <span className={style.tips}>链接三天内有效，过期无法使用</span>
        <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
          <Button type="primary">{copied ? '已复制' : '复制'}</Button>
        </CopyToClipboard>
      </section>
    </>
  )
}
