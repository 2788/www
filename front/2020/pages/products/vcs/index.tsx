/**
 * @file 重定向到视频冷存储解决方案页面
 * @description 目标路由 /solutions/vcs
 */

import Redirect from 'components/Redirect'

export default function VcsPage() {
  const target = '/solutions/vcs'

  return (
    <Redirect target={target} />
  )
}
