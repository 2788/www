import React from 'react'
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { getActivityById, IActivity, getActivities } from 'apis/admin/activity'
import Layout from 'components/Product/Layout'
import Banner from 'components/pages/activity/detail/Banner'
import DetailInfo from 'components/pages/activity/detail/Info'

function Page({ activity }: { activity: IActivity | null }) {

  return (
    <>
      <Banner {...activity} />

      <DetailInfo {...activity} />
    </>
  )
}

export default function Detail({ activity }: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = activity ? activity.title : '活动详情'
  return (
    <Layout
      title={title}
      keywords="七牛云, 活动, 会议"
      description=""
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

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
  return {
    props: {
      activity: await getData(params?.id)
    }
  }
}

export async function getStaticPaths() {
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
