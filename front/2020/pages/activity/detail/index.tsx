import React from 'react'
import { useQueryValue } from 'hooks/url'
import { useApiWithParams } from 'hooks/api'
import { getActivityById, IActivity } from 'apis/admin/activity'
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

export default function Detail() {
  const [id] = useQueryValue('id', '')
  const { $: activity } = useApiWithParams(getData, { params: [id] })
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

async function getData(id: string) {
  // id 为空就别发请求了
  if (!id) return null
  return getActivityById(id)
}
