import React, { HTMLAttributes, PropsWithChildren } from 'react'

import style from './style.less'

interface ITextProps extends HTMLAttributes<HTMLDivElement> {
  target?: 'mode' | 'detail' // 计费方式 或 价格详情，默认值为 detail
}

/** 文本内容排版组件，对无样式 HTML 内容（p, ul, ol, strong, em 等）添加基本的排版 */
export function TextWrapper({ target = 'detail', className, ...others }: ITextProps) {
  const wrapperClassName = [style.textWrapper, target === 'mode' && style.modeTextWrapper, className].filter(Boolean).join(' ')
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
