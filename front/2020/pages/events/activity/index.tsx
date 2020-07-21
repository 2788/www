/**
 * @file /events/activity 页面重定向到活动站首页
 * @description 301 重定向放在老官网有一些问题，bucket 镜像回源的时候跟随 301
 * 因此在新官网直接重定向
 */

import React from 'react'
import Redirect from 'components/Redirect'

import { marketingHost } from 'constants/env'

export default function ActivityPage() {
  const target = `${marketingHost}/activity/all`

  return <Redirect target={target} />
}
