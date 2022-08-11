/**
 * @file 市场活动
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import { pageSize } from 'constants/activity'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { getActivities, IActivity } from 'apis/admin/activity'

import List from 'components/pages/activity/main/List'
import Pagination from 'components/pages/activity/main/Pagination'

import Banner from './images/banner.svg'

export interface Props {
  activities: IActivity[]
  page: number
  total: number
  globalBanners: GlobalBanner[]
}

function Page({ activities, page, total }: Omit<Props, 'globalBanners'>) {
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

export default function Activity({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="市场活动"
      keywords="活动, 开发者, 市场活动, 线上直播, 线下活动, 前沿, 优质, 技术, 生态"
      description="为广大客户和开发者提供线上直播和线下活动，分享七牛最新产品动态和实践应用，共同探讨最前沿最优质的技术信息。"
      globalBanners={globalBanners}
    >
      <Page {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const page = 1
  const [res, globalBanners] = await Promise.all([
    getActivities({ page, pageSize }),
    getGlobalBanners()
  ])
  return {
    props: {
      activities: res.data,
      page,
      total: res.count,
      globalBanners
    }
  }
}
