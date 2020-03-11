/**
 * @file loadings store
 * @author nighca <nighca@live.cn>
 */

import { observable, action, computed, ObservableMap } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { replaceMethod } from 'qn-fe-core/utils'

export type Loading = boolean

const collectKey = Symbol('loadings-collect-key')

@injectable()
export default class Loadings<E = {}> extends Store {

  static handle(name: string) {
    return replaceMethod((origin) => function (this: any, ...args: any[]) {
      const promise = origin.apply(this, args)
      const loadings = this[collectKey]
      return loadings.promise(name, promise)
    })
  }

  static collectFrom(target: any, ...names: string[]): Loadings
  static collectFrom<E>(target: any, names: Record<keyof E, string>): Loadings<E> // enum with string value
  static collectFrom(target: any, ...args: any[]): Loadings {
    if (target[collectKey]) {
      throw new Error('Duplicated collectFrom calls.')
    }
    return target[collectKey] = new Loadings(...args)
  }

  @observable state: ObservableMap<string, Loading> = observable.map()
  @computed get names(): string[] {
    return Array.from(this.state.keys())
  }

  constructor(...names: string[])
  constructor(names: Record<keyof E, string>) // enum with string value
  constructor(arg: any, ...extraArgs: string[]) {
    super()

    let names: string[] = []
    if (typeof arg === 'string') {
      names = [arg, ...extraArgs]
    } else if (typeof arg === 'object') {
      names = Object.values(arg) // TODO: use valuesOfEnum
    }

    names.forEach(
      name => this.add(name)
    )
  }

  @action add(name: string): void {
    if (!this.state.has(name)) {
      this.state.set(name, false)
    }
  }

  @action start(name: string): void {
    this.state.set(name, true)
  }

  @action stop(name: string): void {
    this.state.set(name, false)
  }

  isLoading(name: string): boolean {
    return Boolean(this.state.get(name))
  }

  isFinished(name: string): boolean {
    return !this.isLoading(name)
  }

  isAllFinished(): boolean {
    return this.names.reduce(
      (finished, name) => finished && this.isFinished(name),
      true as boolean
    )
  }

  promise<T>(name: string, promise: Promise<T>): Promise<T> {
    this.start(name)
    const stopLoading = () => this.stop(name)
    promise.then(stopLoading, stopLoading)
    return promise
  }

  handle(name: string) {
    const loadings = this // tslint:disable-line
    return replaceMethod(origin => function(this: any, ...args: any[]) {
      const promise = origin.apply(this, args)
      return loadings.promise(name, promise)
    })
  }

}
