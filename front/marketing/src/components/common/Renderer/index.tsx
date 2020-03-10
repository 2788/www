/**
 * @file component Renderer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'

import ComponentApiService, { ComponentName, IComponentInfo } from 'apis/component'
import RendererStore from 'stores/renderer'

import Demo from 'components/Demo'
import PageBanner from 'components/PageBanner'

import * as styles from './style.m.less'

export interface IBaseProps {
  activityId: string
  info: IComponentInfo<ComponentName>
}

export interface IProps {}

export default observer(function Renderer(_props: IProps) {
  const rendererStore = useInjection(RendererStore)

  const componentApiService = useInjection(ComponentApiService)
  const componentInfos = componentApiService.list || []

  function renderComponent(componentInfo: IComponentInfo, _index: number) {
    const commonProps = {
      key: componentInfo.key,
      activityId: rendererStore.activityId
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
      {componentInfos.map((componentInfo, index) => (
        <div key={componentInfo.key} className={styles.component}>
          {renderComponent(componentInfo, index)}
        </div>
      ))}
    </div>
  )
})
