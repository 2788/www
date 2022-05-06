/**
 * @file 加载更多
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'
import { LoadingThinIcon } from 'react-icecream-2/esm/icons'

import { useMobile } from 'hooks/ua'
import Button from 'components/UI/Button'

import style from './style.less'

export interface Props {
  loading: boolean
  hasMore: boolean
  onLoadMore(): void
}

export default function LoadMore({ loading, hasMore, onLoadMore }: Props) {
  const isMobile = useMobile()

  if (!hasMore) {
    return null
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (hasMore && !loading) {
      onLoadMore()
    }
  }

  return (
    <div className={style.main}>
      {/* TODO: loading 相关集成进 Button 组件里 */}
      <Button
        // eslint-disable-next-line no-nested-ternary
        type={isMobile || !loading ? 'hollow' : 'primary-light'}
        withBorder={!isMobile}
        className={classNames(style.btn, loading && style.loading)}
        onClick={handleClick}
      >
        {
          loading
          ? (
            <div className={style.loadingContent}>
              <LoadingThinIcon className={style.loadingIcon} />
              <span>加载中</span>
            </div>
          )
          : '点击加载更多'
        }
      </Button>
    </div>
  )
}
