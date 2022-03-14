/**
 * @file markdown preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 * @description modify from `components/Www/Product/Prices/MdPreview/utils.tsx` & to be merged
 */

import React, { ReactHTML, Fragment, ReactNode } from 'react'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

import { wwwDetailUrlPrefix } from 'constants/pgc'

import style from './style.m.less'

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

export type RenderOptions = {
  renderExternalContent(url: string, key: number): ReactNode
}

export function mdTextToHTMLAst(text: string): Promise<RootNode> {
  return new Promise(resolve => {
    // FIXME: 这边 this 的实际类型为 Processor<void, Input, Input, Output>，
    // 但是改为实际类型比较麻烦，所以先 as any 了
    function getHTMLAstPlugin(this: any) {
      Object.assign(this, { Compiler: compiler })
      function compiler(root: RootNode) {
        resolve(root)
      }
    }

    unified()
      .use(remarkParse) // md text -> md ast
      .use(remarkRehype) // md ast -> html ast
      .use(getHTMLAstPlugin)
      .process(text)
  })
}

export function renderHTMLAst(htmlAst: RootNode, options: RenderOptions) {
  return React.createElement(
    Fragment,
    null,
    childrenToReactNode(htmlAst.children, options)
  )
}

function childrenToReactNode(
  children: Array<TextNode | ElementNode>,
  options: RenderOptions,
  parent?: ElementNode | RootNode
) {
  children = [...children]
  const res: ReactNode[] = []
  let key = 0
  for (let i = 0; i < children.length; i++) {
    const externalContentInfo = getExternalContentInfo(children, i)
    if (externalContentInfo != null) {
      res.push(options.renderExternalContent(externalContentInfo.url, key++))
      children.splice(i, externalContentInfo.end - i)
      continue
    }

    const current = children[i]

    if (current.type === 'text') {
      const text = renderTextNode(current, parent)
      if (text !== null) {
        res.push(text)
      }
      continue
    }

    if (current.type === 'element') {
      res.push(renderElementNode(current, key++, options))
      continue
    }
  }
  return res
}

interface ExternalContentInfo {
  url: string
  end: number
}

// 识别类似这种三段式结构： <hr /><p>${wwwUrlPrefix}${id}</p><hr />
function getExternalContentInfo(
  children: Array<TextNode | ElementNode>,
  index: number
): null | ExternalContentInfo {
  // 至少 3 段结构，提前熔断
  if (index + 3 > children.length) {
    return null
  }

  let current = children[index]

  // 匹配第一段
  if (!isHr(current)) {
    return null
  }

  let url: string | null = null

  for (let i = index + 1; i < children.length; i++) {
    current = children[i]

    if (isBlank(current)) {
      continue
    }

    // 匹配第二段
    if (url == null) {
      let text = ''

      if (current.type === 'text') {
        text = current.value
      } else if (current.type === 'element' && isHtmlTag(current, 'p')) {
        const childrenOfP = current.children.filter(child => !isBlank(child))
        if (childrenOfP.length === 1 && childrenOfP[0].type === 'text') {
          text = childrenOfP[0].value
        }
      }

      text = text.trim()

      if (isExternalContentUrl(text)) {
        url = text
        continue
      }

      return null
    }

    // 匹配第三段
    return isHr(current)
      ? {
        url,
        end: i
      }
      : null
  }

  return null
}

function renderElementNode(element: ElementNode, key: number, options: RenderOptions): ReactNode {
  const children = element.children
  const len = children.length
  const tagName = element.tagName.toLowerCase()
  if (tagName === 'style' || tagName === 'script') {
    return null
  }
  const reactElement = React.createElement(
    tagName,
    // TODO: 先屏蔽 style、className，后续如果要支持，可参考 react-markdown 中的做法来支持
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

// 滤掉最常见的空白符 case 以保证一定的语义健壮性
function isBlank(node: TextNode | ElementNode): boolean {
  return node.type === 'text' && node.value.match(/^\s*$/) != null // 包括 \n
    || node.type === 'element' && (
      isHtmlTag(node, 'br')
      || isHtmlTag(node, 'p') && node.children.every(child => isBlank(child))
    )
}

function isHr(node: TextNode | ElementNode): boolean {
  return node.type === 'element' && isHtmlTag(node, 'hr')
}

function isHtmlTag(element: ElementNode, tag: string): boolean {
  return element.tagName.toLowerCase() === tag.toLowerCase()
}

function isExternalContentUrl(url: string): boolean {
  return url.trim().indexOf(wwwDetailUrlPrefix) === 0
}

export function getExternalContentId(url: string): string {
  return url.trim().replace(wwwDetailUrlPrefix, '').replace(/[/?#].*/, '')
}

