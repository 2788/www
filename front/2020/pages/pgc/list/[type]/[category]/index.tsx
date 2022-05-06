/**
 * @file 内容站 - 列表页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { GetStaticPropsContext } from 'next'

import { ContentType, contentTypes, ContentCategory, contentCategories } from 'constants/pgc/content'
import { listReleasedContent, ListOptions } from 'apis/admin/pgc/content'
import { getPageSize } from 'components/pgc/content/List'

import { Props } from './page/[page]'

export { default } from './page/[page]'

export async function getStaticProps(ctx: GetStaticPropsContext<{ type: string, category: string }>) {
  const params = ctx.params!
  const type = params.type as ContentType
  const category = params.category === 'all' ? null : (params.category as ContentCategory)

  const options: ListOptions = {
    offset: 0,
    limit: getPageSize(type, false),
    type,
    category: category ?? undefined
  }
  const result = await listReleasedContent(options)

  const props: Props = {
    type,
    category,
    firstScreenContent: {
      contents: result.data,
      currentPage: 1,
      total: result.count
    }
  }
  return { props }
}

export async function getStaticPaths() {
  const paths: Array<{ params: { type: string, category: string } }> = []
  contentTypes.forEach(type => {
    [...contentCategories, 'all'].forEach(category => {
      paths.push({
        params: {
          type,
          category
        }
      })
    })
  })
  return {
    paths,
    fallback: false
  }
}
