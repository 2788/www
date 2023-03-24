/**
 * @file 选择图标
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { observable, computed, action, when } from 'mobx'
import { DebouncedFieldState, TransformedState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { Select, SelectOptionItems, InputWrapper } from 'react-icecream-form'
import Store, { observeInjectable } from 'qn-fe-core/store'
import { useLocalStore, injectProps } from 'admin-base/common/utils/store'
import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'

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

const LoadingIconsAction = 'LoadingIconsAction'

function matchKeyword(keyword: string, text: string): boolean {
  keyword = keyword.trim().toLowerCase()
  text = text.trim().toLowerCase()
  return text.includes(keyword)
}

@observeInjectable()
class LocalStore extends Store {

  constructor(
    @injectProps() private props: Props,
    private toasterStore: ToasterStore,
    private iconInfoApis: IconInfoApis
  ) {
    super()
    this.loadings.start(LoadingIconsAction)
  }

  loadings = Loadings.collectFrom(this)

  @observable.ref icons: IconInfo[] | undefined

  @computed get isLoadingIcons() {
    return this.loadings.isLoading(LoadingIconsAction)
  }

  @computed get currentIconInfo() {
    const { value } = this.props.state.$
    return (this.icons ?? []).find(({ id }) => id === value)
  }

  @action
  updateIcons(icons: IconInfo[]) {
    this.icons = icons
  }

  async matchIcons(keyword: string): Promise<IconInfo[]> {
    // start searching while necessary (retry)
    if (!this.isLoadingIcons && this.icons == null) {
      this.toasterStore.promise(this.fetchIcons())
    }

    // waiting result of searching
    await when(() => !this.isLoadingIcons)
    const { icons } = this

    // search failed
    if (icons == null) {
      return []
    }

    // return matched icon-infos
    const matchedIcons = keyword === ''
      ? icons
      : icons.filter(({ name, id }) => (
        matchKeyword(keyword, name) || matchKeyword(keyword, id)
      ))
    return matchedIcons
  }

  @Loadings.handle(LoadingIconsAction)
  async fetchIcons() {
    const icons = await this.iconInfoApis.listAll()
    this.updateIcons(icons)
  }

  async init() {
    await this.fetchIcons()
  }
}

export default observer(function SelectIcon(props: Props) {
  const localStore = useLocalStore(LocalStore, props)

  // 升级 icecream 后可去掉 useCallback
  const matchOptions = useCallback(
    async (keyword: string): Promise<SelectOptionItems<string>> => {
      const icons = await localStore.matchIcons(keyword)
      return icons.map(icon => ({
        value: icon.id,
        content: (
          <div className={styles.item}>
            <IconPreviewNano icon={icon} />
            <span className={styles.name}>{icon.name}</span>
          </div>
        ),
        rootHtmlProps: { title: icon.id }
      }))
    },
    [localStore]
  )

  return (
    <div className={styles.main}>
      <InputWrapper state={props.state}>
        <Select
          state={props.state.$}
          searchable
          clearable
          className={styles.select}
          fetch={matchOptions}
        />
      </InputWrapper>
      {/* TODO: 如果是组件整体的 loading，如何把 loading 状态向上传递 / 暴露出去 */}
      {
        localStore.isLoadingIcons
        ? (<Loading className={styles.iconSelected} />)
        : localStore.currentIconInfo != null && (
          <IconPreview icon={localStore.currentIconInfo} className={styles.iconSelected} />
        )
      }
    </div>
  )
})
