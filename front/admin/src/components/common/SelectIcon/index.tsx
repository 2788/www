/**
 * @file 选择图标
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { DebouncedFieldState, TransformedState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { Select, SelectOption, InputWrapper } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { getIconId, withIconScheme } from 'transforms/icon'
import IconInfoApis, { IconInfo } from 'apis/icon'

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

  useEffect(() => {
    toasterStore.promise(
      iconInfoApis.listAll().then(list => { setIcons(list) })
    )
  }, [iconInfoApis, toasterStore])

  return (
    // TODO: 如何把 loading 状态向上传递 / 暴露出去
    <Loading loading={icons == null}>
      <InputWrapper state={state}>
        <Select
          state={state.$}
          searchable
          clearable
        >
          {icons != null && icons.map(({ id, name }) => (
            // TODO: 优化，用更科学的方式支持按 icon id 搜索
            <SelectOption value={id} key={id}>{name} ({id})</SelectOption>
          ))}
        </Select>
      </InputWrapper>
    </Loading>
  )
})
