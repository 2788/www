/**
 * @file 原互动直播解决方案，重定向到社交娱乐解决方案页
 */

import React from 'react'
import Redirect from 'components/Redirect'
import { Solution, urlMap } from 'constants/solutions'

export default function RtcLive() {
  return <Redirect target={urlMap[Solution.MediaSocial]!} />
}
