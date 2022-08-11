import React, { useState } from 'react'
import { ConfigProvider } from 'react-icecream-1'

import { Route, Redirect, Switch } from 'qn-fe-core/router'

import BaseLayout, { Page } from 'admin-base/common/components/Layout'
import Navbar from 'admin-base/common/components/Navbar'
import BaseSidebar, { Group, LinkItem } from 'admin-base/common/components/Sidebar'
import { renderUserRoutes, User, UserSidebarGroup } from 'admin-base/user/manage'

import Permission from 'components/common/Permission'
import { PermissionCode } from 'constants/permission'

import Product from 'components/Www/Product'
import Consult from 'components/Www/Consult'
import Activity from 'components/Www/Activity'
import GlobalBanners from 'components/Www/GlobalBanners'
import PgcManage from 'components/Pgc/Manage'
import PgcBanner from 'components/Pgc/Banner'
import Refresh from 'components/Deploy/Refresh'
import Paths from 'components/Deploy/Paths'
import Status from 'components/Deploy/Status'
import {
  accountRoute, wwwTitle, wwwRoute, productTitle, productRoute,
  consultTitle, consultRoute, activityTitle, activityRoute, globalBannersTitle, globalBannersRoute,
  pgcRoute, pgcTitle, pgcManageRoute, pgcManageTitle, pgcBannerRoute, pgcBannerTitle
} from 'constants/route'

import Provider from './Provider'

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <BaseSidebar collapsed={collapsed}>
      <Group title={wwwTitle} path={wwwRoute}>
        <LinkItem relative to={globalBannersRoute}>{globalBannersTitle}</LinkItem>
        <LinkItem relative to={productRoute}>{productTitle}</LinkItem>
        <LinkItem relative to={consultRoute}>{consultTitle}</LinkItem>
        <LinkItem relative to={activityRoute}>{activityTitle}</LinkItem>
      </Group>
      <Group title={pgcTitle} path={pgcRoute}>
        <LinkItem relative to={pgcManageRoute}>{pgcManageTitle}</LinkItem>
        <LinkItem relative to={pgcBannerRoute}>{pgcBannerTitle}</LinkItem>
      </Group>
      <Group title="发布控制台" path="/deploy">
        <LinkItem relative to="/refresh">缓存刷新</LinkItem>
        <LinkItem relative to="/paths">地址大全</LinkItem>
      </Group>
      <UserSidebarGroup prefix={accountRoute} />
    </BaseSidebar>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <BaseLayout
      header={<Navbar header="官网 Admin" onCollapse={setCollapsed} />}
      sidebar={<Sidebar collapsed={collapsed} />}
    >
      <Page>{children}</Page>
    </BaseLayout>
  )
}

export default function App() {

  const userRoutes = renderUserRoutes((
    <Permission code={PermissionCode.ACCOUNT}>
      <User />
    </Permission>
  ), accountRoute)

  return (
    <ConfigProvider>
      <Provider>
        <Layout>
          <Switch>
            <Route relative exact path="/">
              <Redirect relative to={wwwRoute} />
            </Route>
            <Route relative title={wwwTitle} path={wwwRoute}>
              <Switch>
                <Route relative exact path="/">
                  <Redirect relative to={productRoute} />
                </Route>
                <Route relative title={globalBannersTitle} path={globalBannersRoute}>
                  <Permission code={PermissionCode.GLOBAL_BANNER}>
                    <GlobalBanners />
                  </Permission>
                </Route>
                <Route relative title={productTitle} path={productRoute}>
                  <Permission code={PermissionCode.PRODUCT}>
                    <Product />
                  </Permission>
                </Route>
                <Route relative title={consultTitle} path={consultRoute}>
                  <Permission code={PermissionCode.CONSULT}>
                    <Consult />
                  </Permission>
                </Route>
                <Route relative title={activityTitle} path={activityRoute}>
                  <Permission code={PermissionCode.ACTIVITY}>
                    <Activity />
                  </Permission>
                </Route>
              </Switch>
            </Route>
            <Route relative title={pgcTitle} path={pgcRoute}>
              <Permission code={PermissionCode.PGC}>
                <Switch>
                  <Route relative exact path="/">
                    <Redirect relative to={pgcManageRoute} />
                  </Route>
                  <Route relative title={pgcManageTitle} path={pgcManageRoute}>
                    <PgcManage />
                  </Route>
                  <Route relative title={pgcBannerTitle} path={pgcBannerRoute}>
                    <PgcBanner />
                  </Route>
                </Switch>
              </Permission>
            </Route>
            <Route relative title="发布控制台" path="/deploy">
              <Permission code={PermissionCode.DEPLOY}>
                <Switch>
                  <Route relative exact path="/">
                    <Redirect relative to="refresh" />
                  </Route>
                  <Route relative title="缓存刷新" path="/refresh">
                    <Refresh />
                  </Route>
                  <Route relative title="地址大全" path="/paths">
                    <Paths />
                  </Route>
                  <Route relative title="服务监测" path="/status">
                    <Status />
                  </Route>
                </Switch>
              </Permission>
            </Route>
            {userRoutes}
          </Switch>
        </Layout>
      </Provider>
    </ConfigProvider>
  )
}
