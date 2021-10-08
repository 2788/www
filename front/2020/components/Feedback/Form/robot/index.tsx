/**
 * @file 聊天机器人定义
 * @description 与用户进行交互
 */

import { ReactNode } from 'react'

export * from './utils'

/** 普通消息内容 */
export type MessageContent = ReactNode

/** 机器人的输入类型 */
export enum InputType {
  /** 逻辑初始化，用户还没有开始交互 */
  Initial,
  /** 用户通过消息框输入普通消息 */
  Message,
  /** 用户表单提交完成 */
  FormSubmitted
}

/** 逻辑初始化对应的输入 */
export type InitialInput = {
  type: InputType.Initial
}

/** 用户通过消息框输入普通消息对应的输入 */
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
  /** 普通消息 */
  Message,
  /** 操作类输出，用户完成操作后消失 */
  Action,
}

/** 普通消息类型的输出 */
export type MessageOutput = {
  type: OutputType.Message
  content: MessageContent
}

/** 构造普通消息类型的输出 */
export function makeMessage(content: MessageContent): MessageOutput {
  return {
    type: OutputType.Message,
    content
  }
}

/** 操作类型输出的内容 */
export type ActionContent = ReactNode

/** 操作类型的输出 */
export type ActionOutput = {
  type: OutputType.Action
  content: ActionContent
}

/** 构造操作类型的输出 */
export function makeAction(content: ActionContent): ActionOutput {
  return {
    type: OutputType.Action,
    content
  }
}

/** 机器人的输出 */
export type Output = MessageOutput | ActionOutput

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
