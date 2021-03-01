import React, { ReactNode } from 'react'
import Link from 'components/Link'
import style from './index.less'

export default function ContentSection({ title, url, children }: { title: string, url?: string, children: ReactNode }) {
  return (
    <section>
      {
        url !== undefined
          ? <div className={style.title}><Link href={url}>{title} &gt;</Link></div>
          : <div className={style.title}>{title}</div>
      }
      {children}
    </section>
  )
}
