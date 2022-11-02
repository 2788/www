/**
 * @file 图标列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useCallback } from 'react'
import { Loading } from 'react-icecream-2'
import { EditIcon } from 'react-icecream-2/icons'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { IconId } from 'constants/icon'
import IconInfoApis, { IconInfo } from 'apis/icon'

import styles from './style.m.less'

function useAllIconsState() {
  const toasterStore = useInjection(ToasterStore)
  const iconInfoApis = useInjection(IconInfoApis)

  const [isLoading, setIsLoading] = useState(true)
  const [icons, setIcons] = useState<IconInfo[]>([])

  const fetchList = useCallback(() => {
    setIsLoading(true)
    toasterStore.promise(
      iconInfoApis.listAll()
        .then(newIcons => { setIcons(newIcons) })
        .finally(() => { setIsLoading(false) })
    )
  }, [iconInfoApis, toasterStore])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return {
    allIcons: icons,
    isLoading,
    refresh: fetchList
  }
}

export default function useAllIcons(editIcon: (iconId: IconId) => void) {
  const { allIcons, isLoading, refresh } = useAllIconsState()

  const allIconsView = (
    <Loading loading={isLoading}>
      <ul className={styles.list}>
        {allIcons.map(iconInfo => (
          <li key={iconInfo.id}>
            <div className={styles.img}>
              <img src={iconInfo.url} alt={iconInfo.name} />
              <div className={styles.modify} onClick={() => { editIcon(iconInfo.id) }}>
                <EditIcon />
              </div>
            </div>
            <h6>{iconInfo.id}</h6>
            <h6>{iconInfo.name}</h6>
          </li>
        ))}
      </ul>
    </Loading>
  )

  return {
    allIcons,
    refresh,
    allIconsView
  }
}
