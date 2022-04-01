/**
 * @file 新增、编辑、查看、预览、保存、发布等
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Modal, ModalFooter, Loading } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { ContentId, ContentType, ContentDetail, Content } from 'constants/pgc/conetnt'
import PgcContentApis from 'apis/pgc/content'

import ArticlePreview from '../previews/Article'
import VideoPreview from '../previews/Video'
import FilePreview from '../previews/File'
import Form from './Form'

import style from './style.m.less'

interface PreviewProps {
  type: ContentType
  contentDetail: ContentDetail | null
  onRelease(): Promise<void>
  onClose(): void
}

function Preview({ type, contentDetail, onRelease, onClose }: PreviewProps) {
  const toasterStore = useInjection(ToasterStore)

  const previewContentView = contentDetail && (
    <div className={style.previewPageContainer}>
      <div className={style.previewPage}>
        {{
          [ContentType.Article]: (<ArticlePreview contentDetail={contentDetail} />),
          [ContentType.Video]: (<VideoPreview contentDetail={contentDetail} />),
          [ContentType.File]: (<FilePreview contentDetail={contentDetail} />)
        }[type]}
      </div>
    </div>
  )

  async function handleRelease(): Promise<void> {
    if (!contentDetail) {
      toasterStore.info('请预览确认后再发布')
      throw new Error('cannot release')
    }

    // TODO: 检查是否内嵌未发布内容、图文及 404
    // TODO: 二次确认？

    return onRelease()
  }

  return (
    <Modal
      title="预览"
      width={768 + 24 * 2} // @icecream-gap-lg
      visible={!!contentDetail}
      onOk={handleRelease}
      onCancel={() => { onClose() }}
      footer={<ModalFooter okText="保存并发布" cancelText="关闭" />}
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
      <Preview
        type={type}
        contentDetail={previewContentDetail}
        onRelease={() => submit(previewContentDetail!, true)}
        onClose={() => { setPreviewContentDetail(null) }}
      />
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
      <Preview
        type={initialContent.type}
        contentDetail={previewContentDetail}
        onRelease={() => submit(previewContentDetail!, true)}
        onClose={() => { setPreviewContentDetail(null) }}
      />
    </div>
  )

  return (
    <Loading loading={isLoading}>
      {mainView}
    </Loading>
  )
})