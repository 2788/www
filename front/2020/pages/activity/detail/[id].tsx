import React from 'react'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'

import { getActivityById, IActivity, getActivities } from 'apis/admin/activity'
import { getGlobalBanners } from 'apis/admin/global-banners'
import Layout from 'components/Product/Layout'
import Banner from 'components/pages/activity/detail/Banner'
import DetailInfo from 'components/pages/activity/detail/Info'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({ activity }: { activity: IActivity | null }) {

  return (
    <>
      <Banner {...activity} />

      <DetailInfo {...activity} />
    </>
  )
}

export default function Detail({ globalBanners, activity }: Props) {
  const title = activity ? activity.title : '活动详情'
  return (
    <Layout
      title={title}
      keywords="七牛云, 活动, 会议"
      description=""
      globalBanners={globalBanners}
    >
      <Page activity={activity} />
    </Layout>
  )
}

async function getData(id?: string) {
  // id 为空就别发请求了
  if (!id) return null
  return getActivityById(id)
}

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id: string }>) {
  const [activity, globalBanners] = await Promise.all([
    getData(params?.id),
    getGlobalBanners()
  ] as const)
  return {
    props: {
      activity,
      globalBanners
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
