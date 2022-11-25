/**
 * @file 预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo } from 'react'

import { wwwHost } from 'constants/env'
import { wwwSolutionPathPrefix } from 'constants/solution'
import { SolutionInfo } from 'apis/solution'
import { hasSolutionPage } from 'transforms/solution'
import PreviewPage from 'components/common/PreviewPage'

import styles from './style.m.less'

const wwwSolutionPreviewPageUrl = `${wwwSolutionPathPrefix}preview`
const wwwSolutionPreviewMsgKey = 'QINIU_SOLUTION_PAGE_PREVIEW'

export interface Props {
  solutionInfo: SolutionInfo
}

export default function Preview({ solutionInfo }: Props) {
  // 增删 section 后，预览页的 Navigator 不会更新，需重新加载预览页。
  const refreshId = useMemo(
    () => solutionInfo.sections.map(({ name }) => name).join(', '),
    [solutionInfo]
  )

  if (!hasSolutionPage(solutionInfo)) {
    return (
      <div className={styles.warning}>请配置 banner 和最少一个模块。</div>
    )
  }

  return (
    <PreviewPage
      url={wwwHost + wwwSolutionPreviewPageUrl}
      name={wwwSolutionPreviewMsgKey}
      data={solutionInfo}
      id={refreshId}
    />
  )
}
