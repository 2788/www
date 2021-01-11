/**
 * @file 展示文本的组件
 * @description 对文本内容进行分析并进行合适的展示（如 URL 自动展示为链接）
 */

import React from 'react'
import Link from 'components/Link'
import { splitWithUrl } from 'utils/text'

export type Props = {
  content: string
}

// 对连续的重复换行去重
function dedupeLineBreak(text: string) {
  return text.replace(/(\r?\n){2,}/g, '\n')
}

export default function Text({ content }: Props) {
  const parts = splitWithUrl(content)
  const partsView = parts.map((part, i) => (
    part.isUrl
    ? <Link key={i} href={part.content}>{part.content}</Link>
    : <span key={i}>{dedupeLineBreak(part.content)}</span>
  ))
  return <>{partsView}</>
}
