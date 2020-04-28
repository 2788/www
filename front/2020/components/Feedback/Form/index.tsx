/**
 * @file 用户反馈表单
 * @description 含对话框、聊天窗口等
 */

import React, { useState, FormEvent } from 'react'
import MessageList, { Message, MessageFrom } from './MessageList'
import style from './style.less'

// TODO: 内部逻辑实现
function getReplyFor(_: string): Promise<string> {
  return new Promise(resolve => setTimeout(
    () => resolve('好的'),
    1000
  ))
}

function useAutoChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: MessageFrom.Qiniu, content: '请详细描述您的需求' }
  ])

  function addMessage(from: MessageFrom, content: string) {
    setMessages(current => [
      ...current,
      { from, content }
    ])
  }

  function addUserMessage(content: string) {
    addMessage(MessageFrom.User, content)
    getReplyFor(content).then(
      reply => addMessage(MessageFrom.Qiniu, reply)
    )
  }

  return [messages, addUserMessage] as const
}

export default function FeedbackForm() {
  const [messages, submitUserMessage] = useAutoChat()
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
    if (!input) {
      return
    }
    setInput('')
    onSubmit(input)
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
