/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'

import PosterImage from 'components/pgc/content/PosterImage'
import { useMobile } from 'hooks/ua'
import PlayIcon from './player.svg'

import style from './style.less'

export interface Props {
  type: string
  videos: VideoProps[]
  children?: React.ReactNode;
}

export interface VideoProps {
  coverUrl: string
  description: string
  title: string
  videoUrl: string
  videoRef: React.RefObject<HTMLVideoElement>
  releaseTime?: number
}

export interface VideoListProps {
  videos: VideoProps[]
  value: number
  chooseItem: (index: number) => void
  videoRef: React.RefObject<HTMLVideoElement>
}
export interface VideoItemProps extends VideoProps {
  chooseVideo: (index: number) => void
  selected: boolean
  index: number
}

function Video(props: VideoProps) {
  const { videoRef } = props
  const [isPlaying, setIsPlaying] = useState(false)

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
  }, [videoRef])

  async function handleClick() {
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
    <div
      className={classNames(style.video)}
      title={props.title}
      onClick={() => {
        handleClick()
      }}
    >
      <video
        src={props.videoUrl}
        ref={videoRef}
        preload="auto"
        poster={props.coverUrl}
        onClick={e => {
          e.preventDefault()
        }}
      ></video>
      {!isPlaying && <PlayIcon className={style.playIcon} />}
    </div>
  )
}

export function VideoItem(props: VideoItemProps) {
  const date = moment(props.releaseTime).format('YYYY-MM-DD')
  const isMobile = useMobile()
  if (isMobile) {
    return (
      <div
        className={classNames(
          style.item,
          props.selected ? style.selected : null
        )}
        tabIndex={props.index}
        onClick={() => props.chooseVideo(props.index)}
      >
        <p className={classNames(style.title)}>{props.title}</p>
      </div>
    )
  }
  return (
    <div
      className={classNames(style.item, props.selected ? style.selected : null)}
      tabIndex={props.index}
      onClick={() => props.chooseVideo(props.index)}
    >
      <PosterImage url={props.coverUrl} ratio={9 / 16} className={style.img} />
      <div className={classNames(style.content)}>
        <p title={props.title} className={classNames(style.title)}>
          {props.title}
        </p>
        <p title={date} className={classNames(style.createDate)}>
          {date}
        </p>
      </div>
    </div>
  )
}

export function VideoList(props: VideoListProps) {
  const { videos, value, chooseItem, videoRef } = props
  return (
    <div className={classNames(style.list)}>
      {videos.map((content, index) => (
        <VideoItem
          key={content.title}
          chooseVideo={chooseItem}
          releaseTime={content.releaseTime}
          coverUrl={content.coverUrl}
          description={content.description}
          title={content.title}
          videoUrl={content.videoUrl}
          selected={index === value}
          index={index}
          videoRef={videoRef}
        />
      ))}
    </div>
  )
}

export default function VideoHighlights(props: Props) {
  const { videos } = props
  const [chosenVideo, select] = useState<{ video: VideoProps; index: number }>({
    video: videos[0],
    index: 0
  })

  const videoRef = useRef<HTMLVideoElement>(null)

  const chooseItem = async (index: number) => {
    const video = videoRef.current!
    video.pause()
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, 100)
    })
    select({ video: videos[index], index })
  }

  return (
    <div className={classNames(style.videoWrapper)}>
      <Video
        releaseTime={chosenVideo.video.releaseTime}
        coverUrl={chosenVideo.video.coverUrl}
        description={chosenVideo.video.description}
        title={chosenVideo.video.title}
        videoUrl={chosenVideo.video.videoUrl}
        videoRef={videoRef}
      />
      <VideoList
        value={chosenVideo.index}
        videos={videos}
        chooseItem={chooseItem}
        videoRef={videoRef}
      />
    </div>
  )
}
