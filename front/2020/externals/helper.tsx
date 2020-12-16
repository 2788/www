/**
 * @file externals 相关工具函数
 */

import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'

export function register(
  /** 组件名 */
  name: string,
  /** 组件定义 */
  Comp: ComponentType,
  /** 其他需要被提供出去的内容 */
  extra?: Record<string, unknown>
) {
  // eslint-disable-next-line no-underscore-dangle
  (window as any).__qiniu_www_externals__.components[name] = {
    ...extra,
    render(targetElement: HTMLElement) {
      ReactDOM.render(<Comp />, targetElement)
    }
  }
}
