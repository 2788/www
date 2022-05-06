/**
 * @file list entry with type
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetStaticPropsContext } from 'next'

import { ContentType, contentTypes } from 'constants/pgc/content'
import { getListUrl } from 'components/pgc/content/url'
import Redirect from 'components/Redirect'

export interface Props {
  type: ContentType
}

export default function List({ type }: Props) {
  return (
    <Redirect target={getListUrl(type, null)} keepQuery={false} />
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ type: string }>) {
  const params = ctx.params!
  const type = params.type as ContentType
  const props: Props = { type }
  return { props }
}

export async function getStaticPaths() {
  const paths = contentTypes.map(type => ({ params: { type } }))
  return {
    paths,
    fallback: false
  }
}
