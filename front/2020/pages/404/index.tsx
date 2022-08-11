/**
 * @file 404 页面
 */

// 相关文档
// https://nextjs.org/docs/advanced-features/custom-error-page
// https://nextjs.org/docs/messages/404-get-initial-props

import React from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import Button from 'components/UI/Button'
import { GlobalBanner } from 'apis/admin/global-banners'

import img404 from './image.png'
import style from './style.less'

export interface Props {
  globalBanners?: GlobalBanner[]
}

export default function NotFoundPage({ globalBanners = [] }: Props) {

  const router = useRouter()

  return (
    <Layout title="页面未找到" keywords="" description="" globalBanners={globalBanners}>
      <div className={style.wrapper}>
        <img className={style.img} src={img404} alt="404" />
        <h4 className={style.title}>出错啦</h4>
        <p className={style.content}>我迷路了，找不到您请求的页面</p>
        <div className={style.btnLine}>
          <Button type="hollow" withBorder onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    </Layout>
  )
}
