/**
 * @file component Demo
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Spin from 'react-icecream/lib/spin'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ComponentName, IComponentInfo } from 'apis/component'
import { IBaseProps } from 'components/common/Renderer'

import DemoStore from './store'
import * as styles from './style.m.less'

export interface IConfig {
  a: number
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.Demo>
}

export default observer(function PageBanner(props: IProps) {
  // 使用局部 store
  const localStore = useLocalStore(DemoStore, props, {
    offset: -3
  })

  // 使用全局 store 如：
  // import { useInjection } from 'qn-fe-core/di'
  // import DemoApis from 'apis/demo'
  // const demoApis = useInjection(DemoApis) // component 里注入全局 store 用

  return (
    <div className={styles.mainWrapper}>
      <Spin spinning={localStore.loadings.isLoading(localStore.Loading.FetchSth)}>
        {props.activityId}: {localStore.abc}
      </Spin>
    </div>
  )
})
