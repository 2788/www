import React from 'react'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import { INotice } from 'apis/admin/notice'

export default function ProducNotice({ notices }: { notices: INotice[] }) {
  if (!notices || !notices.length) {
    return null
  }
  const news = notices.filter(item => item.type === 'news')
  const welfares = notices.filter(item => item.type === 'welfares')

  return (
    <PageNotice>
      {news.length > 0 && (
        <PageNoticeGroup title="新闻动态" type="news">
          {news.map((item, index) => (
            <PageNoticeItem href={item.link} key={index}>
              {item.summary}
            </PageNoticeItem>
          ))}
        </PageNoticeGroup>
      )}
      {welfares.length > 0 && (
        <PageNoticeGroup title="福利活动" type="welfares">
          {welfares.map((item, index) => (
            <PageNoticeItem href={item.link} key={index}>
              {item.summary}
            </PageNoticeItem>
          ))}
        </PageNoticeGroup>
      )}
    </PageNotice>
  )
}
