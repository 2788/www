/**
 * @file 相关推荐
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 文档： https://cf.qiniu.io/pages/viewpage.action?pageId=100237764

import dayjs from 'dayjs'

import { ContentId, ContentType, ReleasedContent } from 'constants/pgc/content'

import { listReleasedContents } from './content'

export interface ArticleInfo {
  id: ContentId
  keywords: string[]
}

export function getRecommendedContents(relatedList: ReleasedContent[], current: ArticleInfo): ReleasedContent[] {
  relatedList = relatedList.filter(related => related.id !== current.id)

  if (relatedList.length === 0) {
    return []
  }

  const scores = new Map<string, number>()
  for (const related of relatedList) {
    const intersection = related.release.keywords.filter(
      keyword => current.keywords.includes(keyword)
    )
    scores.set(related.id, intersection.length)
  }

  relatedList.sort((a, b) => (
    scores.get(a.id) === scores.get(b.id)
      ? b.release.createdAt - a.release.createdAt
      : scores.get(b.id)! - scores.get(a.id)!
  ))

  return relatedList
}

export async function listRecommendedArticles(article: ArticleInfo) {
  const maxCount = 5
  const after = dayjs().subtract(2, 'year').unix() // 不超过 2 年

  const relatedContentsResult = await listReleasedContents({
    type: ContentType.Article,
    keywords: article.keywords,
    after,
    limit: 999
  })

  const recommendedContents = getRecommendedContents(relatedContentsResult.data, article)

  // 推荐数量不足 `maxCount` 就填充最新文章
  if (recommendedContents.length < maxCount) {
    const latestContentsResult = await listReleasedContents({
      type: ContentType.Article,
      after,
      limit: maxCount + 1 // 有可能把自己给搜出来
    })

    for (const content of latestContentsResult.data) {
      if (content.id !== article.id && !recommendedContents.some(({ id }) => id === content.id)) { // 去重
        recommendedContents.push(content)
      }
    }
  }

  return recommendedContents.slice(0, maxCount)
}
