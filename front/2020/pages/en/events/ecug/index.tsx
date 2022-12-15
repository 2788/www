import React from 'react'
import Redirect from 'components/Redirect'

import { Activity, urlMap } from 'constants/activity'

// 重定向至 /activity 页面
export default function Main() {
  return <Redirect target={urlMap[Activity.Main]} />
}
