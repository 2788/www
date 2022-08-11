/**
 * @file 搜索结果页
 * @description 支持参数 ?keyword&tag
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Form from 'components/pages/search/Form'
import Result, { pageSize } from 'components/pages/search/Result'
import MobileResult from 'components/pages/search/Result/Mobile'
import Tabs, { tagOption2Tag, tagOptionAll, tagOptions, TagOption, isTagOption } from 'components/pages/search/Tabs'
import Recommend from 'components/pages/search/Recommend'
import { track } from 'utils/sensors'
import { useApiWithParams } from 'hooks/api'
import { useQueryValue, useQuery } from 'hooks/url'
import { useMobile } from 'hooks/ua'
import { useOnChange } from 'hooks'
import { search as _search, countByTags, SearchResult, SearchResultItem, SearchParams } from 'apis/search'
import { getGlobalBanners } from 'apis/admin/global-banners'
import style from './style.less'

async function count(keyword: string) {
  // 不指定关键词就别发请求了，直接置空
  if (!keyword) return null
  return countByTags({
    keyword,
    tags: tagOptions.map(tagOption2Tag)
  })
}

async function search(params: SearchParams) {
  // 不指定关键词就别发请求了，直接置空
  if (!params.keyword) return null
  track('Search', {
    keyword: params.keyword
  })
  return _search(params)
}

// 移动端加载更多的逻辑
function useMobileLogic(
  searchOptions: SearchParams,
  result: SearchResult | null,
  setPage: (updator: (previous: number) => number) => void
) {
  // 维护一份用于展示的列表
  const [itemsForShow, setItemsForShow] = useState<SearchResultItem[]>([])

  // 每次查完把当次查询结果加到列表最后
  useEffect(() => {
    if (result) {
      setItemsForShow(current => [...current, ...result.items])
    }
  }, [result])

  // 关键词或类别发生变化则清空列表
  useEffect(() => {
    setItemsForShow([])
  }, [searchOptions.keyword, searchOptions.tag])

  const handleLoadMore = useCallback(() => {
    setPage(currentPage => currentPage + 1)
  }, [setPage])

  return {
    result: result && {
      items: itemsForShow,
      total: result.total
    },
    handleLoadMore
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent() {
  // URL 参数 keyword -> 关键词
  const [keyword] = useQueryValue('keyword', '')
  // URL 参数 tag -> 类别
  const [_tagOption, setTagOption] = useQueryValue('tag', tagOptionAll)
  const [, setQuery] = useQuery()
  const tagOption = isTagOption(_tagOption) ? _tagOption : tagOptionAll

  const [page, setPage] = useState(0)

  // 类别发生变更 -> 重置页码
  useOnChange(() => setPage(0), [tagOption])

  const searchOptions = useMemo(() => ({
    keyword,
    tag: tagOption2Tag(tagOption),
    from: pageSize * page,
    limit: pageSize
  }), [keyword, tagOption, page])

  const { $: result, call: doSearch, loading } = useApiWithParams(
    search, { params: [searchOptions], delay: 100 }
  )
  const { $: counts, call: doCount } = useApiWithParams(
    count, { params: [keyword], delay: 100 }
  )

  function handleKeywordSubmit(newKeyword: string) {
    // 这边不通过 setKeyword / setTagOptionz 做是因为更新路由操作是异步的
    // 后续的 set 会把前面的 set 结果给冲掉，这里合并为一次 setQuery，临时解决这个问题
    // TODO: 优化之
    setQuery({
      keyword: newKeyword,
      tag: tagOptionAll
    })
    // 强制什么都干一遍，防止 keyword/tag/page 这些值没改变导致没有反应
    setPage(0)
    doSearch()
    doCount()
  }

  function handleTagOptionChange(newTagOption: TagOption) {
    setTagOption(newTagOption)
    setPage(0)
  }

  const pcResultView = (
    <Result
      result={result}
      page={page}
      onPageChange={setPage}
      loading={loading}
    />
  )

  const isMobile = useMobile()
  const { result: mobileResult, handleLoadMore } = useMobileLogic(searchOptions, result, setPage)

  const mobileResultView = (
    <MobileResult
      result={mobileResult}
      onLoadMore={handleLoadMore}
      loading={loading}
    />
  )

  return (
    <>
      <Form keyword={keyword} onSubmit={handleKeywordSubmit} />
      <div className={style.main}>
        <div className={style.left}>
          <Tabs
            value={tagOption}
            onChange={handleTagOptionChange}
            counts={counts || []}
          />
          {isMobile ? mobileResultView : pcResultView}
        </div>
        <Recommend className={style.right} />
      </div>
    </>
  )
}

export default function SearchPage({ globalBanners }: Props) {
  return (
    <Layout title="搜索" keywords="" description="" globalBanners={globalBanners}>
      <PageContent />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
