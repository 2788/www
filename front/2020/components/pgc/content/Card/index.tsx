/**
 * @file 常用豆腐块卡片
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { Tag, TagColor } from 'react-icecream-2'

import { useMobile } from 'hooks/ua'
import { ContentId, ContentDetailWithTime } from 'constants/pgc/content'
import Link from 'components/Link'

import { formateDate } from '../date-time'
import { getContentDetailUrl } from '../url'

import style from './style.less'

const tagColors: TagColor[] = [
  'blue', 'orange', 'magenta', 'green', 'purple', 'olivine', 'orange-red', 'cyan', 'yellow', 'cobalt', 'red', 'lemon'
]

export interface CardContentProps {
  description?: string
  children?: ReactNode
  className?: string
}

export function CardContent({ description, children, className }: CardContentProps) {
  return (
    <div className={classNames(style.content, className)}>
      {description && (
        <p title={description}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export interface Props {
  contentDetail: ContentDetailWithTime
  className?: string
  children?: ReactNode
  tagsAlignRight?: boolean
}

export default function Card({
  contentDetail,
  className,
  children = (<CardContent description={contentDetail.description} />),
  tagsAlignRight
}: Props) {
  const isMobile = useMobile()
  return (
    <div className={classNames(style.card, className)}>
      <h4 className={style.header} title={contentDetail.title}>{contentDetail.title}</h4>
      <div className={style.main}>
        {children}
        <div className={style.footer}>
          <div className={style.time}>{formateDate(contentDetail.createdAt)}</div>
          <div
            className={classNames(style.tags, (tagsAlignRight ?? !isMobile) && style.tagsRight)}
            title={contentDetail.keywords.join(', ')}
          >
            {contentDetail.keywords.map((keyword, index) => (
              isMobile
              ? (<span key={index}>{keyword}</span>)
              : (<Tag key={index} color={tagColors[index % tagColors.length]}>{keyword}</Tag>)
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export interface CardLinkProps {
  id: ContentId
  children: ReactNode
  className?: string
}

export function CardLink({ id, children, className }: CardLinkProps) {
  return (
    <Link href={getContentDetailUrl(id)} className={classNames(style.cardLink, className)}>
      {children}
    </Link>
  )
}
