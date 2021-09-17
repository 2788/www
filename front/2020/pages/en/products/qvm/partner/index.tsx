import React from 'react'
import Redirect from 'components/Redirect'

// 老官网页面重定向至 404
export default function Main() {
  return <Redirect target="/404" />
}
