import React from 'react'
import Redirect from 'components/Redirect'

import { marketingHost } from 'constants/env'

// 重定向至活动站 /activity/2021618-act-cdn 页面
export default function Main() {
  const target = `${marketingHost}/activity/2021618-act-cdn`

  return <Redirect target={target} />
}
