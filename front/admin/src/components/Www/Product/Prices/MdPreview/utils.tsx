/**
 * @file          component  utils
 * @description   提供 mdtext -> jsx 的逻辑方法，使用类似 react-markdown 的处理逻辑，只是中间加了自定义转换逻辑（如 h3 -> tabs），
 * 具体可参考 https://github.com/unifiedjs/unified 和 https://github.com/remarkjs/react-markdown
 * @author        renpanpan
 */

import React, { ReactHTML, Fragment, ReactNode } from 'react'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'

import * as style from './style.m.less'

export type RootNode = {
  type: 'root'
  children: Array<TextNode | ElementNode>
}

type TextNode = {
  type: 'text'
  value: string
}

type ElementNode = {
  type: 'element'
  children: Array<TextNode | ElementNode>
  properties: object
  tagName: keyof ReactHTML
}

export type RenderOptions = {
  renderTabPane: (tab: ReactNode, key: string, children: ReactNode) => ReactNode
  renderTabs: (key: number, children: ReactNode) => ReactNode
  tagNames?: { [k in keyof ReactHTML]?: keyof ReactHTML } // 映射标签名称到指定标签
}

export function mdTextToHTMLAst(text: string): Promise<RootNode> {
  return new Promise(resolve => {
    // todo：这边 this 的实际类型为 Processor<void, Input, Input, Output>，
    // 但是改为实际类型比较麻烦，所以先 as any 了
    function getHTMLAstPlugin(this: any) {
      Object.assign(this, { Compiler: compiler })
      function compiler(root: RootNode) {
        resolve(root)
      }
    }

    unified()
      .use(remarkGfm) // 支持 github 风格的 md，如链接
      .use(remarkParse) // 将 md text 转为 md ast
      .use(remarkRehype, { allowDangerousHtml: true }) // rehype 解析树
      .use(rehypeRaw) // // rehype 再次解析树，处理 md 里面的 html
      .use(getHTMLAstPlugin)
      .process(text)
  })
}

// 因价格页展示需求，md 文档会有多个一级标题，为符合 html 语义以及和实际上页面展示所对应，
// 这边特意将 h1 -> h2，顺延 h2 -> h3，因 h3 -> tabs，故后续无需再转换
const defaultTagNames: { [k in keyof ReactHTML]?: keyof ReactHTML } = {
  h1: 'h2',
  h2: 'h3'
}

export function renderHTMLAst(htmlAst: RootNode, options: RenderOptions) {
  options = { ...options, tagNames: { ...defaultTagNames, ...options.tagNames } }
  return React.createElement(
    Fragment,
    null,
    childrenToReactNode(htmlAst.children, options)
  )
}

function childrenToReactNode(
  children: Array<TextNode | ElementNode>, options: RenderOptions, parent?: ElementNode | RootNode
) {
  const res: ReactNode[] = []
  let key = 0
  let i = 0
  let tabPanes: ReactNode[] = []
  const len = children.length
  while (i < len) {
    const current = children[i]
    if (current.type === 'text') {
      const text = renderTextNode(current, parent)
      if (text !== null) {
        res.push(text)
      }
      i++
      continue
    }
    if (current.tagName !== 'h3') {
      res.push(renderElementNode(current, key++, options))
      i++
      continue
    }
    // h3 转为 tabs
    // tabPane 中的 tab
    const tabChildren: ReactNode[] = childrenToReactNode(current.children, options, current)
    const tab = React.createElement(Fragment, null, tabChildren)
    i++
    // tabPane 中的 content，即两个 h3 之间的内容（实际上得到的 node 中两个 h3 之间的内容还是和 h3 平级的）
    const contentChildrenSource: Array<TextNode | ElementNode> = []
    let next: TextNode | ElementNode | null = i < len ? children[i] : null
    // 当没有下一个元素或者遇到 h1|h2|h3 标签，表示到达边界，tabPane 的 content 已全部获取
    while (next !== null && (next.type === 'text' || !(/h[1-3]/.test(next.tagName)))) {
      contentChildrenSource.push(next)
      i++
      next = i < len ? children[i] : null
      continue
    }
    const contentChildren: ReactNode[] = childrenToReactNode(contentChildrenSource, options)
    const content = React.createElement(Fragment, null, contentChildren)
    tabPanes.push(options.renderTabPane(tab, `${tabPanes.length}`, content))
    // 当到达边界即 h3 三级标题结束时，tabs 中包含的 TabPane 都已经完成转换
    if (next === null || next.tagName !== 'h3') {
      res.push(options.renderTabs(key++, tabPanes))
      tabPanes = []
    }
  }
  return res
}

function renderElementNode(element: ElementNode, key: number, options: RenderOptions): ReactNode {
  const children = element.children
  const len = children.length
  const tagName = ((options.tagNames && options.tagNames[element.tagName]) || element.tagName).toLowerCase()
  if (tagName === 'style' || tagName === 'script') {
    return null
  }
  const reactElement = React.createElement(
    tagName,
    // todo：和产品确认了可以先屏蔽 style、className，后续如果要支持，可参考 react-markdown 中的做法来支持
    { key, ...element.properties, style: undefined, className: undefined },
    len !== 0 ? childrenToReactNode(children, options, element) : null
  )
  if (tagName === 'table') { // 表格外面包一层 div，防止宽度超出
    return <div className={style.tableWrapper} key={key}>{reactElement}</div>
  }
  return reactElement
}

// The table-related elements that must not contain whitespace text according to React.
const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr'])

function renderTextNode(child: TextNode, parent?: ElementNode | RootNode) {
  if (
    child.value === '\n'
    || (parent && parent.type === 'element' && tableElements.has(parent.tagName))
  ) { // 去除不必要的空白文本，React does not permit whitespace text elements as children of table
    return null
  }
  return child.value
}
