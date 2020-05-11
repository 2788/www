/**
 * @file 搜索结果页
 * @description 支持参数 ?keyword&tag
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Layout from 'components/Layout'
import Form from 'components/pages/search/Form'
import Result, { pageSize } from 'components/pages/search/Result'
import MobileResult from 'components/pages/search/Result/Mobile'
import Tabs, { tagOption2Tag, tagOptionAll, tagOptions, TagOption, isTagOption } from 'components/pages/search/Tabs'
import Recommend from 'components/pages/search/Recommend'
import { useApiWithParams } from 'hooks/api'
import { useQueryValue } from 'hooks/url'
import { useMobile } from 'hooks/ua'
import { useOnChange } from 'hooks'
import { search as _search, countByTags, SearchResult, SearchResultItem, SearchParams } from 'apis/search'
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

export default function SearchPage() {
  // URL 参数 keyword -> 关键词
  const [keyword, setKeyword] = useQueryValue('keyword', '')
  // URL 参数 tag -> 类别
  const [_tagOption, setTagOption] = useQueryValue('tag', tagOptionAll)
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
    setKeyword(newKeyword)
    // 强制什么都干一遍，防止 keyword/tag/page 这些值没改变导致没有反应
    setTagOption(tagOptionAll)
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
    <Layout>
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
    </Layout>
  )
}
