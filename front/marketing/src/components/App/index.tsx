/*
 * @file component App
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import { Route, Switch } from 'qn-fe-core/router'
import LocaleProvider from 'react-icecream/lib/locale-provider'
import zhCN from 'react-icecream/lib/locale-provider/zh_CN'
import Toaster from 'base/components/Toaster'

import { basename } from 'constants/route'
import Provider from 'components/common/Provider'
import NotFound from 'components/common/NotFound'

// Layout
import Layout from 'components/Layout'
// Home
import Home from 'components/Home'
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
                  <Route relative path="/" exact><Home /></Route>
                  <Route relative path="/all" exact title="全部活动"><AllActivity /></Route>
                  <Route relative path="/not-found" exact><NotFound /></Route>
                  <Route relative path="/:id" title="活动" component={
                    ({ match }) => <Activity id={match!.params.id} />
                  } />
                </Switch>
              </Layout>
            </Route>
          </div>
        </LocaleProvider>
      </Provider>
    )
  }
}
