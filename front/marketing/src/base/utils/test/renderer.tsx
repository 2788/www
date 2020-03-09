
/**
 * @file component renderer which provides context with global stores
 * @desc Renderer 实例可以用于替代 `react-test-renderer` 进行如 `create` 等操作
 * @author nighca <nighca@live.cn>
 */

import React from 'react'
import { create, act, ReactTestRenderer, TestRendererOptions } from 'react-test-renderer'
import { createMemoryHistory } from 'history'
import * as di from 'qn-fe-core/di'
import { RouterStore } from 'qn-fe-core/router'
import { defaultProvides } from '../../components/Provider'

// 用于对组件渲染行为进行测试的工具类
export class RendererUtils {

  protected diContainer: di.IContainer

  constructor(
    provides?: di.Provides,
    containerOptions?: di.IContainerOptions,
    parentContainer?: di.IContainer
  ) {
    provides = di.mergeProvides(defaultProvides, provides)
    this.diContainer = di.createContainer(provides, containerOptions, parentContainer)

    // initialize for router store
    const history = createMemoryHistory()
    history.push('/')
    this.diContainer.get(RouterStore).bindHistory(history)
  }

  inject<T>(identifier: di.Identifier<T>): T {
    return this.diContainer.get(identifier)
  }

  // 用 provider 对内容进行包裹
  private wrapElement(element: React.ReactElement) {
    return (
      <di.Provider container={this.diContainer}>
        {element}
      </di.Provider>
    )
  }

  // 对 renderer 进行包裹以替换其 `update` 方法（在 `update` 被调用时对内容进行包裹）
  private wrapRenderer(renderer: ReactTestRenderer) {
    const wrapped: ReactTestRenderer = Object.create(renderer)
    const wrapElement = this.wrapElement.bind(this)
    const originalUpdate = wrapped.update
    wrapped.update = function update(nextElement: React.ReactElement) {
      return originalUpdate.call(this, wrapElement(nextElement))
    }
    return wrapped
  }

  create(nextElement: React.ReactElement, options?: TestRendererOptions) {
    const renderer = create(
      this.wrapElement(nextElement),
      options
    )
    return this.wrapRenderer(renderer)
  }

  act = act

  // 用 act 包裹 create 过程，主要区别是在返回 renderer 前会把累积的 effect 执行
  createWithAct(nextElement: React.ReactElement, options?: TestRendererOptions) {
    let renderer: ReactTestRenderer
    this.act(() => {
      renderer = this.create(nextElement, options)
    })
    return renderer
  }
}
