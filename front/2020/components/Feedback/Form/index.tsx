/**
 * @file 用户反馈表单
 * @description 含对话框、聊天窗口等
 */

import React, { useState, FormEvent, useRef, useEffect, useCallback } from 'react'
import MessageList, { Message, MessageFrom } from './MessageList'
import { IRobot, InputType, OutputType, withEase, Input } from './robot'
import FormRobot, { FormItem } from './robot/form'
import style from './style.less'

export default function FeedbackForm() {
  const robot = useRef(createRobot())
  const [messages, submitUserMessage] = useRobot(robot.current)
  return (
    <div className={style.wrapper}>
      <Header />
      <Body messages={messages} />
      <Footer onSubmit={submitUserMessage} />
    </div>
  )
}

function Header() {
  return (
    <div className={style.header}>
      <i className={style.avatar}></i>
      <h4 className={style.title}>牛小七</h4>
      <p className={style.description}>
        智能客服
        <span className={style.extra}>
          售后问题，请
          <a className={style.extraLink} href="TODO" target="_blank">提交工单</a>
        </span>
      </p>
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
        placeholder="在此输入"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className={style.sendButton}>
        <i className={style.sendIcon}></i>
      </button>
    </form>
  )
}

/** 使用给定 Robot 与用户交互 */
function useRobot(robot: IRobot) {
  const [messages, setMessages] = useState<Message[]>([])

  function pushMessage(from: MessageFrom, content: string) {
    setMessages(current => [
      ...current,
      { from, content }
    ])
  }

  function popMessage() {
    setMessages(current => current.slice(0, -1))
  }

  const callRobot = useCallback(async (input: Input) => {
    pushMessage(MessageFrom.Qiniu, '...')
    const output = await robot.process(input)
    popMessage()
    if (output) {
      if (output.type === OutputType.Message) {
        pushMessage(MessageFrom.Qiniu, output.content)
      }
      // TODO: other type
    }
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

function createRobot() {
  const formItems: FormItem[] = [
    { name: '您的咨询内容', message: '请描述您的需求，我们会尽快联系您' },
    { name: '您的称呼' },
    { name: '您的手机号', validator: validatePhone },
    { name: '您的邮箱', validator: validateEmail }
  ]
  async function handleSubmit() {
    await timeout(1000)
    throw new Error('xxx')
  }
  return withEase(300)(new FormRobot(formItems, handleSubmit))
}

function validatePhone(value: string) {
  // copy from portal-base
  return /^(13\d|14[57]|15[012356789]|166|17[235678]|18\d|19[89])\d{8}$/.test(value) ? null : '电话格式不正确'
}

function validateEmail(value: string) {
  // copy from portal-base
  return /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/.test(value) ? null : '邮箱格式不正确'
}

function timeout(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
