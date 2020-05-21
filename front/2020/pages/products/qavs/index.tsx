/**
 * @file 重定向到智能视频云解决方案页面
 * @description 目标路由 /solutions/qavs
 */

import Redirect from 'components/Redirect'

export default function QavsPage() {
  const target = '/solutions/qavs'

  return (
    <Redirect target={target} />
  )
}
