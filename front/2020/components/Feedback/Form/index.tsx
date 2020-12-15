/**
 * @file 用户反馈对话表单
 * @description 含消息列表、输入框等
 */

import React, { useState, FormEvent, useEffect, useCallback, ReactNode, useRef, ChangeEvent, KeyboardEvent } from 'react'
import Tooltip from 'react-icecream/lib/tooltip'
import { useCount, useOnChange } from 'hooks'
import { useMobile } from 'hooks/ua'
import { uuid } from 'utils'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import MessageList, { Message, MessageFrom } from './MessageList'
import { IRobot, InputType, OutputType, withEase, Input, context, Disposer, MessageSelect } from './robot'
import ConsultRobot from './robot/consult'
import qiniu from '../icons/qiniu.png'
import humanServiceQrCode from './human-service-qr-code.png'
import style from './style.less'

export type Props = {
  /** 是否激活，非激活转为激活意味着新的对话开始，反之意味着当前对话结束 */
  active?: boolean
  /** 初始用户消息内容 */
  startWith?: string // TODO: 按现在需求暂时不需要这个 startWith 逻辑，这里先不干掉，下次需求变更时再考察下这里
}

export default function FeedbackForm({ active, startWith }: Props) {
  const [robot, setRobot] = useState(makeConsultRobot())
  const { messages, sendUserMessage, sendInput, clearMessages, pending } = useRobot(robot, startWith)
  const disposersRef = useRef<Disposer[]>([])

  useOnChange(() => {
    if (active) {
      // 新的对话开始时重新初始化对应的机器人逻辑
      setRobot(makeConsultRobot())
    } else {
      // 对话结束时执行对应回调
      disposersRef.current.forEach(disposer => disposer())
      disposersRef.current = []
      clearMessages()
    }
  }, [active])

  const addDisposer = useCallback((disposer: Disposer) => {
    disposersRef.current = [...disposersRef.current, disposer]
    return () => {
      disposersRef.current = disposersRef.current.filter(
        item => item !== disposer
      )
    }
  }, [])

  return (
    <div className={style.wrapper}>
      <Header />
      <context.Provider value={{ sendMessage: sendUserMessage, addDisposer, sendInput }}>
        <Body messages={messages} />
      </context.Provider>
      <Footer pending={pending} onSubmit={sendUserMessage} />
    </div>
  )
}

function makeConsultRobot() {
  return withEase(200)(new ConsultRobot())
}

function Header() {
  return (
    <div className={style.header}>
      <img className={style.avatar} src={qiniu} />
      <h4 className={style.title}>牛小七</h4>
      <p className={style.description}>机器智能客服为您服务</p>
    </div>
  )
}

type BodyProps = {
  messages: Message[]
}

function Body({ messages }: BodyProps) {
  return (
    <div className={style.body}>
      <MessageList messages={messages} />
    </div>
  )
}

type FooterProps = {
  pending: boolean
  onSubmit: (text: string) => void
}

function Footer({ pending, onSubmit }: FooterProps) {
  const isMobile = useMobile()
  const [input, setInput] = useState('')
  const [submitTipVisible, submitTip, showSubmitTip] = useTipWithTimeout()
  const emptyInputTip = !input.trim() && '不能发送空白消息'
  const pendingTip = pending && '你输入太快了'
  const tip = emptyInputTip || pendingTip

  const handleSubmit = useCallback((e?: FormEvent) => {
    if (e != null) e.preventDefault()
    if (tip) {
      showSubmitTip(tip)
      return
    }
    setInput('')
    onSubmit(input.trim())
  }, [input, onSubmit, showSubmitTip, tip])

  // 人工服务信息的弹窗
  const humanServiceView = (
    <div className={style.humanService}>
      <img className={style.qrCode} src={humanServiceQrCode} alt="人工客服企业微信二维码" />
      <div className={style.content}>
        <p className={style.up}>人工客服企业微信二维码，微信扫码添加。</p>
        <p className={style.down}>在线时间：<br />工作日09:00-18:00</p>
      </div>
    </div>
  )

  const humanServiceTrigger = isMobile ? 'click' : 'hover'

  const inputProps = {
    className: style.input,
    placeholder: '请输入你要反馈的问题',
    value: input,
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput(e.target.value)
  }

  const handleTextareaKeypress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }, [handleSubmit])

  const inputView = (
    isMobile
    ? <input {...inputProps} />
    : <textarea onKeyPress={handleTextareaKeypress} {...inputProps} />
  )

  return (
    <form className={style.footer} onSubmit={handleSubmit}>
      <div className={style.linkLine}>
        <Tooltip trigger={humanServiceTrigger} overlay={humanServiceView} overlayClassName={style.humanServiceOverlay} placement="topLeft">
          <span className={style.linkButton}>人工售前咨询</span>
        </Tooltip>
        <Link className={style.linkButton} href="https://support.qiniu.com/tickets/new">提交工单</Link>
        <Link className={style.linkButton} href="https://developer.qiniu.com/faq">常见问题</Link>
      </div>
      {inputView}
      <Tooltip title={submitTip} visible={submitTipVisible} overlayClassName={style.tooltip} placement="topRight">
        <Button
          className={style.sendButton}
          htmlType="submit"
          type="primary"
          size="small"
        >发送</Button>
      </Tooltip>
    </form>
  )
}

/** 提示信息控制逻辑（提示信息展示后经过固定时间自动消失） */
function useTipWithTimeout() {
  const [visible, setVisible] = useState(false)
  const [tip, setTip] = useState('')

  const tipTimer = useRef<number>()

  // 展示提交行为的提示（展示一会儿后会自动关闭）
  const showTip = useCallback((content: string) => {
    setTip(content)
    setVisible(true)
    if (tipTimer.current != null) {
      clearTimeout(tipTimer.current)
    }
    tipTimer.current = setTimeout(() => {
      setVisible(false)
    }, 1000) as unknown as number
  }, [])

  return [visible, tip, showTip] as const
}

/** 使用给定 Robot 与用户交互 */
function useRobot(robot: IRobot, startWith?: string) {
  const [messages, setMessages] = useState<Message[]>([])
  // 是否有 output 消息在 pending（异步的 output 还没结束）
  const [pending, increasePending, decreasePending] = useCount()

  function pushMessage(from: MessageFrom, content: ReactNode) {
    const id = uuid()
    setMessages(current => [
      ...current,
      { id, from, content }
    ])
    return id
  }

  function removeMessage(id: string) {
    setMessages(current => current.filter(
      message => message.id !== id
    ))
  }

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const lastSelectMessageId = useRef<string>()

  const callRobot = useCallback(async (input: Input) => {
    // 每次用户输入，都把之前的 select message 干掉
    if (lastSelectMessageId.current != null) {
      removeMessage(lastSelectMessageId.current)
    }

    increasePending()
    const processed = await robot.process(input)
    decreasePending()

    const items = Array.isArray(processed) ? processed : [processed]

    for (const item of items) {
      increasePending()
      const output = await item // eslint-disable-line no-await-in-loop
      decreasePending()
      if (!output) return

      switch (output.type) {
        case OutputType.Message:
          pushMessage(MessageFrom.Qiniu, output.content)
          break
        case OutputType.Select: {
          const { type, ...others } = output
          const messageId = pushMessage(
            MessageFrom.Qiniu,
            <MessageSelect {...others} />
          )
          lastSelectMessageId.current = messageId
          break
        }
        default:
      }
    }

    await Promise.all(items)
  }, [robot, increasePending, decreasePending])

  const addUserMessage = useCallback((content: string) => {
    pushMessage(MessageFrom.User, content)
    return callRobot({ type: InputType.Message, content })
  }, [callRobot])

  useEffect(() => {
    callRobot({ type: InputType.Initial }).then(() => {
      if (startWith != null) {
        addUserMessage(startWith)
      }
    })
  }, [startWith, callRobot, addUserMessage])

  return {
    messages,
    sendUserMessage: addUserMessage,
    sendInput: callRobot,
    clearMessages,
    pending: pending > 0
  }
}
