/**
 * @file 解决方案预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import { Page } from 'components/pages/activity/detail/Page'
import { isPreviewContext, usePreviewMessage } from 'utils/admin-preview'
import { IActivity } from 'apis/admin/activity'

const msgKey = 'QINIU_ACTIVITY_PAGE_PREVIEW'

export default function ActivityPagePreview() {
  const previewData = usePreviewMessage<IActivity>(msgKey)

  return (
    <Layout
      title="Preview"
      description=""
      keywords="七牛云, 活动, 会议"
      globalBanners={[]}
    >
      <isPreviewContext.Provider value>
        {previewData && (<Page activity={previewData} />)}
      </isPreviewContext.Provider>
    </Layout>
  )
}
