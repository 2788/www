import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Slider, Button, TextArea, Select, SelectOption as Option } from 'react-icecream-2/lib'
import Section from 'components/Product/Section'
import { useUserInfo } from 'components/UserInfo'
import { TtsOptipns, getTts, TtsResponse } from 'apis/tts'
import { useApi } from 'hooks/api'
import classnames from 'classnames'
import { useErrorDialog } from 'components/UI/Dialog'
import showModal from './modal'
import Play from './images/播放.svg'
import Pause from './images/暂停.svg'
import style from './style.less'

const voiceItems = [
  { spkid: 7, name: '成熟女声' },
  { spkid: 8, name: '西安方言' },
  { spkid: 9, name: '东北方言' },
  { spkid: 10, name: '成熟男声' },
  { spkid: 11, name: '活泼男声' },
  { spkid: 12, name: '配音男声' },
  { spkid: 13, name: '播音男声' },
  { spkid: 14, name: '少女女声' }
]

const audioTypeItems = [
  { audioType: 3, name: '16K mp3' },
  { audioType: 4, name: '8K mp3' },
  { audioType: 5, name: '24K mp3' },
  { audioType: 6, name: '48K mp3' },
  { audioType: 7, name: '16K pcm' },
  { audioType: 8, name: '8K pcm' },
  { audioType: 9, name: '24K pcm' },
  { audioType: 10, name: '8K wav' },
  { audioType: 11, name: '16K wav' }
]

// 文本框最多可以输入的字数
const maxCount = 200

// Status 有四种种状态，分别是：初始状态，合成中，待播放状态（暂停），播放中 四种状态
// 这个业务状态改变的逻辑：
//    改变任何参数，或者播放完毕 都会将状态变为初始状态
//    合成中状态只有在上一个状态为初始状态点击按钮，并且还未收到请求（result 还未改变）
//    播放状态和暂停状态是通过 audio.paused 属性来判断的
enum Status {
  Initial = 'initial',
  Pending = 'pending',
  Paused = 'paused',
  Playing = 'playing'
}
// 不同状态下 button 对应不同的文字
const statusTextMap = {
  [Status.Initial]: '立即合成',
  [Status.Pending]: '合成中',
  [Status.Paused]: '播放',
  [Status.Playing]: '暂停'
}
// 不同状态下 button 对应不同的 icon
const statusIconMap = {
  [Status.Initial]: null,
  [Status.Pending]: null,
  [Status.Paused]: <Play />,
  [Status.Playing]: <Pause />
}
// 处理请求的函数
function handleTts(options: TtsOptipns): Promise<TtsResponse | null> {
  if (!options) {
    return Promise.resolve(null)
  }
  return getTts(options)
}

export default function Demo() {
  const userInfo = useUserInfo()
  const [content, setContent] = useState('您好，这里是客服中心，请问有什么可以帮您？')
  const [spkid, setSpkid] = useState(voiceItems[0].spkid)
  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [audioType, setAudioType] = useState(audioTypeItems[0].audioType)
  const [params, setParams] = useState<TtsOptipns>({ content, spkid, volume, speed, audioType })
  const [status, setStatus] = useState(Status.Initial)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showDialog, Dialog] = useErrorDialog()

  const { call: callWithParams, $: result, loading } = useApi(handleTts)

  // 每当参数发生改变，将状态变为初始状态，同时更新调用 api 所需的参数
  useEffect(() => {
    setStatus(Status.Initial)
    setParams({ content, spkid, volume, speed, audioType })
  }, [content, spkid, volume, speed, audioType])
  // 此时的状态为合成中，并且 loading 从 true 变为 false的情况，说明请求成功，将状态置为待播放
  useEffect(() => {
    if (!loading && status === Status.Pending) {
      setStatus(Status.Paused)
    }
  }, [loading, status])

  // 发送立即合成请求，只有状态为 Initial 的情况下才会执行
  const submit = useCallback(() => {
    if (content.length > maxCount) {
      showDialog()
      return
    }
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => {
        callWithParams(params)
        setStatus(Status.Pending)
      })
    } else { // 未登录则直接调用接口
      callWithParams(params)
      setStatus(Status.Pending)
    }
  }, [content.length, userInfo, showDialog, callWithParams, params])

  const play = () => {
    if (audioRef.current) {
      const audio = audioRef.current
      audio.play()
      setStatus(Status.Playing)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      const audio = audioRef.current
      audio.pause()
      setStatus(Status.Paused)
    }
  }

  function handleAudioTypeChange(value: number | null) {
    if (!value) return
    setAudioType(value)
  }

  return (
    <Section name="demo" title="Demo 体验">
      <div className={style.container}>
        <div className={style.left}>
          <p className={style.title}>文本输入</p>
          <div className={style.textWrapper}>
            <TextArea
              textareaProps={{ className: style.textArea }}
              defaultValue={content}
              maxCount={maxCount}
              onChange={value => setContent(value)}
            />
          </div>
        </div>
        <div className={style.right}>
          <p className={style.title}>场景选择</p>
          <div className={style.buttonWrapper}>
            {
              voiceItems.map(item => (
                <div
                  className={classnames(style.button, spkid === item.spkid && style.active)}
                  key={item.spkid}
                  onClick={() => { setSpkid(item.spkid) }}
                >
                  {item.name}
                </div>
              ))
            }
          </div>
          <div className={style.sliderWrapper}>
            <span className={style.sliderTag}>音量</span>
            <Slider
              min={0.75}
              max={1.25}
              step={0.05}
              className={style.slider}
              defaultValue={volume}
              onChange={value => { setVolume(value) }}
            />
            <span className={style.sliderValue}>{volume}</span>
          </div>
          <div className={style.sliderWrapper}>
            <span className={style.sliderTag}>语速</span>
            <Slider
              min={0.75}
              max={1.25}
              step={0.05}
              className={style.slider}
              defaultValue={speed}
              onChange={value => { setSpeed(value) }}
            />
            <span className={style.sliderValue}>{speed}</span>
          </div>
          <div className={style.selectWrapper}>
            <span className={style.selectTag}>音频类型</span>
            <Select
              size="small"
              defaultValue={audioType}
              onChange={handleAudioTypeChange}
              className={style.select}
            >
              {audioTypeItems.map(item => (
                <Option value={item.audioType} key={item.audioType}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          {
            // 只有状态为播放中或者暂停时，audio 才被挂载
            (status === Status.Paused || status === Status.Playing)
            && <audio ref={audioRef} src={result?.result.audioUrl} onEnded={() => { setStatus(Status.Initial) }}>
            </audio>
          }
          {/* 字数超过限定范围才会显示 */}
          <Dialog title="提示">请输入 200 字以内的文本</Dialog>
          {status === Status.Initial && <Button type="primary" disabled={!content} onClick={submit} className={style.submitBtn}>{statusTextMap[Status.Initial]}</Button>}
          {status === Status.Pending && <Button type="primary" loading className={style.submitBtn}>{statusTextMap[Status.Pending]}</Button>}
          {status === Status.Paused && <Button type="primary" icon={statusIconMap[Status.Paused]} onClick={play} className={style.submitBtn}>{statusTextMap[Status.Paused]}</Button>}
          {status === Status.Playing && <Button type="primary" icon={statusIconMap[Status.Playing]} onClick={pause} className={style.submitBtn}>{statusTextMap[Status.Playing]}</Button>}
        </div>
      </div>
    </Section>
  )
}
