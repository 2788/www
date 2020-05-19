/* eslint-disable react/no-danger */
import React from 'react'

// 渲染模板
// @example: renderTemplate('a<br />b')
export default function renderTemplate(text: string) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}
