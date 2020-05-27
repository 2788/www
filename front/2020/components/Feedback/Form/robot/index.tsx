/**
 * @file 聊天机器人定义
 * @description 与用户进行交互
 */

import { ReactNode, ComponentType } from 'react'

export * from './utils'

/** 文本消息内容 */
export type MessageContent = ReactNode

/** 机器人的输入类型 */
export enum InputType {
  /** 逻辑初始化，用户还没有开始交互 */
  Initial,
  /** 用户通过消息框输入文本消息 */
  Message,
  /** 用户通过界面上的表单组件提交 */
  FormSubmit
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

/** 用户通过界面上的选择组件提交对应的输入 */
export type FormSubmitInput<V = any> = {
  type: InputType.FormSubmit
  value: V
}

/** 机器人的输入 */
export type Input = InitialInput | MessageInput | FormSubmitInput

/** 机器人的输出类型 */
export enum OutputType {
  /** 文本消息 */
  Message,
  /** 让用户填写表单 */
  Form,
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

export type FormComponent<V> = ComponentType<{
  onSubmit(v: V): void
}>

/** 让用户进行选择的输出 */
export type FormOutput<V = any> = {
  type: OutputType.Form
  comp: FormComponent<V>
}

/** 构造表单类型的输出 */
export function makeForm<V>(comp: FormComponent<V>): FormOutput {
  return {
    type: OutputType.Form,
    comp
  }
}

/** 机器人的输出 */
export type Output = MessageOutput | FormOutput

export type MaybeOutput = Output | undefined | null

export type MaybeAsyncOutput = MaybeOutput | Promise<MaybeOutput>

/** 机器人每次 process 逻辑返回的内容 */
export type Processed = MaybeAsyncOutput | MaybeAsyncOutput[]

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
