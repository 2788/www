/**
 * @file 推荐文章
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'

import { ContentId, ContentDetail, ReleasedContent, ContentDetailWithTime } from 'constants/pgc/content'
import { listRecommendedArticles } from 'apis/admin/pgc/content-recommendation'

import Card, { CardLink } from '../../Card'
import PosterImage from '../../PosterImage'

import style from './articles.less'

export interface Props {
  id: ContentId
  contentDetail: ContentDetail
}

export default function RecommendedArticles({ id, contentDetail: { keywords } }: Props) {
  const [articles, setArticles] = useState<ReleasedContent[]>([])

  useEffect(() => {
    listRecommendedArticles({ id, keywords }).then(recommendedArticles => { setArticles(recommendedArticles) })
  }, [id, keywords])

  if (articles.length === 0) {
    return null
  }

  return (
    <div className={style.main}>
      <div className={style.title}>推荐阅读</div>
      {articles.map(article => (<Item key={article.id} id={article.id} contentDetail={article.release} />))}
    </div>
  )
}

interface ItemProps {
  id: ContentId
  contentDetail: ContentDetailWithTime
}

function Item(props: ItemProps) {
  const contentDetail = useMemo(
    () => ({ ...props.contentDetail, keywords: [] }),
    [props.contentDetail]
  )

  return (
    <CardLink id={props.id} className={style.item}>
      <PosterImage url={contentDetail.posterUrl} ratio={10 / 18} className={style.img} />
      <Card contentDetail={contentDetail} className={style.card}>
        {null}
      </Card>
    </CardLink>
  )
}
