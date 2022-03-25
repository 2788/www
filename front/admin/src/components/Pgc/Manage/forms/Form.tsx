/**
 * @file 表单：新增 / 编辑
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState, DebouncedFieldState } from 'formstate-x'
import {
  Form, FormItem, useFormstateX, useFormFooterCtx, TextInput, TextArea, Select, SelectOption
} from 'react-icecream-form'
import { Button, TextInput as BaseTextInput } from 'react-icecream'

import { ReplaceValue } from 'utils/ts'
import {
  ContentDetail, Content, ContentType, contentTypeTextMap,
  contentCategorys, contentCategoryTextMap, UserLimitType, userLimitTypes, userLimitTypeTextMap
} from 'constants/pgc/conetnt'
import Editor from 'components/common/MarkdownEditor'
import UploadImage, { createState as createUploadImageState } from 'components/common/Upload/Img'
import UploadVideo from 'components/common/Upload/Video'
import UploadFile from 'components/common/Upload/File'

import Tags from './Tags'

import style from './form.m.less'

type ValidatedValue = ReplaceValue<ContentDetail, {
  userLimit: UserLimitType | null
}>

type Value = ReplaceValue<ValidatedValue, {
  category: ValidatedValue['category'] | null
}>

// FIXME: 类型优化？
function assertValidatedValue(value: Value): ValidatedValue {
  return value as ValidatedValue
}

function validatedValueToContentDetail(type: ContentType, value: ValidatedValue): ContentDetail {
  return {
    ...value,
    category: value.category,
    userLimit: {
      preview: [],
      view: type === ContentType.Video ? [value.userLimit!] : [],
      download: type === ContentType.File ? [value.userLimit!] : []
    }
  }
}

function contentDetailToValue(type: ContentType, contentDetail?: Partial<ContentDetail>): Value {
  return {
    title: contentDetail?.title ?? '',
    category: contentDetail?.category ?? null,
    description: contentDetail?.description ?? '',
    posterUrl: contentDetail?.posterUrl ?? '',
    keywords: contentDetail?.keywords ?? [],
    userLimit: {
      [ContentType.Video]: contentDetail?.userLimit?.view[0],
      [ContentType.File]: contentDetail?.userLimit?.download[0]
    }[type] ?? null,
    content: contentDetail?.content ?? ''
  }
}

function createState(type: ContentType, contentDetail?: Partial<ContentDetail>) {
  const initialValue = contentDetailToValue(type, contentDetail)
  return new FormState({
    title: new DebouncedFieldState(initialValue.title).withValidator(
      title => {
        if (title.trim() === '') {
          return '不能为空'
        }
        if (title.length > 30) {
          return '不能超过 30 个字'
        }
      }
    ),
    category: new DebouncedFieldState(initialValue.category).withValidator(
      v => !v && '不能为空'
    ),
    description: new DebouncedFieldState(initialValue.description).withValidator(
      v => v.length > 200 && '不能超过 200 个字'
    ),
    posterUrl: createUploadImageState(initialValue.posterUrl).withValidator(
      v => !v && '不能为空'
    ),
    keywords: new DebouncedFieldState(initialValue.keywords),
    userLimit: new DebouncedFieldState(initialValue.userLimit),
    content: new FieldState(initialValue.content).withValidator(
      v => !v.trim() && '不能为空'
    )
  })
}

interface FooterProps {
  isReleased: boolean
  onPreview(): void
  onReset?(): void
}

// TODO: 在这附近显示一下状态？（是否已保存 + 是否已发布）
function Footer({ isReleased, onPreview, onReset }: FooterProps) {
  const { submitting } = useFormFooterCtx()
  return (
    <div className={style.footer}>
      <Button type="primary" htmlType="submit" loading={submitting}>
        保存为草稿
      </Button>
      <Button onClick={() => { onPreview() }}>
        预览后发布
      </Button>
      {isReleased && (
        <Button type="secondary" onClick={() => { onReset?.() }}>
          重置为线上
        </Button>
      )}
    </div>
  )
}

export interface Props {
  type: ContentType
  /** 注意：传了代表编辑，空代表新建 */
  content: Content | null
  onSubmitDraft(contentDetail: ContentDetail): Promise<void>
  onPreview(contentDetail: ContentDetail): void
}

export default observer(function DetailForm({ type, onSubmitDraft, content, onPreview }: Props) {
  const isEditMode = content != null // 非新建
  const state = useFormstateX(() => createState(type, content?.draft), [type, content])

  const userLimitView = type !== ContentType.Article && (
    <FormItem
      label={{
        [ContentType.Video]: '播放限制',
        [ContentType.File]: '下载限制'
      }[type]}
    >
      <Select state={state.$.userLimit} placeholder="不限制用户" clearable>
        {userLimitTypes.map(userLimitType => (
          <SelectOption key={userLimitType} value={userLimitType}>
            {userLimitTypeTextMap[userLimitType]}
          </SelectOption>
        ))}
      </Select>
    </FormItem>
  )

  const contentView = {
    [ContentType.Article]: (
      <FormItem label="正文" required>
        <Editor
          state={state.$.content}
          uploadBucketKeyRule="pgc-content"
          previewClassName="" // TODO: 官网样式
        />
      </FormItem>
    ),
    [ContentType.Video]: (
      <FormItem label="上传视频" required>
        <UploadVideo uploadBucketKeyRule="pgc-content" state={state.$.content} />
      </FormItem>
    ),
    [ContentType.File]: (
      <FormItem label="上传文件" required>
        <UploadFile uploadBucketKeyRule="pgc-content" state={state.$.content} />
      </FormItem>
    )
  }[type]

  const footerProps: FooterProps = {
    onPreview() {
      state.validate().then(result => {
        if (!result.hasError) {
          onPreview(validatedValueToContentDetail(type, assertValidatedValue(result.value)))
        }
      })
    },
    ...(
      isEditMode && content?.release
      ? {
        isReleased: true,
        onReset() { state.set(contentDetailToValue(type, content.release)) }
      }
      : {
        isReleased: false
      }
    )
  }

  return (
    <Form
      layout="horizontal"
      labelWidth="4em"
      state={state}
      footer={<Footer {...footerProps} />}
      onSubmit={() => onSubmitDraft(validatedValueToContentDetail(type, assertValidatedValue(state.value)))}
    >
      <FormItem label="标题" required>
        <TextInput state={state.$.title} />
      </FormItem>
      {isEditMode && (
        <FormItem label="种类">
          <BaseTextInput value={contentTypeTextMap[type]} disabled />
        </FormItem>
      )}
      <FormItem label="类别" required={!isEditMode}>
        <Select state={state.$.category} disabled={isEditMode}>
          {contentCategorys.map(contentCategory => (
            <SelectOption key={contentCategory} value={contentCategory}>
              {contentCategoryTextMap[contentCategory]}
            </SelectOption>
          ))}
        </Select>
      </FormItem>
      <FormItem label="摘要">
        <TextArea
          state={state.$.description}
          maxCount={200}
          textareaProps={{ rows: 5 }}
          className={style.textarea}
        />
      </FormItem>
      <FormItem label="封面" state={state.$.posterUrl} required>
        <UploadImage uploadBucketKeyRule="pgc-content" state={state.$.posterUrl} />
      </FormItem>
      <FormItem label="标签">
        <Tags state={state.$.keywords} />
      </FormItem>
      {userLimitView}
      {contentView}
    </Form>
  )
})
