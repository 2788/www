/**
 * @file 申诉历史
 */

import React, { ReactNode, useEffect } from 'react'
import dayjs from 'dayjs'
import Button from 'react-icecream-2/lib/Button'

import { AppealId, AppealType, appealTypeTextMap, appealStatusTextMap } from 'constants/appeal'
import { AppealInfo, listHistoryAppeals, revertAppeal } from 'apis/meihua'
import { useApiWithDialogToaster } from 'hooks/api'
import Loading from 'components/UI/Loading'
import ResultEmpty from 'components/UI/ResultEmpty'
import { useInfoDialog, useConfirmDialog } from 'components/UI/Dialog'

import Card from './Card'
import Collapse, { CollapsePanel } from './Collapse'

import style from './style.less'

export function formatDateTime(isoDateString: string) {
  return dayjs(isoDateString).format('YYYY-MM-DD HH:mm')
}

function renderInfoItem(title: string, content: ReactNode) {
  return (
    <div className={style.appealInfoItem}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{content}</div>
    </div>
  )
}

function AppealDetailInfoEntry({ appealInfo }: { appealInfo: AppealInfo }) {
  const [showDialog, Dialog] = useInfoDialog()
  const { type } = appealInfo

  return (
    <>
      <Button type="link" onClick={() => { showDialog() }} className={style.opBtn}>查看详情</Button>
      <Dialog title="查看详情">
        <div className={style.history}>
          {renderInfoItem('申诉编号', appealInfo.id)}
          {renderInfoItem('标题', appealInfo.title)}
          {renderInfoItem('申诉状态', appealStatusTextMap[appealInfo.status])}
          {renderInfoItem('申诉类型', appealTypeTextMap[appealInfo.type])}
          {renderInfoItem('提交时间', formatDateTime(appealInfo.createdAt))}
          {renderInfoItem('手机号', appealInfo.mobile)}
          {renderInfoItem('邮箱', appealInfo.email)}
          {type === AppealType.Domain && renderInfoItem('申诉域名', appealInfo.domain)}
          {type === AppealType.Url && renderInfoItem('申诉链接', (
            <div className={style.urls}>
              {(appealInfo.urls || []).map((url, index) => (
                <span key={index} className={style.url}>{url}</span>
              ))}
            </div>
          ))}
          {renderInfoItem('申诉说明', (
            <div className={style.urls}>
              {(appealInfo.attaches || []).map((attachment, index) => (
                <span key={index} className={style.url}>
                  <a
                    title="申诉说明附件"
                    href={attachment}
                    download // FIXME: 不一定能触发下载，有各种条件限制，待优化
                    target="_blank"
                    rel="noopener nofollow" // noreferrer
                  >
                    附件 {index + 1}
                  </a>
                </span>
              ))}
            </div>
          ))}
          {renderInfoItem('补充说明', appealInfo.reason)}
        </div>
      </Dialog>
    </>
  )
}

function RevertAppealEntry({ appealInfo, onReverted }: { appealInfo: AppealInfo, onReverted: (id: AppealId) => void }) {
  const [confirm, ConfirmDialog] = useConfirmDialog()
  const {
    loading: isSubmitting,
    call: submit,
    Dialog: ResultDialog
  } = useApiWithDialogToaster(revertAppeal, '申诉已撤销', '申诉撤销失败')

  async function revert() {
    await confirm()
    const { id } = appealInfo
    await submit(id)
    onReverted(id)
  }

  if (!appealInfo.canRevoke) {
    return null
  }

  return (
    <>
      <Button type="link" className={style.opBtn} onClick={revert} loading={isSubmitting}>撤销申诉</Button>
      <ConfirmDialog>确定撤销本申诉吗？</ConfirmDialog>
      <ResultDialog />
    </>
  )
}

function ListItem({ appealInfo, onRefresh }: { appealInfo: AppealInfo, onRefresh: () => void }) {
  const headerView = renderInfoItem(
    '申诉编号',
    `${appealInfo.id}-${appealStatusTextMap[appealInfo.status]} ${appealInfo.title}`
  )
  return (
    <CollapsePanel header={headerView}>
      {renderInfoItem('申诉类型', appealTypeTextMap[appealInfo.type])}
      {renderInfoItem('提交时间', formatDateTime(appealInfo.createdAt))}
      <div className={style.op}>
        <AppealDetailInfoEntry appealInfo={appealInfo} />
        <RevertAppealEntry appealInfo={appealInfo} onReverted={onRefresh} />
      </div>
    </CollapsePanel>
  )
}

function HistoryList() {
  const {
    loading,
    call: fetchList,
    $: list,
    error,
    Dialog
  } = useApiWithDialogToaster(listHistoryAppeals)

  useEffect(() => {
    fetchList()
  }, [fetchList])

  if (loading) {
    return (
      <div className={style.coverCard}>
        <Loading className={style.loading} />
      </div>
    )
  }

  if (error || list == null || list.length === 0) {
    return (
      <div className={style.coverCard}>
        <ResultEmpty />
        <Dialog />
      </div>
    )
  }

  return (
    <Collapse>
      {list.map(appealInfo => (
        <ListItem key={appealInfo.id} appealInfo={appealInfo} onRefresh={() => { fetchList() }} />
      ))}
    </Collapse>
  )
}

export default function HistoryCard() {
  return (
    <Card className={style.history} title="查询历史申诉">
      <HistoryList />
    </Card>
  )
}
