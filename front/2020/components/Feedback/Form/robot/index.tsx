/**
 * @file 聊天机器人定义
 * @description 与用户进行交互
 */

import { ReactNode } from 'react'

export * from './utils'

/** 文本消息内容 */
export type MessageContent = ReactNode

/** 机器人的输入类型 */
export enum InputType {
  /** 逻辑初始化，用户还没有开始交互 */
  Initial,
  /** 用户通过消息框输入文本消息 */
  Message,
  /** 用户表单提交完成 */
  FormSubmitted
}

/** 逻辑初始化对应的输入 */
export type InitialInput = {
  type: InputType.Initial
}

/** 用户通过消息框输入文本消息对应的输入 */
export type MessageInput = {
  type: InputType.Message
  content: MessageContent
}

/** 用户表单提交完成对应的输入 */
export type FormSubmitInput = {
  type: InputType.FormSubmitted
}

/** 机器人的输入 */
export type Input = InitialInput | MessageInput | FormSubmitInput

/** 机器人的输出类型 */
export enum OutputType {
  /** 文本消息 */
  Message,
  /** 让用户选择一个选项 */
  Select,
}

/** 文本消息类型的输出 */
export type MessageOutput = {
  type: OutputType.Message
  content: MessageContent
}

/** 构造文本消息类型的输出 */
export function makeMessage(content: MessageContent): MessageOutput {
  return {
    type: OutputType.Message,
    content
  }
}

/** 让用户选择一个选项的输出 */
export type SelectOutput = {
  type: OutputType.Select
  options: string[]
  before?: string
  after: string
}

/** 构造让用户选择一个选项的输出 */
export function makeSelect(params: {
  options: string[]
  after: string
  before?: string
}): SelectOutput {
  return {
    type: OutputType.Select,
    ...params
  }
}

/** 机器人的输出 */
export type Output = MessageOutput | SelectOutput

export type MaybeOutput = Output | undefined | null

export type MaybeAsyncOutput = MaybeOutput | Promise<MaybeOutput>

export type SyncProcessed = MaybeAsyncOutput | MaybeAsyncOutput[]

/** 机器人每次 process 逻辑返回的内容 */
export type Processed = SyncProcessed | Promise<SyncProcessed>

/** 机器人 */
export interface IRobot {
  process(input: Input): Processed
}

/** 最简单的机器人，用户说啥它说啥 */
export class EchoRobot implements IRobot {
  process(input: Input) {
    if (input.type === InputType.Message) {
      return makeMessage(input.content)
    }
  }
}
