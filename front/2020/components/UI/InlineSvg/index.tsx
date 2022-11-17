/**
 * @file 渲染 svg string
 */

import React from 'react'

export function InlineSvgIcon({ content, className }: { className?: string, content: string }) {
  // eslint-disable-next-line react/no-danger
  return <span className={className} dangerouslySetInnerHTML={{ __html: content }} />
}
