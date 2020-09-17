/**
 * @file externals 相关工具函数
 */

import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'

export function register(name: string, Comp: ComponentType) {
  // eslint-disable-next-line no-underscore-dangle
  (window as any).__qiniu_www_externals__.components[name] = {
    render(targetElement: HTMLElement) {
      ReactDOM.render(<Comp />, targetElement)
    }
  }
}
