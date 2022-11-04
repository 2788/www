/**
 * 解决方案
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-icecream-2'
import { Route, Switch } from 'qn-fe-core/router'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { solutionPageRoute, solutionPageTitle } from 'constants/route'
import { SolutionId } from 'constants/solution'

import useSolutionList from './list'
import useMetaInfo from './meta'
import Page from './Page'

import styles from './style.m.less'

const List = observer(function _List() {
  const toasterStore = useInjection(ToasterStore)

  const { metaView, setSolutionInfo } = useMetaInfo()
  const { listView, refresh } = useSolutionList(onMetaInfoEdit)

  function onMetaInfoEdit(solutionId: SolutionId) {
    toasterStore.promise(setSolutionInfo(solutionId).then(() => { refresh() }))
  }

  return (
    <div>
      <div className={styles.panel}>
        <Button onClick={() => { toasterStore.promise(setSolutionInfo().then(() => { refresh() })) }}>新增</Button>
      </div>
      {listView}
      {metaView}
    </div>
  )
})

export default observer(function Solution() {
  return (
    <Switch>
      <Route path="/" relative exact>
        <List />
      </Route>
      <Route
        path={`${solutionPageRoute}/:solution`}
        title={solutionPageTitle}
        relative
        component={({ match: { params: { solution } } }) => (
          <Page solutionId={solution} />
        )}
      />
    </Switch>
  )
})
