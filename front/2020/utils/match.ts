/**
 * @file 关键词匹配相关辅助工具
 */

export function match(input: string, keyword: string): boolean {
  // TODO: 考虑分词？
  return input.toLowerCase().includes(keyword.toLowerCase())
}

export function max<T>(list: T[], getValue: (v: T) => number): T | undefined {
  if (list.length <= 0) return undefined
  let longest = list[0]
  for (const item of list) {
    if (getValue(item) > getValue(longest)) {
      longest = item
    }
  }
  return longest
}

export function matchKeywords(input: string, keywords: string[]) {
  const matchedKeywords = keywords.filter(keyword => match(input, keyword))
  return max(matchedKeywords, keyword => keyword.length)
}

interface WithNameAndKeywords {
  name: string
  keywords: string[]
}

export function matchNameAndKeywords<T extends WithNameAndKeywords>(input: string, list: T[]): T | undefined {
  const matched = list.map(
    item => ({ ...item, matchedKeyword: matchKeywords(input, [item.name, ...item.keywords]) })
  ).filter(item => item.matchedKeyword != null)
  return max(matched, item => item.matchedKeyword!.length)
}
