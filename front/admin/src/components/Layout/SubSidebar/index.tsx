import React from 'react'
import Sidebar, { LinkItemWithDot as LinkItem, Group } from 'admin-base/common/components/Sidebar'
import { accountTitle, userRoute, userTitle, roleTitle, roleRoute, permissionTitle, permissionRoute, wwwTitle, homepageTitle, homepageRoute, productTitle, productRoute, accountRoute, wwwRoute } from 'constants/route'

export default function SubSidebar() {
  return (
    <Sidebar title="官网 admin">
      <Group title={accountTitle} path={accountRoute}>
        <LinkItem relative to={userRoute}>{userTitle}</LinkItem>
        <LinkItem relative to={roleRoute}>{roleTitle}</LinkItem>
        <LinkItem relative to={permissionRoute}>{permissionTitle}</LinkItem>
      </Group>
      <Group title={wwwTitle} path={wwwRoute}>
        <LinkItem relative to={homepageRoute}>{homepageTitle}</LinkItem>
        <LinkItem relative to={productRoute}>{productTitle}</LinkItem>
      </Group>
    </Sidebar>
  )
}
