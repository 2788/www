/**
 * @file store Toaster
 * @author nighca <nighca@live.cn>
 */

import { extend } from 'lodash'
import { action, observable, computed } from 'mobx'
import * as mustache from 'mustache'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { getMessage, Caught, isCancelled, mapMessage } from 'qn-fe-core/exception'

import { replaceMethod } from '../utils'
import { isApiException } from './fetch'

export type ToasterType = 'info' | 'success' | 'warning' | 'error' // | 'wait'

export const defaultDelay = 5000

export interface IItem {
  /**
   * item 类型
   */
  type: ToasterType

  /**
   * item 消息，Toaster 弹窗中显示的内容
   */
  message: string

  /**
   * delay 延迟时间, Toaster 显示时间
   * TODO: 相关的应该分离到 component 里
   */
  delay?: number
}

export type ItemOrText = IItem | string

export type ToasterState = IItem[]

const bindKey = Symbol('toaster-bind-key')

@injectable()
export default class Toaster extends Store {

  static handle(successText?: string, failureText?: string, levels?: { [key: string]: string }) {
    return replaceMethod((origin) => function _handle(this: any, ...args: any[]) {
      const toaster = this[bindKey]
      const promise = origin.apply(this, args)
      levels = toaster.getLevels(levels)
      return toaster.promise(promise, successText, failureText, levels)
    })
  }

  static bind(target: any, toasterStore: Toaster) {
    target[bindKey] = toasterStore
  }

  delay = new Map<ToasterType, number>()

  setDelay(type: ToasterType, delay: number) {
    this.delay.set(type, delay)
  }

  // 存储历史 Toaster 内容，方便调试使用
  @observable.shallow queue: IItem[] = []

  @computed get current(): IItem {
    const all = this.queue
    return all[all.length - 1]
  }

  @action add(item: IItem): Promise<void> {
    this.queue.push(item)
    return Promise.resolve()
  }

  @action remove(item: IItem): Promise<void> {
    const index = this.queue.indexOf(item)
    if (index >= 0) {
      this.queue.splice(index, 1)
    }
    return Promise.resolve()
  }

  info(item: ItemOrText) {
    return this.add(this.makeItem(item, 'info'))
  }

  success(item: ItemOrText) {
    return this.add(this.makeItem(item, 'success'))
  }

  warning(item: ItemOrText) {
    return this.add(this.makeItem(item, 'warning'))
  }

  error(item: ItemOrText) {
    return this.add(this.makeItem(item, 'error'))
  }

  // wait(item: ItemOrText) {
  //   return this.add(this.makeItem(item, 'wait'))
  // }

  getDelay(type: ToasterType): number {
    return this.delay.get(type) || defaultDelay
  }

  getLevels(levels?: { [key: string]: string }): { [key: string]: ToasterType } {
    return extend({
      resolve: 'success',
      reject: 'error'
    } as const, levels)
  }

  makeItem(item: ItemOrText, type: ToasterType): IItem {
    const delay = this.getDelay(type)
    if (typeof item === 'string') {
      return {
        type,
        delay,
        message: item
      }
    }
    return { delay, ...item, type }
  }

  exception(rejected: Caught, failureText?: string, levels?: { [key: string]: ToasterType }) {
    levels = this.getLevels(levels)

    if (isCancelled(rejected)) {
      console.warn('[CANCELLED]') // eslint-disable-line
      return
    }

    // TODO: 考虑是否需要允许外部指定 `defaultMessage`
    const defaultMessage = '未知错误'
    if (failureText) {
      rejected = mapMessage(rejected, failureText, defaultMessage)
    }

    let msg = getMessage(rejected, defaultMessage)
    if (isApiException(rejected)) {
      msg = `[${rejected.detail.code}] ${msg}`
    }

    this[levels.reject](msg!)
  }

  promise<T>(
    promise: Promise<T>,
    successText?: string,
    failureText?: string,
    levels?: { [key: string]: ToasterType }
  ): Promise<T> {
    levels = this.getLevels(levels)
    promise.then(
      (resolved) => {
        if (successText) {
          // TODO: 模版渲染的单测
          successText = mustache.render(successText, { resolved })
          this[levels!.resolve](successText)
        }
      },
      (rejected) => this.exception(rejected, failureText, levels)
    )
    return promise
  }

  handle(successText?: string, failureText?: string, levels?: { [key: string]: ToasterType }) {
    levels = this.getLevels(levels)

    const me = this // eslint-disable-line

    return replaceMethod((origin) => function _handle(this: any, ...args: any[]) {
      const promise = origin.apply(this, args)
      return me.promise(promise, successText, failureText, levels)
    })
  }

  handleInfo(successText?: string, failureText?: string) {
    return this.handle(successText, failureText, { resolve: 'info' })
  }
}
