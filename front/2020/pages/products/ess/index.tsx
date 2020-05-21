/**
 * @file 重定向到监控视频边缘存储解决方案页面
 * @description 目标路由 /solutions/ess
 */

import Redirect from 'components/Redirect'

export default function EssPage() {
  const target = '/solutions/ess'

  return (
    <Redirect target={target} />
  )
}
