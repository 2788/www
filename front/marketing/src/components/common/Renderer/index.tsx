/**
 * @file component Renderer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'
import ComponentApiService, { ComponentName } from 'apis/component'

import PageBanner from 'components/PageBanner'

export default observer(function Renderer() {
  const componentApiService = useInjection(ComponentApiService)
  const componentInfos = componentApiService.list || []

  return (
    <div>
      {componentInfos.map(componentInfo => {
        switch (componentInfo.value) {
          case ComponentName.PageBanner:
            // TODO: id 是啥
            return (
              <PageBanner key={componentInfo.key} info={componentInfo} />
            )
          default:
            console.error('控件不存在')
            return null
        }
      })}
    </div>
  )
})
