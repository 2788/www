/**
 * @file 聊天机器人定义
 * @description 与用户进行交互
 */

/** 文本消息内容 */
export type MessageContent = string

/** 机器人的输入类型 */
export enum InputType {
  /** 逻辑初始化，用户还没有开始交互 */
  Initial,
  /** 用户通过消息框输入文本消息 */
  Message,
  /** 用户通过界面上的选择组件提交 */
  Select
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
export type SelectInput<V = string> = {
  type: InputType.Select
  value: V
}

/** 机器人的输入 */
export type Input = InitialInput | MessageInput | SelectInput

/** 机器人的输出类型 */
export enum OutputType {
  /** 文本消息 */
  Message,
  /** 让用户进行选择 */
  Select,
  /** 控制用户输入框中的内容 */
  UserInputControl
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

/** 选项 */
export type SelectOption<V> = {
  text: string
  value: V
}

/** 让用户进行选择的输出 */
export type SelectOutput<V = string> = {
  type: OutputType.Select
  options: Array<SelectOption<V>>
}

/** 控制用户输入框内容的输出 */
export type UserInputControlOutput = {
  type: OutputType.UserInputControl
  value: string
}

/** 机器人的输出 */
export type Output = MessageOutput | SelectOutput | UserInputControlOutput

/**
 * 机器人每次 process 逻辑返回的内容
 * TODO: 考虑以后可能会一次性异步地返回多条内容
 */
export type Processed = Output | Promise<Output> | undefined | null

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

/**
 * 把机器人的最小处理时间延长为指定 delay 值（单位 ms）
 * 即，如果某次回复距离用户输入时间小于 delay，则将回复推迟到 delay 对应的时间点，感觉上更自然
 */
export const withEase = (delay: number) => (robot: IRobot): IRobot => ({
  process(input: Input) {
    const processed = robot.process(input)
    if (!processed) {
      return processed
    }
    return timeout(delay).then(
      () => processed
    )
  }
})

function timeout(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
