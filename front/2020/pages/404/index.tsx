/**
 * @file 404 页面
 */

import React from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import Button from 'components/UI/Button'

import img404 from './image.png'
import style from './style.less'

export default function NotFoundPage() {

  const router = useRouter()

  return (
    <Layout title="页面未找到" keywords="" description="">
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
