/* eslint-disable react/no-danger */
import React from 'react'
import Section from 'components/Product/Section'
import style from './style.less'

export default function Info({ detail = '' }: { detail?: string }) {
  return (
    <Section title="活动详情" header={<div className={style.title}>活动详情</div>} name="info" withTailPadding>
      <div className={style.container} dangerouslySetInnerHTML={{ __html: detail }} />
    </Section>
  )
}
