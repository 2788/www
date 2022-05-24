/**
 * @file video
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { useMobile } from 'hooks/ua'
import { ContentId, ContentDetailWithTime, UserLimitType } from 'constants/pgc/content'
import { VerificationSmsOperation } from 'apis/admin/verification'

import { useSignInRequired } from '../sign-in-required'
import { useVerifySms } from '../verification-sms-required'
import Layout, { BaseProps, Header } from '../Layout'
import Card, { CardLink, CardContent } from '../Card'
import PosterImage from '../PosterImage'
import PlayIcon from './play.svg'

import style from './style.less'

function Video({ contentDetail }: BaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [signInRequired, signInDialogView] = useSignInRequired('播放')
  const [verifySms, verifySmsModalView] = useVerifySms(VerificationSmsOperation.PlayVideo, '播放')

  useEffect(() => {
    const video = videoRef.current!

    // eslint-disable-next-line no-multi-assign
    video.onplay = video.onplaying = () => {
      setIsPlaying(true)
    }

    // eslint-disable-next-line no-multi-assign
    video.onpause = video.onended = () => {
      setIsPlaying(false)
    }
  }, [])

  async function handleClick() {
    const viewLimits = contentDetail.userLimit.view
    if (viewLimits.includes(UserLimitType.SignedIn)) {
      await signInRequired()
    }
    if (viewLimits.includes(UserLimitType.MobilePhoneVerified)) {
      await verifySms()
    }

    const video = videoRef.current!

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <div className={style.video} title={contentDetail.title} onClick={() => { handleClick() }}>
        <video
          src={contentDetail.content}
          ref={videoRef}
          // controls // TODO: 拦截用户对 controls 的直接操作后重新放出来
          // controlsList="nodownload" // TODO: 根据配置决定
          preload="auto" // TODO: 性能优化？
          poster={contentDetail.posterUrl}
          onClick={e => { e.preventDefault() }}
        ></video>
        {!isPlaying && (
          <PlayIcon className={style.playIcon} />
        )}
      </div>
      {signInDialogView}
      {verifySmsModalView}
    </>
  )
}

export default function VideoPage({ contentDetail, preview, createdAt }: BaseProps) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <Layout preview={preview} className={style.detail}>
        <Video contentDetail={contentDetail} />
        <Header
          contentDetail={contentDetail}
          createdAt={createdAt}
          preview={preview}
          className={style.header}
        />
        <p className={style.desc}>{contentDetail.description}</p>
      </Layout>
    )
  }

  return (
    <Layout preview={preview} className={style.detail}>
      <Header
        contentDetail={contentDetail}
        createdAt={createdAt}
        preview={preview}
        className={style.header}
      />
      {contentDetail.description && (
        <p className={style.desc}>{contentDetail.description}</p>
      )}
      <Video contentDetail={contentDetail} />
    </Layout>
  )
}

// TODO: 预览视频的一部分内容
export function EmbedVideo({ contentDetail }: BaseProps) {
  return (
    <ins className={style.embed}>
      <Video contentDetail={contentDetail} />
    </ins>
  )
}

export interface VideoItemProps {
  id: ContentId
  contentDetail: ContentDetailWithTime
  mobileTheme: 'horizontal' | 'vertical'
  className?: string
}

const mobileThemeStyleMap: Record<VideoItemProps['mobileTheme'], string> = {
  horizontal: style.mobileHorizontal,
  vertical: style.mobileVertical
}

export function VideoItem({ id, contentDetail, mobileTheme, className }: VideoItemProps) {
  const isMobile = useMobile()
  return (
    <CardLink id={id} className={classNames(style.item, mobileThemeStyleMap[mobileTheme], className)}>
      <PosterImage url={contentDetail.posterUrl} ratio={9 / 16} className={style.img} />
      <Card contentDetail={contentDetail} className={style.card}>
        <CardContent description={isMobile ? undefined : contentDetail.description} />
      </Card>
    </CardLink>
  )
}
