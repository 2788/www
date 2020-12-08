import React from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'
import { IProps } from 'admin-base/user/components/Permission'
import CurrentUserPermissionStore from 'admin-base/user/stores/user-permission'

type Props = {
  message?: string
} & IProps

// 引自 admin-base/user/components/Permission ,增加 message 字段方便修改提示文案
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
