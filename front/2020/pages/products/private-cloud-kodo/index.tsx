/**
 * @file 重定向到私有云存储解决方案页面
 * @description 目标路由 /solutions/kodoe
 */

import Redirect from 'components/Redirect'

export default function PrivateCloudKodoPage() {
  const target = '/solutions/kodoe'

  return (
    <Redirect target={target} />
  )
}
