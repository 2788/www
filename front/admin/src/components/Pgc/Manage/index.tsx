/**
 * @file 内容详情
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch, RouterStore } from 'qn-fe-core/router'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { pgcManageAddRoute, pgcManageAddTitle, pgcManageEditRoute, pgcManageEditTitle } from 'constants/route'
import { ContentType, Content } from 'constants/pgc/conetnt'
import { getListPageUrl, getEditPageUrl } from 'transforms/pgc/content'

import PgcManage from './Manage'
import { AddForm, EditForm } from './forms'

export default observer(function PgcManageEntry() {
  const toasterStore = useInjection(ToasterStore)
  const routerStore = useInjection(RouterStore)

  function handleAddFormSubmitted(content: Content, _isReleased: boolean) {
    routerStore.push(getEditPageUrl(content.id)) // TODO: 优化用户体验…
  }

  function handleEditFormSubmitted(_content: Content, isReleased: boolean) {
    if (isReleased) {
      routerStore.push(getListPageUrl())
    } else {
      toasterStore.success('保存成功')
    }
  }

  return (
    <Switch>
      <Route
        path={pgcManageAddRoute}
        title={pgcManageAddTitle}
        relative
        component={({ query: { type } }) => {
          if (typeof type !== 'string') {
            throw new Error('url type 参数不匹配')
          }
          return (
            <AddForm type={type as ContentType} onSubmitted={handleAddFormSubmitted} />
          )
        }}
      />
      <Route
        path={pgcManageEditRoute}
        title={pgcManageEditTitle}
        relative
        component={({ query: { id } }) => {
          if (typeof id !== 'string') {
            throw new Error('url id 参数不匹配')
          }
          return (
            <EditForm id={id} onSubmitted={handleEditFormSubmitted} />
          )
        }}
      />
      <Route path="/" relative exact>
        <PgcManage />
      </Route>
    </Switch>
  )
})
