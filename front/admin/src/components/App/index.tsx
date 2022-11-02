import React, { useState } from 'react'
import { ConfigProvider } from 'react-icecream-1'

import { Route, Redirect, Switch } from 'qn-fe-core/router'

import BaseLayout, { Page } from 'admin-base/common/components/Layout'
import Navbar from 'admin-base/common/components/Navbar'
import BaseSidebar, { Group, LinkItem } from 'admin-base/common/components/Sidebar'
import { renderUserRoutes, User, UserSidebarGroup } from 'admin-base/user/manage'

import Permission from 'components/common/Permission'
import { PermissionCode } from 'constants/permission'

import ProductPage from 'components/Www/Product/Page'
import ProductInfo from 'components/Www/Product/Info'
import ProductNews from 'components/Www/Product/News'
import ProductPrices from 'components/Www/Product/Prices'
import Consult from 'components/Www/Consult'
import Activity from 'components/Www/Activity'
import GlobalBanners from 'components/Www/GlobalBanners'
import Solution from 'components/Www/Solution'
import Icon from 'components/Icon'
import PgcManage from 'components/Pgc/Manage'
import PgcBanner from 'components/Pgc/Banner'
import Refresh from 'components/Deploy/Refresh'
import Paths from 'components/Deploy/Paths'
import Status from 'components/Deploy/Status'
import {
  accountRoute, iconRoute, iconTitle, solutionRoute, solutionTitle, productTitle, productRoute,
  productInfoRoute, productInfoTitle, productPriceRoute, productPriceTitle, productNewsRoute, productNewsTitle,
  consultTitle, consultRoute, activityTitle, activityRoute, globalBannersTitle, globalBannersRoute,
  pgcRoute, pgcTitle, pgcManageRoute, pgcManageTitle, pgcBannerRoute, pgcBannerTitle, deployRoute, deployTitle,
  deployRefreshRoute, deployRefreshTitle, deployPathsRoute, deployPathsTitle, deployStatusRoute, deployStatusTitle
} from 'constants/route'

import Provider from './Provider'

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <BaseSidebar collapsed={collapsed}>
      <LinkItem relative to={globalBannersRoute}>{globalBannersTitle}</LinkItem>
      <Group title={productTitle} path={productRoute} relative>
        <LinkItem relative to="/page">页面管理</LinkItem>
        {/* <LinkItem relative to={productConfigRoute}>{productConfigTitle}</LinkItem> TODO: 撤掉上面换这个 */}
        <LinkItem relative to={productNewsRoute}>{productNewsTitle}</LinkItem>
        <LinkItem relative to={productPriceRoute}>{productPriceTitle}</LinkItem>
      </Group>
      <LinkItem relative to={solutionRoute}>{solutionTitle}</LinkItem>
      <LinkItem relative to={consultRoute}>{consultTitle}</LinkItem>
      <LinkItem relative to={activityRoute}>{activityTitle}</LinkItem>
      <LinkItem relative to={iconRoute}>{iconTitle}</LinkItem>
      <Group title={pgcTitle} path={pgcRoute}>
        <LinkItem relative to={pgcManageRoute}>{pgcManageTitle}</LinkItem>
        <LinkItem relative to={pgcBannerRoute}>{pgcBannerTitle}</LinkItem>
      </Group>
      <Group title={deployTitle} path={deployRoute}>
        <LinkItem relative to={deployRefreshRoute}>{deployRefreshTitle}</LinkItem>
        <LinkItem relative to={deployPathsRoute}>{deployPathsTitle}</LinkItem>
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
              <Redirect relative to={productRoute} />
            </Route>
            <Route relative title={globalBannersTitle} path={globalBannersRoute}>
              <Permission code={PermissionCode.GLOBAL_BANNER}>
                <GlobalBanners />
              </Permission>
            </Route>
            <Route relative title={productTitle} path={productRoute}>
              <Permission code={PermissionCode.PRODUCT}>
                <Switch>
                  <Route relative exact path="/">
                    <Redirect relative to="/page" />
                  </Route>
                  <Route relative title="页面管理" path="/page">
                    <ProductPage />
                  </Route>
                  <Route relative title={productInfoTitle} path={productInfoRoute}>
                    <ProductInfo />
                  </Route>
                  <Route relative title={productNewsTitle} path={productNewsRoute}>
                    <ProductNews />
                  </Route>
                  <Route relative title={productPriceTitle} path={productPriceRoute}>
                    <ProductPrices />
                  </Route>
                </Switch>
              </Permission>
            </Route>
            <Route relative title={solutionTitle} path={solutionRoute}>
              <Permission code={PermissionCode.SOLUTION}>
                <Solution />
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
            <Route relative title={iconTitle} path={iconRoute}>
              <Permission code={PermissionCode.ICON}>
                <Icon />
              </Permission>
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
            <Route relative title={deployTitle} path={deployRoute}>
              <Permission code={PermissionCode.DEPLOY}>
                <Switch>
                  <Route relative exact path="/">
                    <Redirect relative to={deployRefreshRoute} />
                  </Route>
                  <Route relative title={deployRefreshTitle} path={deployRefreshRoute}>
                    <Refresh />
                  </Route>
                  <Route relative title={deployPathsTitle} path={deployPathsRoute}>
                    <Paths />
                  </Route>
                  <Route relative title={deployStatusTitle} path={deployStatusRoute}>
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
