import React from 'react'
import Redirect from 'components/Redirect'

import { Solution, urlMap } from 'constants/solutions'

// 重定向至 /solutions/plsv 页面
export default function Main() {
  const target = urlMap[Solution.Plsv] || '/'

  return <Redirect target={target} />
}
