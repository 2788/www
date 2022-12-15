import React from 'react'
import Redirect from 'components/Redirect'

import { Solution, urlMap } from 'constants/solutions'

// 重定向至 /solutions/ess 页面
export default function Main() {
  const target = urlMap[Solution.Ess] || '/'

  return <Redirect target={target} />
}
