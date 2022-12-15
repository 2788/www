import React from 'react'
import Redirect from 'components/Redirect'

import { marketingHost } from 'constants/env'

// 重定向至活动站 /activity/act-free 页面
export default function Main() {
  const target = `${marketingHost}/activity/act-free`

  return <Redirect target={target} />
}
