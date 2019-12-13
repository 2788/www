/*
 * @file component App
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import * as React from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import Provider from 'portal-base/common/components/Provider'
import { Route, Switch } from 'portal-base/common/components/Router'
import NotFound from 'portal-base/common/components//NotFound'

import { basename } from '../../constants/route'

// Layout
import Layout from '../Layout'
// Home
import Home from '../Home'
// All
import All from '../All'

@hot
@observer
export default class App extends React.Component<any, any> {
  render() {
    return (
      <Provider>
        <div className="comp-app">
          <Route path={basename}>
            <Layout>
              <Switch>
                <Route relative path="/" exact><Home /></Route>
                <Route relative path="/all" exact title="全部活动"><All /></Route>
                <Route relative path="*"><NotFound /></Route>
              </Switch>
            </Layout>
          </Route>
        </div>
      </Provider>
    )
  }
}
