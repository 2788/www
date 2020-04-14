/**
 * @file component Preview of Activity
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 应该用每个 component 里的 preview，后面抽空再把 preview 拆开

import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useRouterStore } from 'qn-fe-core/router'

import { toNotFound } from 'components/common/NotFound'
import { IComponentInfo } from 'apis/component'
import { default as Activity } from '.'

export interface IProps {
  //
}

export interface IPreviewInitData {
  code: string
  campaignList: IComponentInfo[] // TODO: 对接口
}

// 是否应该定义在全局。。？
function usePreviewInitData(): IPreviewInitData | undefined {
  const previewInitData = window.previewInitData

  const routerStore = useRouterStore()

  useEffect(() => {
    if (!(
      previewInitData
      && previewInitData.code != null
      && previewInitData.campaignList && previewInitData.campaignList.length
    )) {
      toNotFound(routerStore) // or 跳去聚合页。。？
    }
  }, [routerStore])

  return previewInitData
}

export default observer(function Preview(_props: IProps) {
  const previewInitData = usePreviewInitData()

  if (!previewInitData) {
    return null
  }

  return (
    <Activity code={previewInitData.code} previewData={previewInitData} />
  )
})





