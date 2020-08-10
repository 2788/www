import React, { HTMLAttributes, PropsWithChildren } from 'react'

import style from './style.less'

/** 文本内容排版组件，对无样式 HTML 内容（p, ul, ol, strong, em 等）添加基本的排版 */
export function TextWrapper({ className, ...others }: HTMLAttributes<HTMLDivElement>) {
  const wrapperClassName = [style.textWrapper, className].filter(Boolean).join(' ')
  return <div className={wrapperClassName} {...others} />
}

/** 警示内容，高亮标红显示 */
export function Alert({ className, ...others }: HTMLAttributes<HTMLParagraphElement>) {
  const wrapperClassName = [style.alert, className].filter(Boolean).join(' ')
  return <p className={wrapperClassName} {...others} />
}

/** 表格内容排版组件，对无样式表格内容添加基本的排版 */
export function TableWrapper({ children }: PropsWithChildren<{}>) {
  return <div className={style.tableWrapper}>{children}</div>
}
