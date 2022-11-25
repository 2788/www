/**
 * @file 解决方案预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { usePreviewMessage } from 'hooks/admin-message'
import { SolutionInfo } from 'apis/admin/solution'
import { getIconMap, getIconIdsFromJson } from 'apis/admin/icon-lib'
import { IconMap } from 'components/LibIcon'

import SolutionPage, { hasSolutionPage } from '../[solution]'

import styles from './style.less'

const msgKey = 'QINIU_SOLUTION_PAGE_PREVIEW'

export default function ProductPagePreview() {
  const previewData = usePreviewMessage<SolutionInfo>(msgKey)
  const [iconMap, setIconMap] = useState<IconMap>({})

  useEffect(() => {
    if (previewData != null) {
      const icons = getIconIdsFromJson(previewData)
      getIconMap(icons).then(setIconMap)
    }
  }, [previewData])

  if (previewData == null) {
    return (<p className={styles.info}>加载中</p>)
  }

  if (!hasSolutionPage(previewData)) {
    return (<p className={styles.info}>请配置 banner 和最少一个模块</p>)
  }

  return (
    <SolutionPage
      solutionInfo={previewData}
      iconMap={iconMap}
    />
  )
}
