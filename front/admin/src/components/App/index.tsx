import * as React from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { ConfigProvider } from 'react-icecream'

import { Route, Redirect, Switch } from 'qn-fe-core/router'

import NotFound from 'admin-base/common/components/NotFound'
import Toaster from 'admin-base/common/components/Toaster'
import { getBaseRouters } from 'admin-base/user/components/Router'
import UserProvider from 'admin-base/user/components/Provider'
import UserList from 'admin-base/user/components/Manage'
import PermissionList from 'admin-base/user/components/PermissionManage'
import RoleList from 'admin-base/user/components/RoleManage'

import Permission from 'components/common/Permission'
import PermissionCode from 'constants/permission'

import Homepage from 'components/Www/Homepage'
import Product from 'components/Www/Product'
import Consult from 'components/Www/Consult'
import Activity from 'components/Www/Activity'
import GlobalBanners from 'components/Www/GlobalBanners'
import {
  accountTitle, accountRoute, userTitle, userRoute, roleTitle, roleRoute, permissionTitle, permissionRoute,
  wwwTitle, wwwRoute, homepageRoute, homepageTitle, productTitle, productRoute, consultTitle, consultRoute,
  activityTitle, activityRoute, globalBannersTitle, globalBannersRoute
} from 'constants/route'

import Provider from './Provider'
import Layout from '../Layout'

import * as style from './style.m.less'

@hot
@observer
export default class App extends React.Component<any, any> {

  render() {
    const cnt = (
      <Provider>
        <Toaster />
        <Switch>
          {getBaseRouters()}
          <Route path="/">
            <Layout>
              <Switch>
                <Route relative exact path="/"><Redirect relative to={`${wwwRoute}${homepageRoute}`} /></Route>
                <Route relative title={accountTitle} path={accountRoute}>
                  <UserProvider>
                    <Permission code={PermissionCode.ACCOUNT}>
                      <Switch>
                        <Route relative exact title={userTitle} path={userRoute}>
                          <UserList className={style.account} />
                        </Route>
                        <Route relative exact title={roleTitle} path={roleRoute}>
                          <RoleList className={style.account} />
                        </Route>
                        <Route relative exact title={permissionTitle} path={permissionRoute}>
                          <PermissionList className={style.account} />
                        </Route>
                        <Route relative path="*"><NotFound /></Route>
                      </Switch>
                    </Permission>
                  </UserProvider>
                </Route>
                <Route relative title={wwwTitle} path={wwwRoute}>
                  <Switch>
                    <Route relative title={homepageTitle} path={homepageRoute}>
                      <Permission code={PermissionCode.HOMEPAGE}>
                        <Homepage />
                      </Permission>
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
                    <Route relative path="*"><NotFound /></Route>
                  </Switch>
                </Route>
                <Route relative path="*"><NotFound /></Route>
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Provider>
    )

    return (
      <div className={style.wrapper}>
        <ConfigProvider>
          {cnt}
        </ConfigProvider>
      </div>
    )
  }
}
