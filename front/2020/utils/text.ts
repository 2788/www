/**
 * @file 文本操作相关辅助工具
 */

export type ContentPart = {
  isUrl: boolean
  content: string
}

/** 将输入的文本内容进行分割，区分 URL 内容与普通文本 */
export function splitWithUrl(content: string): ContentPart[] {
  const urlPattern = /\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

  const parts: ContentPart[] = []
  let start = 0
  let matched: RegExpExecArray | null = null

  while (matched = urlPattern.exec(content)) { // eslint-disable-line no-cond-assign
    if (matched.index > start) {
      parts.push({ isUrl: false, content: content.slice(start, matched.index) })
    }
    parts.push({ isUrl: true, content: matched[0] })
    start = matched.index + matched[0].length
  }

  if (content.length > start || parts.length === 0) {
    parts.push({ isUrl: false, content: content.slice(start) })
  }

  return parts
}
