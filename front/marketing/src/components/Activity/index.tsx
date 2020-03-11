/**
 * @file component Activity
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ComponentName, IComponentInfo } from 'apis/component'

import ActivityStore from './store'

import Demo from './components/Demo'
import PageBanner from './components/PageBanner'

import * as styles from './style.m.less'

export interface IBaseProps {
  code: string // activity code
  info: IComponentInfo<ComponentName>
}

export interface IProps {
  code: string
}

export default observer(function Activity(props: IProps) {
  const activityStore = useLocalStore(ActivityStore, props)

  function renderComponent(componentInfo: IComponentInfo, _index: number) {
    const commonProps = {
      key: componentInfo.key,
      code: props.code
    }

    switch (componentInfo.value) {
      case ComponentName.Demo:
        console.log(componentInfo.data.a)
        return (
          <Demo {...commonProps} info={componentInfo} />
        )
      case ComponentName.PageBanner:
        return (
          <PageBanner {...commonProps} info={componentInfo} />
        )
      default:
        console.error('控件不存在')
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      {(activityStore.list || []).map((componentInfo, index) => (
        <div key={componentInfo.key} className={styles.component}>
          {renderComponent(componentInfo, index)}
        </div>
      ))}
    </div>
  )
})
