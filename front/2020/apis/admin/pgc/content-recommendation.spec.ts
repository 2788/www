/**
 * @file ut of content recommendation
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ReleasedContent } from 'constants/pgc/content'

import { getRecommendedContents } from './content-recommendation'

describe('getRecommendedContents', () => {
  it('should work well', () => {
    function t(keywords: string[], createdAt: number): ReleasedContent {
      return { id: createdAt.toString(), release: { keywords, createdAt } } as ReleasedContent
    }

    expect(getRecommendedContents(
      [
        t(['a'], 3),
        t(['a', 'b'], 2),
        t(['b'], 1),
        t(['a', 'c'], 4),
        t(['c'], 5),
        t(['a', 'b', 'c'], 6),
        t([], 7),
        t(['a', 'b'], 8)
      ],
      {
        id: '0',
        keywords: ['a', 'b']
      }
    )).toEqual([
      t(['a', 'b'], 8),
      t(['a', 'b', 'c'], 6),
      t(['a', 'b'], 2),
      t(['a', 'c'], 4),
      t(['a'], 3),
      t(['b'], 1),
      t([], 7),
      t(['c'], 5)
    ])
  })
})
