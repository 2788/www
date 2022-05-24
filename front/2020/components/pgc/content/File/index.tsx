/**
 * @file file
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'

import { useMobile } from 'hooks/ua'
import { downloadFile } from 'utils/file'
import { ContentId, ContentDetailWithTime, UserLimitType } from 'constants/pgc/content'
import { VerificationSmsOperation } from 'apis/admin/verification'
import Button from 'components/UI/Button'

import { useSignInRequired } from '../sign-in-required'
import { useVerifySms } from '../verification-sms-required'
import Layout, { BaseProps, Header } from '../Layout'
import Card, { CardLink } from '../Card'
import PosterImageBase from '../PosterImage'
import DownloadIcon from './download.svg'

import style from './style.less'

interface DownloadProps extends BaseProps {
  render?(download: () => void): ReactNode
}

function Download({ contentDetail, render }: DownloadProps) {
  render = render ?? (download => (
    <Button type="primary-light" size="large" onClick={() => { download() }}>
      立即下载
    </Button>
  ))

  const [signInRequired, signInDialogView] = useSignInRequired('下载')
  const [verifySms, verifySmsModalView] = useVerifySms(VerificationSmsOperation.DownloadFile, '下载')

  async function handleDownload() {
    const downloadLimits = contentDetail.userLimit.download
    if (downloadLimits.includes(UserLimitType.SignedIn)) {
      await signInRequired()
    }
    if (downloadLimits.includes(UserLimitType.MobilePhoneVerified)) {
      await verifySms()
    }

    downloadFile(contentDetail.content)
  }

  return (
    <>
      {render(() => { handleDownload() })}
      {signInDialogView}
      {verifySmsModalView}
    </>
  )
}

function PosterImage({ contentDetail }: BaseProps) {
  return (
    <PosterImageBase
      url={contentDetail.posterUrl}
      ratio={4 / 3}
      className={style.img}
    />
  )
}

export default function File({ contentDetail, preview, createdAt }: BaseProps) {
  const isMobile = useMobile()
  const hasSidebar = false // TODO: 后续右侧加上营销活动广告侧边栏后再把这里的实现补充完整

  if (isMobile) {
    return (
      <Layout preview={preview} className={style.detail}>
        <div className={style.card}>
          <PosterImage contentDetail={contentDetail} />
          <div className={style.summary}>
            <Header contentDetail={contentDetail} createdAt={createdAt} preview={preview} />
          </div>
        </div>
        <p className={style.desc}>{contentDetail.description}</p>
        <Download contentDetail={contentDetail} />
      </Layout>
    )
  }

  if (hasSidebar) {
    return (
      <Layout preview={preview} className={style.detail}>
        <Header
          contentDetail={contentDetail}
          createdAt={createdAt}
          preview={preview}
          className={style.header}
        />
        <div className={style.card}>
          <PosterImage contentDetail={contentDetail} />
          <div className={style.summary}>
            {contentDetail.description && (
              <p className={style.desc}>{contentDetail.description}</p>
            )}
            <Download contentDetail={contentDetail} />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout preview={preview} className={style.detail}>
      <div className={style.card}>
        <PosterImage contentDetail={contentDetail} />
        <div className={style.summary}>
          <Header
            contentDetail={contentDetail}
            createdAt={createdAt}
            preview={preview}
            className={style.header}
          />
          <p className={style.desc}>{contentDetail.description}</p>
          <Download contentDetail={contentDetail} />
        </div>
      </div>
    </Layout>
  )
}

// TODO: 预览文件的一部分内容
export function EmbedFile({ contentDetail }: BaseProps) {
  return (
    <ins className={style.embed}>
      <Download
        contentDetail={contentDetail}
        render={download => (
          <div className={style.wrapper} onClick={() => { download() }}>
            <PosterImage contentDetail={contentDetail} />
            <DownloadIcon className={style.downloadIcon} />
          </div>
        )}
      />
    </ins>
  )
}

export interface FileItemProps {
  id: ContentId
  contentDetail: ContentDetailWithTime
}

export function FileItem({ id, contentDetail }: FileItemProps) {
  return (
    <CardLink id={id} className={style.item}>
      <PosterImage contentDetail={contentDetail} />
      <Card contentDetail={contentDetail} className={style.card} />
    </CardLink>
  )
}
