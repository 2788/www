import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Slider, Button, TextArea } from 'react-icecream-2/lib'
import Section from 'components/Product/Section'
import { useUserInfo } from 'components/UserInfo'
import { TtsOptipns, getTts, TtsResponse } from 'apis/tts'
import { useApi } from 'hooks/api'
import classnames from 'classnames'
import { useErrorDialog } from 'components/UI/Dialog'
import showModal from './modal'
import Voice1 from './images/客服女声.svg'
import Voice2 from './images/儿童女声.svg'
import Voice3 from './images/温柔女声.svg'
import Voice4 from './images/标准女声.svg'
import Voice5 from './images/知性女声.svg'
import Voice6 from './images/温柔男声.svg'
import Voice7 from './images/成熟男声.svg'
import Voice8 from './images/标准男声.svg'
import Play from './images/播放.svg'
import Pause from './images/暂停.svg'
import style from './style.less'

const voiceItems = [
  { speaker: 'kefu1', name: '客服女声', icon: <Voice1 /> },
  { speaker: 'girl1', name: '儿童女声', icon: <Voice2 /> },
  { speaker: 'femal6', name: '温柔女声', icon: <Voice3 /> },
  { speaker: 'femal4', name: '标准女声', icon: <Voice4 /> },
  { speaker: 'femal5', name: '知性女声', icon: <Voice5 /> },
  { speaker: 'male2', name: '温柔男声', icon: <Voice6 /> },
  { speaker: 'male1', name: '成熟男声', icon: <Voice7 /> },
  { speaker: 'male4', name: '标准男生', icon: <Voice8 /> }
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
  const [text, setText] = useState('您好，这里是客服中心，请问有什么可以帮您？')
  const [speaker, setSpeaker] = useState(voiceItems[0].speaker)
  const [volume, setVolume] = useState(50)
  const [speed, setSpeed] = useState(0)
  const [params, setParams] = useState<TtsOptipns>({ text, speaker, volume, speed })
  const [status, setStatus] = useState(Status.Initial)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showDialog, Dialog] = useErrorDialog()

  const { call: callWithParams, $: result, loading } = useApi(handleTts)

  // 每当参数发生改变，将状态变为初始状态，同时更新调用 api 所需的参数
  useEffect(() => {
    setStatus(Status.Initial)
    setParams({ text, speaker, volume, speed })
  }, [text, speaker, volume, speed])
  // 此时的状态为合成中，并且 loading 从 true 变为 false的情况，说明请求成功，将状态置为待播放
  useEffect(() => {
    if (!loading && status === Status.Pending) {
      setStatus(Status.Paused)
    }
  }, [loading, status])

  // 发送立即合成请求，只有状态为 Initial 的情况下才会执行
  const submit = useCallback(() => {
    if (text.length > maxCount) {
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
  }, [text.length, userInfo, showDialog, callWithParams, params])

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

  return (
    <Section name="demo" title="Demo 体验">
      <div className={style.container}>
        <div className={style.left}>
          <p className={style.title}>文本输入</p>
          <div className={style.textWrapper}>
            <TextArea
              textareaProps={{ className: style.textArea }}
              defaultValue={text}
              maxCount={maxCount}
              onChange={value => setText(value)}
            />
          </div>
        </div>
        <div className={style.right}>
          <p className={style.title}>场景选择</p>
          <div className={style.buttonWrapper}>
            {
              voiceItems.map(item => (
                <div
                  className={classnames(style.button, speaker === item.speaker && style.active)}
                  key={item.speaker}
                  onClick={() => { setSpeaker(item.speaker) }}
                >
                  {item.icon}
                  <span className={style.buttonText}>{item.name}</span>
                </div>
              ))
            }
          </div>
          <div className={style.sliderWrapper}>
            <span className={style.sliderTag}>音量</span>
            <Slider
              min={0}
              max={100}
              className={style.slider}
              defaultValue={volume}
              onChange={value => { setVolume(value) }}
            />
            <span className={style.sliderValue}>{volume}</span>
          </div>
          <div className={style.sliderWrapper}>
            <span className={style.sliderTag}>语速</span>
            <Slider
              min={-100}
              max={100}
              className={style.slider}
              defaultValue={speed}
              onChange={value => { setSpeed(value) }}
            />
            <span className={style.sliderValue}>{speed}</span>
          </div>
          {
            // 只有状态为播放中或者暂停时，audio 才被挂载
            (status === Status.Paused || status === Status.Playing)
            && <audio ref={audioRef} src={`data:audio/x-wav;base64,${result?.audio}`} onEnded={() => { setStatus(Status.Initial) }}></audio>
          }
          {/* 字数超过限定范围才会显示 */}
          <Dialog title="提示">请输入 200 字以内的文本</Dialog>
          {status === Status.Initial && <Button type="primary" disabled={!text} onClick={submit} className={style.submitBtn}>{statusTextMap[Status.Initial]}</Button>}
          {status === Status.Pending && <Button type="primary" loading className={style.submitBtn}>{statusTextMap[Status.Pending]}</Button>}
          {status === Status.Paused && <Button type="primary" icon={statusIconMap[Status.Paused]} onClick={play} className={style.submitBtn}>{statusTextMap[Status.Paused]}</Button>}
          {status === Status.Playing && <Button type="primary" icon={statusIconMap[Status.Playing]} onClick={pause} className={style.submitBtn}>{statusTextMap[Status.Playing]}</Button>}
        </div>
      </div>
    </Section>
  )
}
