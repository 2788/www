/**
 * @file 市场活动动态路由页面
 */

import React from 'react'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'

import { pageSize } from 'constants/activity'
import { getActivities } from 'apis/admin/activity'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Activity from '..'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function DynamicActivity(props: Props) {
  return (
    <Activity {...props} />
  )
}

export async function getServerSidePaths() {
  // 先获取所有数据的条数
  const { count } = await getActivities({ page: 1, pageSize })
  const len = Math.ceil(count / pageSize)
  const paths = Array.from(Array(len), (_, i) => ({ params: { page: `${i + 1}` } }))
  return {
    paths,
    fallback: false
  }
}

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ page: string }>) {
  const currentPage = Number(params!.page)
  const [res, globalBanners] = await Promise.all([
    getActivities({ page: currentPage, pageSize }),
    getGlobalBanners()
  ])
  return {
    props: {
      activities: res.data,
      page: currentPage,
      total: res.count,
      globalBanners
    }
  }
}
