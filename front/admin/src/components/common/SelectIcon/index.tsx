/**
 * @file 选择图标
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { DebouncedFieldState, TransformedState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { Select, SelectOption, InputWrapper } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { getIconId, withIconScheme } from 'transforms/icon'
import IconInfoApis, { IconInfo } from 'apis/icon'
import IconPreview, { IconPreviewNano } from 'components/common/IconPreview'

import styles from './style.m.less'

export function createState(idOrUrl?: string | null, withoutScheme = false) {
  return new TransformedState(
    new DebouncedFieldState(idOrUrl == null ? null : getIconId(idOrUrl)),
    iconId => (iconId != null && !withoutScheme ? withIconScheme(iconId) : iconId),
    url => (url != null && !withoutScheme ? getIconId(url) : url)
  )
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function SelectIcon({ state }: Props) {
  const toasterStore = useInjection(ToasterStore)
  const iconInfoApis = useInjection(IconInfoApis)

  const [icons, setIcons] = useState<IconInfo[] | undefined>(undefined)

  const iconInfo = useMemo(
    () => (icons ?? []).find(({ id }) => id === state.$.value),
    [icons, state.$.value]
  )

  useEffect(() => {
    toasterStore.promise(
      iconInfoApis.listAll().then(list => { setIcons(list) })
    )
  }, [iconInfoApis, toasterStore])

  return (
    // TODO: 如何把 loading 状态向上传递 / 暴露出去
    <Loading loading={icons == null}>
      <div className={styles.main}>
        <InputWrapper state={state}>
          <Select
            state={state.$}
            searchable
            clearable
            className={styles.select}
          >
            {icons != null && icons.map(icon => (
              // TODO: 优化，用更科学的方式支持按 icon id 搜索
              <SelectOption value={icon.id} key={icon.id}>
                <div className={styles.item}>
                  <IconPreviewNano icon={icon} className={styles.iconNano} /> {icon.name} ({icon.id})
                </div>
              </SelectOption>
            ))}
          </Select>
        </InputWrapper>
        {iconInfo && (
          <IconPreview icon={iconInfo} className={styles.iconSelected} />
        )}
      </div>
    </Loading>
  )
})
