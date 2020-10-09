/**
 * @file /events/qvm0rmb 页面重定向到活动站对应的页面 https://marketing.qiniu.com/activity/qvm0rmbv2
 * @description 301 重定向放在老官网有一些问题，bucket 镜像回源的时候跟随 301
 * 因此在新官网直接重定向
 */

import React from 'react'
import Redirect from 'components/Redirect'

import { marketingHost } from 'constants/env'

export default function Qvm0rmbPage() {
  const target = `${marketingHost}/activity/qvm0rmbv2`

  return <Redirect target={target} />
}
