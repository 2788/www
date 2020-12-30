/**
 * @file 开发者活动
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import { pageSize } from 'constants/activity'

import { getActivities, IActivity } from 'apis/admin/activity'

import List from 'components/pages/activity/main/List'
import Pagination from 'components/pages/activity/main/Pagination'

import Banner from './images/banner.svg'

export interface IProps {
  activities: IActivity[]
  page: number
  total: number
}

function Page({ activities, page, total }: IProps) {
  return (
    <>
      <PageBanner
        title="开发者活动"
        desc="为广大开发者提供丰富的线上直播和线下活动。致力于分享最前沿、优质的技术信息，共创繁荣技术生态。"
        icon={<Banner />}
      />

      <List activities={activities} />

      {
        total > pageSize && <Pagination current={page} total={total} />
      }
    </>
  )
}

export default function Activity(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="开发者活动"
      keywords="活动, 开发者, 开发者活动, 线上直播, 线下活动, 前沿, 优质, 技术, 生态"
      description="为广大开发者提供丰富的线上直播和线下活动。致力于分享最前沿、优质的技术信息，共创繁荣技术生态。"
    >
      <Page {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  const page = 1
  const res = await getActivities({ page, pageSize })
  return {
    props: {
      activities: res.data,
      page,
      total: res.count
    }
  }
}
