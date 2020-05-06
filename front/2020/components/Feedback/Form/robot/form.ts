/**
 * @file 表单机器人
 * @description 基于给定的表单与用户进行交互，以收集表单信息的机器人
 */

import { IRobot, Input, Processed, InputType, makeMessage } from '.'

/** 校验函数 */
export type Validator<T> = (value: T) => string | null | undefined

/** 表单项定义 */
export type FormItem = {
  /** 当前输入项的描述 */
  name: string
  /** 展示给用户的信息，默认为 `请输入${name}` */
  message?: string
  /** 用户输入的校验函数 */
  validator?: Validator<any>
}

/** 基于给定的表单与用户进行交互，以收集表单信息的机器人 */
export default class FormRobot implements IRobot {

  constructor(
    /** 所有的 form item */
    private items: FormItem[],
    /** 表单提交回调函数 */
    private onSubmit: (inputs: unknown[]) => void | Promise<void>
  ) {}

  /** 当前处理的 form item 索引 */
  private index = 0

  /** 收集到的用户输入 */
  private inputs: any[] = []

  /** 当前处理的 form item */
  private get item(): FormItem | undefined {
    return this.items[this.index]
  }

  /** 处理下一个 form item */
  private async next() {
    if (!this.item) {
      try {
        await this.onSubmit(this.inputs)
      } catch {
        return makeMessage('提交失败，请稍后重试')
      }
      this.index = -1
      this.inputs = []
      return makeMessage('感谢您的反馈，我们会尽快处理')
    }
    const { name, message } = this.item
    return makeMessage(message != null ? message : `请输入${name}`)
  }

  /** 校验用户输入并响应之 */
  private validate<T>(value: T) {
    if (!this.item) {
      this.index = 0
    }
    const { name, validator } = this.item!
    const error = validator ? validator(value) : null
    if (error) {
      return makeMessage(`${error}，请重新输入${name}`)
    }
    this.inputs[this.index] = value
    this.index++
    return this.next()
  }

  process(input: Input): Processed {
    switch (input.type) {
      // 初始化
      case InputType.Initial:
        return this.next()
      case InputType.Message:
        return this.validate(input.content)
      case InputType.Select:
        return this.validate(input.value)
      default:
    }
  }
}
