/**
 * @file 市场活动
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
        title="市场活动"
        desc="为广大客户和开发者提供线上直播和线下活动，分享七牛最新产品动态和实践应用，共同探讨最前沿最优质的技术信息。"
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
      title="市场活动"
      keywords="活动, 开发者, 市场活动, 线上直播, 线下活动, 前沿, 优质, 技术, 生态"
      description="为广大客户和开发者提供线上直播和线下活动，分享七牛最新产品动态和实践应用，共同探讨最前沿最优质的技术信息。"
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
