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

type RootNode = {
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

type RenderOptions = {
  renderTabPane: (tab: ReactNode, key: string, children: ReactNode) => ReactNode
  renderTabs: (key: number, children: ReactNode) => ReactNode
  tagNames?: { [k in keyof ReactHTML]?: keyof ReactHTML } // 映射标签名称到指定标签
}

export function renderMdText(text: string, options: RenderOptions): Promise<JSX.Element> {
  return new Promise(resolve => {
    function htmlNodeToReactPlugin() {
      Object.assign(this, { Compiler: compiler })
      function compiler(root: RootNode) {
        const res = renderRootNode(root, options)
        resolve(res)
      }
    }
    unified()
      .use(remarkGfm) // 支持 github 风格的 md，如链接
      .use(remarkParse) // 将 md text 转为 md ast
      .use(remarkRehype, { allowDangerousHtml: true }) // rehype 解析树
      .use(rehypeRaw) // // rehype 再次解析树，处理 md 里面的 html
      .use([htmlNodeToReactPlugin])
      .process(text)
  })
}

function renderRootNode(root: RootNode, options: RenderOptions) {
  return React.createElement(
    Fragment,
    null,
    childrenToReactNode(root.children, options)
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

function renderElementNode(element: ElementNode, key: number, options: RenderOptions): JSX.Element {
  const children = element.children
  const len = children.length
  return React.createElement(
    (options.tagNames && options.tagNames[element.tagName]) || element.tagName,
    { key, ...element.properties },
    len !== 0 ? childrenToReactNode(children, options, element) : null
  )
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
