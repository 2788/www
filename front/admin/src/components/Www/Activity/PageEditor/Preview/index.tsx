/**
 * @file 预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo } from 'react'

import { IActivity } from 'apis/activity/market'

import { wwwHost } from 'constants/env'

// TODO： 先用这个
import { wwwActivityPathPrefix } from 'constants/activity'

import PreviewPage from 'components/common/PreviewPage'

import { hasActivityPage } from 'transforms/activity'
import styles from './style.m.less'

const wwwProductPreviewPageUrl = `${wwwActivityPathPrefix}preview`
const wwwProductPreviewMsgKey = 'QINIU_ACTIVITY_PAGE_PREVIEW'

export interface Props {
  activity: IActivity
}

export default function Preview({ activity }: Props) {
  // 增删 section 后，预览页的 Navigator 不会更新，需重新加载预览页。

  const refreshId = useMemo(
    () => activity.page?.sections.map(({ name }) => name).join(', '),
    [activity]
  )

  if (!hasActivityPage(activity)) {
    return (
      <div className={styles.warning}>请配置 banner 和最少一个模块。</div>
    )
  }

  return (
    <PreviewPage
      url={wwwHost + wwwProductPreviewPageUrl}
      name={wwwProductPreviewMsgKey}
      data={activity}
      id={refreshId}
    />
  )
}
