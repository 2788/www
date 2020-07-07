import React, { useEffect, useRef, ReactNode } from 'react'
import style from './style.less'

export enum MessageFrom {
  Qiniu,
  User
}

export type Message = {
  id: string
  content: ReactNode
  from: MessageFrom
}

export type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {

  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current && listRef.current.lastElementChild) {
      listRef.current.lastElementChild.scrollIntoView()
    }
  }, [messages.length])

  return (
    <ul ref={listRef}>
      {messages.map(
        (message, i) => <MessageItem key={i} message={message} />
      )}
    </ul>
  )
}

function MessageItem({ message }: { message: Message }) {
  const className = (
    message.from === MessageFrom.Qiniu
    ? style.qiniuMessageLine
    : style.userMessageLine
  )
  return (
    <div className={className}>
      <div className={style.messageBubble}>
        {message.content}
      </div>
    </div>
  )
}