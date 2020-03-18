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

// Layout
import Layout from './Layout'
import Home from '../Home'

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
                  <Route relative path="/" exact title="商城首页">
                    <Home />
                  </Route>
                  <Route relative path={notFoundPagePath} exact><NotFound /></Route>
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
