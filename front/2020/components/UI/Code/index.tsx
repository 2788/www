
/**
 * @file 解决方案 code 模块
 * @author  zhangqiang
 */

import React, { useEffect, useRef } from 'react'
import 'highlight.js/styles/a11y-light.css'
import cls from 'classnames'

export type Props = {
  code: string
  language: string
  className?: string
}

export default function Code({ code, language, className = '' }: Props) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    import('highlight.js').then(hljs => {
      if (codeRef.current) {
        hljs.default.highlightElement(codeRef.current)
      }
    })
  }, [])

  return <code ref={codeRef} className={cls(language, className)}>{code}</code>
}
