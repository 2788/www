/**
 * @file 开发者活动动态路由页面
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { pageSize } from 'constants/activity'
import { getActivities } from 'apis/admin/activity'
import Activity from '..'

export default function DynamicActivity(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Activity {...props} />
  )
}

export async function getStaticPaths() {
  // 先获取所有数据的条数
  const { count } = await getActivities({ page: 1, pageSize })
  const len = Math.ceil(count / pageSize)
  const paths = Array.from(Array(len), (_, i) => ({ params: { page: `${i + 1}` } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const currentPage = Number(params.page)
  const res = await getActivities({ page: currentPage, pageSize })
  return {
    props: {
      activities: res.data,
      page: currentPage,
      total: res.count
    }
  }
}
