/**
 * @file 新增、编辑、查看、预览、保存、发布等
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Button, Modal, ModalFooter, Loading } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { wwwCenteredContentWidth } from 'constants/www'
import { ContentId, ContentType, ContentDetail, Content } from 'constants/pgc/content'
import { getWwwContentDetailPreviewUrl, getEditPageUrl } from 'transforms/pgc/content'
import { useWwwPreviewMessage } from 'utils/www'
import PgcContentApis from 'apis/pgc/content'

import Form from './Form'

import style from './style.m.less'

const msgKey = 'QINIU_PGC_CONTENT_DETAIL_PREVIEW'

interface WwwPreview {
  type: ContentType
  contentDetail: ContentDetail
  createdAt?: number
  editPagePrefix: string
}

interface PreviewProps {
  type: ContentType
  contentDetail: ContentDetail
  onRelease(): Promise<void>
  onClose(): void
}

function Preview({ type, contentDetail, onRelease, onClose }: PreviewProps) {
  const msgData: WwwPreview = useMemo(() => ({
    type,
    contentDetail,
    editPagePrefix: `${window.location.origin}${getEditPageUrl('')}`
  }), [type, contentDetail])

  const iframeRef = useWwwPreviewMessage(msgKey, msgData)

  function openFullScreen() {
    const iframe = iframeRef.current
    if (iframe) {
      iframe.requestFullscreen({ navigationUI: 'show' })
    }
  }

  const previewContentView = (
    <div className={style.previewPageContainer}>
      <div className={style.previewPage}>
        <iframe src={getWwwContentDetailPreviewUrl()} ref={iframeRef}></iframe>
      </div>
    </div>
  )

  async function handleRelease(): Promise<void> {
    // TODO: 检查是否内嵌未发布内容、图文及 404
    // TODO: 二次确认？

    return onRelease()
  }

  return (
    <Modal
      title="预览"
      width={wwwCenteredContentWidth + 100 + 24 * 2} // @icecream-gap-lg = 24
      onOk={handleRelease}
      onCancel={() => { onClose() }}
      footer={
        <>
          <Button onClick={() => { openFullScreen() }}>全屏预览</Button>
          <ModalFooter okText="保存并发布" cancelText="关闭" />
        </>
      }
      autoDestroy
    >
      {previewContentView}
    </Modal>
  )
}

export interface AddFormProps {
  type: ContentType
  onSubmitted(content: Content, isReleased: boolean): void
}

export const AddForm = observer(function _AddForm({ type, onSubmitted }: AddFormProps) {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentApis = useInjection(PgcContentApis)

  const [previewContentDetail, setPreviewContentDetail] = useState<ContentDetail | null>(null)

  function submit(contentDetail: ContentDetail, needRelease: boolean) {
    return toasterStore.promise(
      pgcContentApis.add(type, contentDetail, needRelease)
        .then(content => {
          if (!needRelease) {
            setPreviewContentDetail(null)
          }
          onSubmitted(content, needRelease)
        })
    )
  }

  return (
    <div>
      <Form
        type={type}
        content={null}
        onSubmitDraft={contentDetail => submit(contentDetail, false)}
        onPreview={contentDetail => { setPreviewContentDetail(contentDetail) }}
      />
      {previewContentDetail != null && (
        <Preview
          type={type}
          contentDetail={previewContentDetail}
          onRelease={() => submit(previewContentDetail, true)}
          onClose={() => { setPreviewContentDetail(null) }}
        />
      )}
    </div>
  )
})

export interface EditFormProps {
  id: ContentId
  onSubmitted(content: Content, isReleased: boolean): void
}

export const EditForm = observer(function _EditForm({ id, onSubmitted }: EditFormProps) {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentApis = useInjection(PgcContentApis)

  const [isLoading, setIsLoading] = useState(true) // 初始化
  const [initialContent, setInitialContent] = useState<Content | null>(null)
  const [previewContentDetail, setPreviewContentDetail] = useState<ContentDetail | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setInitialContent(null)
    toasterStore.promise(
      pgcContentApis.get(id)
        .then(content => { setInitialContent(content) })
        .finally(() => { setIsLoading(false) })
    )
  }, [pgcContentApis, toasterStore, id])

  function submit(contentDetail: ContentDetail, needRelease: boolean) {
    return toasterStore.promise(
      pgcContentApis.update(initialContent!, contentDetail, needRelease)
        .then(content => {
          if (!needRelease) {
            setPreviewContentDetail(null)
          }
          onSubmitted(content, needRelease)
        })
    )
  }

  const mainView = initialContent && (
    <div>
      <Form
        type={initialContent.type}
        content={initialContent}
        onSubmitDraft={contentDetail => submit(contentDetail, false)}
        onPreview={contentDetail => { setPreviewContentDetail(contentDetail) }}
      />
      {previewContentDetail != null && (
        <Preview
          type={initialContent.type}
          contentDetail={previewContentDetail}
          onRelease={() => submit(previewContentDetail, true)}
          onClose={() => { setPreviewContentDetail(null) }}
        />
      )}
    </div>
  )

  return (
    <Loading loading={isLoading}>
      {mainView}
    </Loading>
  )
})
