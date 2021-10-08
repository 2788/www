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

const cnPattern = /[\u4e00-\u9fa5]/
const numEnPattern = /[a-zA-Z0-9]/

/**
 * 拼接文本，在拼接时尽可能遵循[文案排版对空格的要求](https://github.com/sparanoid/chinese-copywriting-guidelines#%E7%A9%BA%E6%A0%BC)；
 * 如，将中英文（或中文与数字）进行拼接时添加空格
 */
export function joinText(...textList: string[]): string {
  let result = ''
  for (const text of textList) {
    const baseTail = result[result.length - 1] || ''
    const addonHead = text[0] || ''
    if (
      (cnPattern.test(baseTail) && numEnPattern.test(addonHead))
      || (numEnPattern.test(baseTail) && cnPattern.test(addonHead))
    ) {
      result += ' '
    }
    result += text
  }
  return result
}
