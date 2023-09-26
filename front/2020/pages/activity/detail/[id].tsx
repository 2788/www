import React from 'react'
import { GetServerSidePropsContext } from 'next'

import { getActivityById, IActivity, getActivities, PageType } from 'apis/admin/activity'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import Layout from 'components/Product/Layout'
import Banner from 'components/pages/activity/detail/Banner'
import { Page } from 'components/pages/activity/detail/Page'
import DetailInfo from 'components/pages/activity/detail/Info'
import NotFoundPage from 'pages/404'
import Redirect from 'components/Redirect'

type Props = {
  globalBanners?: GlobalBanner[]
  activity: IActivity
}

function RmbPage({ activity }: { activity: IActivity | null }) {

  return (
    <>
      <Banner {...activity} />

      <DetailInfo {...activity} />
    </>
  )
}

export default function Detail({ globalBanners, activity }: Props) {
  if (activity == null) {
    return <NotFoundPage globalBanners={globalBanners} />
  }

  const getDetailPageView = () => {
    // 默认为富媒体
    const pageType: PageType = activity.pageType ?? 'RMB'

    if (pageType === 'RMB' && activity.detail) {
      return <RmbPage activity={activity} />
    }

    if (pageType === 'PAGE' && activity.page) {
      return <Page activity={activity} />
    }

    return <Redirect target="/404" />
  }

  const title = activity ? activity.title : '活动详情'
  return (
    <Layout
      title={title}
      keywords="七牛云, 活动, 会议"
      description=""
      globalBanners={globalBanners || []}
    >
      {getDetailPageView()}
    </Layout>
  )
}

export async function getServerSideProps({ params, res }: GetServerSidePropsContext<{ id: string }>) {
  let activity = null

  if (params?.id) {
    activity = await getActivityById(params.id)
  }

  if (activity == null) {
    // TODO：暂时这么处理，升级 next 后可以：return { notFound: true }
    // 参考：https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#notfound
    res.statusCode = 404
    return { props: {} }
  }

  return {
    props: {
      activity,
      globalBanners: await getGlobalBanners()
    }
  }
}

export async function getServerSidePaths() {
  const maxPageSize = 999
  const { count } = await getActivities({ page: 1, pageSize: 1 })
  const len = Math.ceil(count / maxPageSize)
  const optionsList = Array.from(Array(len), (_, i) => ({ page: i + 1, pageSize: maxPageSize }))
  const resultList = await Promise.all(optionsList.map(options => getActivities(options)))
  const activities = ([] as IActivity[]).concat(...resultList.map(result => result.data)) // flat
  const paths = activities.map(activity => ({ params: { id: activity.id } }))
  return {
    paths,
    fallback: false
  }
}
