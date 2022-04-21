/**
 * @file file
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'

import { useMobile } from 'hooks/ua'
import { downloadFile } from 'utils/file'
import { UserLimitType } from 'constants/pgc/content'
import { VerificationSmsOperation } from 'apis/admin/verification'

import Button from '../Button'
import { useSignInRequired } from '../sign-in-required'
import { useVerifySms } from '../verification-sms-required'
import Layout, { BaseProps, Header } from '../Layout'
import DownloadIcon from './download.svg'

import style from './style.less'

interface DownloadProps extends BaseProps {
  render?(download: () => void): ReactNode
}

function Download({ contentDetail, render }: DownloadProps) {
  render = render ?? (download => (
    <Button onClick={() => { download() }}>
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
    <img
      src={contentDetail.posterUrl}
      alt="文件封面"
      className={style.posterImg}
    />
  )
}

export default function File({ contentDetail, preview, createdAt }: BaseProps) {
  const isMobile = useMobile()
  const hasSidebar = false // TODO: 后续右侧加上营销活动广告侧边栏后再把这里的实现补充完整

  if (isMobile) {
    return (
      <Layout preview={preview} className={style.main}>
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
      <Layout preview={preview} className={style.main}>
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
    <Layout preview={preview} className={style.main}>
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
