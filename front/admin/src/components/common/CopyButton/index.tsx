/**
 * @file 复制按钮
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, ButtonProps, Tooltip, TooltipProps } from 'react-icecream'

const time = 2 * 1e3

export interface Props extends ButtonProps, Pick<TooltipProps, 'placement'> {
  /* 复制文本内容 */
  text: string
}

export default function CopyButton({ text, placement, ...buttonProps }: Props) {
  const latestRef = useRef(0)
  const [visible, setVisible] = useState(false)

  function copy() {
    latestRef.current = Date.now()
    setVisible(true)

    setTimeout(() => {
      if (Date.now() - latestRef.current > time) {
        setVisible(false)
      }
    }, time)
  }

  return (
    <Tooltip title="复制完成！" placement={placement} visible={visible}>
      <CopyToClipboard text={text} onCopy={copy}>
        <Button type="link" {...buttonProps} />
      </CopyToClipboard>
    </Tooltip>
  )
}
