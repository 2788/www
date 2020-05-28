/**
 * @file 用户反馈表单
 * @description 含对话框、聊天窗口等
 */

import cls from 'classnames'
import React, { useState, FormEvent, useRef, useEffect, useCallback, ReactNode } from 'react'
import Button from 'components/UI/Button'
import Loading from 'components/UI/Loading'
import MessageList, { Message, MessageFrom } from './MessageList'
import { IRobot, InputType, OutputType, withEase, Input, context } from './robot'
import ConsultRobot from './robot/consult'
import style from './style.less'

export type Props = {
  wide?: boolean // 是否宽版（在页面中间的浮层展示）
}

export default function FeedbackForm({ wide }: Props) {
  const robot = useRef(withEase(300)(new ConsultRobot()))
  const [messages, submitUserMessage] = useRobot(robot.current)
  const wrapperClassName = cls(style.wrapper, wide && style.wide)
  return (
    <div className={wrapperClassName}>
      <Header />
      <context.Provider value={{ sendMessage: submitUserMessage }}>
        <Body messages={messages} />
      </context.Provider>
      <Footer onSubmit={submitUserMessage} />
    </div>
  )
}

function Header() {
  return (
    <div className={style.header}>
      <i className={style.avatar}></i>
      <h4 className={style.title}>七牛君</h4>
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
  onSubmit: (text: string) => void
}

function Footer({ onSubmit }: FooterProps) {
  const [input, setInput] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimed = input.trim()
    if (!trimed) {
      return
    }
    setInput('')
    onSubmit(trimed)
  }

  return (
    <form className={style.footer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.input}
        placeholder="请输入你要反馈的问题"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button
        disabled={!input.trim()}
        className={style.sendButton}
        htmlType="submit"
        type="primary"
        size="small"
      >发送</Button>
    </form>
  )
}

// TODO: 改为 Loading
const loadingMessage = (
  <Loading style={{ width: '30px', transform: 'scale(0.8)' }}>&nbsp;</Loading>
)

/** 使用给定 Robot 与用户交互 */
function useRobot(robot: IRobot) {
  const [messages, setMessages] = useState<Message[]>([])

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

  const callRobot = useCallback((input: Input) => {
    const processed = robot.process(input)
    const items = Array.isArray(processed) ? processed : [processed]

    const loading = pushMessage(MessageFrom.Qiniu, loadingMessage)
    Promise.all(items).then(() => removeMessage(loading))

    items.forEach(async item => {
      const output = await item
      if (!output) return

      switch (output.type) {
        case OutputType.Message:
          pushMessage(MessageFrom.Qiniu, output.content)
          break
        case OutputType.Form: {
          const Form = output.comp
          const handleOutputFormSubmit = (value: unknown) => {
            callRobot({ type: InputType.FormSubmit, value })
          }
          pushMessage(MessageFrom.Qiniu, (
            <Form onSubmit={handleOutputFormSubmit} />
          ))
          break
        }
        default:
      }
    })
  }, [robot])

  async function addUserMessage(content: string) {
    pushMessage(MessageFrom.User, content)
    callRobot({ type: InputType.Message, content })
  }

  useEffect(() => {
    callRobot({ type: InputType.Initial })
  }, [callRobot])

  return [messages, addUserMessage] as const
}

function uuid(): string {
  return Math.random() + ''
}
