import React from 'react'
import Redirect from 'components/Redirect'

// 因为下掉「视频智能分析」页面，所以同时把价格页也下了
export default function Main() {
  return (
    <Redirect target="/" />
  )
}
