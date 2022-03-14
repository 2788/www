/**
 * @file 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'qn-fe-core/router'

import { pgcManageAddRoute, pgcManageAddTitle, pgcManageEditRoute, pgcManageEditTitle } from 'constants/route'

import Detail from './Detail'

const PgcManage = observer(function _PgcManage() {
  return (
    <div>
      Hello Pgc.
    </div>
  )
})

export default observer(function PgcManageEntry() {
  return (
    <Switch>
      <Route path={pgcManageAddRoute} title={pgcManageAddTitle} relative>
        <Detail mode="add" />
      </Route>
      <Route
        path={pgcManageEditRoute}
        title={pgcManageEditTitle}
        relative
        component={({ match: { params: { id } } }) => (
          <Detail mode="edit" id={id} />
        )}
      />
      <Route path="/" relative exact>
        <PgcManage />
      </Route>
    </Switch>
  )
})
