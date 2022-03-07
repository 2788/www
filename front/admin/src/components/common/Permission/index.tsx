import React from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'
import { PermissionProps, PermissionStore as CurrentUserPermissionStore } from 'admin-base/user/permission'

type Props = {
  message?: string
} & PermissionProps

// 引自 admin-base/user/permission ,增加 message 字段方便修改提示文案
export default observer(function Permission(
  { code, deny = false, message = '没有权限，可找 @tangbingyan 开通权限', children }: Props
) {
  const currentUserPermissionStore = useInjection(CurrentUserPermissionStore)

  if (currentUserPermissionStore.isLoading) {
    return (<>加载中</>)
  }

  const hasPermission = currentUserPermissionStore.hasPermission(code)

  if (deny) {
    return hasPermission ? null : (<>{children}</>)
  }

  return (<>{hasPermission ? children : message}</>)
})
