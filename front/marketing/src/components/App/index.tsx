/*
 * @file component App
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import { Route, Switch, Redirect } from 'qn-fe-core/router'
import LocaleProvider from 'react-icecream/lib/locale-provider'
import zhCN from 'react-icecream/lib/locale-provider/zh_CN'
import Toaster from 'base/components/Toaster'

import { basename } from 'constants/route'
import Provider from 'components/common/Provider'
import NotFound, { notFoundPagePath, ToNotFound } from 'components/common/NotFound'
import ActivityEnd, { activityEndPagePath } from 'components/common/ActivityEnd'

// Layout
import Layout from './Layout'
// All Activity Page
import AllActivity from 'components/AllActivity'
// Activity Page
import Activity from 'components/Activity'

@hot
@observer
export default class App extends React.Component<any, any> {
  render() {
    return (
      <Provider>
        <LocaleProvider locale={zhCN}>
          <div className="comp-app">
            <Toaster />
            <Route path={basename}>
              <Layout>
                <Switch>
                  <Route relative path="/" exact title="首页"><Redirect relative to="/all" /></Route>
                  <Route relative path="/all" exact title="全部活动"><AllActivity /></Route>
                  <Route relative path={notFoundPagePath} title="404" exact><NotFound /></Route>
                  <Route relative path={activityEndPagePath} title="活动已结束" exact><ActivityEnd /></Route>
                  <Route relative path="/:code" component={
                    ({ match }) => (<Activity code={match!.params.code} />)
                  } />
                  <Route relative path="*"><ToNotFound /></Route>
                </Switch>
              </Layout>
            </Route>
          </div>
        </LocaleProvider>
      </Provider>
    )
  }
}
