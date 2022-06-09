import React, { useState } from 'react'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import { ProductPageNotice, AdvertInfo } from 'apis/thallo'
import { useTrack } from 'hooks/thallo'

export interface Props {
  news: Array<AdvertInfo<ProductPageNotice>>
  mkts: Array<AdvertInfo<ProductPageNotice>>
}

function ProductNoticeItem(props: AdvertInfo<ProductPageNotice>) {
  const [link, setLink] = useState<HTMLElement | null>(null)
  useTrack(link, props)
  return (
    <PageNoticeItem linkRef={setLink} href={props.elements.url.value}>
      {props.elements.txt.value}
    </PageNoticeItem>
  )
}

export default function ProductNotice({ news, mkts }: Props) {
  if (news.length === 0 && mkts.length === 0) {
    return null
  }

  return (
    <PageNotice>
      {news.length > 0 && (
        <PageNoticeGroup title="新闻动态" type="news">
          {news.map((item, i) => (
            <ProductNoticeItem key={i} {...item} />
          ))}
        </PageNoticeGroup>
      )}
      {mkts.length > 0 && (
        <PageNoticeGroup title="福利活动" type="welfares">
          {mkts.map((item, i) => (
            <ProductNoticeItem key={i} {...item} />
          ))}
        </PageNoticeGroup>
      )}
    </PageNotice>
  )
}
