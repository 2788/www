/**
 * 图标库
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { IconId } from 'constants/icon'

import useAllIcons from './list'
import useIconInfo from './info'

import styles from './style.m.less'

export default observer(function Icon() {
  const toasterStore = useInjection(ToasterStore)

  const { allIcons, refresh, allIconsView } = useAllIcons(onIconEdit)
  const [setIconInfo, iconInfoView] = useIconInfo(allIcons)

  function onIconEdit(iconId: IconId) {
    toasterStore.promise(setIconInfo(iconId).then(() => { refresh() }))
  }

  return (
    <div>
      <div className={styles.panel}>
        <Button onClick={() => { toasterStore.promise(setIconInfo().then(() => { refresh() })) }}>新增</Button>
      </div>
      {allIconsView}
      {iconInfoView}
    </div>
  )
})
