import React from 'react'
import Redirect from 'components/Redirect'

import { Solution, urlMap } from 'constants/solutions'

// 重定向至 /solutions/rtclive 页面
export default function Main() {
  const target = urlMap[Solution.Rtclive] || '/'

  return <Redirect target={target} />
}
