/**
 * @file 解决方案预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { usePreviewMessage } from 'hooks/admin-message'
import { SolutionInfo } from 'apis/admin/solution'
import { getIconMap } from 'apis/admin/icon-lib'
import { IconMap } from 'components/LibIcon'
import SolutionPage, { hasSolutionPage } from '../[solution]'

const msgKey = 'QINIU_SOLUTION_PAGE_PREVIEW'

export default function ProductPagePreview() {
  const previewData = usePreviewMessage<SolutionInfo>(msgKey)
  const [iconMap, setIconMap] = useState<IconMap | undefined>(undefined)

  useEffect(() => {
    getIconMap().then(setIconMap)
  }, [])

  if (!previewData) {
    return null
  }

  if (!hasSolutionPage(previewData)) {
    return '请配置 banner 和模块'
  }

  return (
    <SolutionPage
      isPreview
      solutionInfo={previewData}
      iconMap={iconMap}
    />
  )
}
