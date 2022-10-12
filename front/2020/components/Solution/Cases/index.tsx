/**
 * @file 解决方案页“客户案例”模块
 * @description 跟产品页 logo 墙不一样的是，这里除展示 logo 外，还展示客户名称 & 简单的介绍
 */

import React, { PropsWithChildren, createContext, HTMLAttributes, useContext } from 'react'
import { chunk } from 'lodash'
import cls from 'classnames'
import { useMobile } from 'hooks/ua'

import IconChat from './chat.svg'
import style from './style.less'

export type Props = PropsWithChildren<{}>

type ContextValue = {
  vertical: boolean // case 组件是否垂直方向显示
}

const caseContext = createContext<ContextValue | null>(null)

const Row = (props: HTMLAttributes<HTMLElement>) => (
  <div className={style.row} {...props} />
)

export default function Cases({ children }: Props) {
  const isMobile = useMobile()
  const childrenArr = React.Children.toArray(children)
  const len = childrenArr.length
  const originalSize = 3
  const vertical = isMobile || len >= originalSize
  const size = (vertical && !isMobile) ? originalSize : 1
  // 不为size的倍数则补齐
  while (childrenArr.length % size !== 0) {
    childrenArr.push(<InvisibleCase key={childrenArr.length} />)
  }
  return (
    <caseContext.Provider value={{ vertical }}>
      {
        chunk(childrenArr, size).map((group, i) => (
          <Row key={i}>{group}</Row>
        ))
      }
    </caseContext.Provider>
  )
}

export function InvisibleCase() {
  // todo：这边按理来说，只有 vertical 时才有可能有 InvisibleCase，所以直接取 style.vertical
  return <section className={cls(style.case, style.vertical, style.invisible)} />
}

export type CaseProps = PropsWithChildren<{
  logo: string
  title: string
  logoClassName?: string
  onConsult: () => void
}>

export function Case({ logo, title, logoClassName, onConsult, children }: CaseProps) {
  const contextValue = useContext(caseContext)
  if (!contextValue) {
    throw new Error('Component Case should be used in Cases.')
  }
  const vertical = contextValue.vertical
  return (
    <section className={cls(style.case, vertical && style.vertical)}>
      <div className={style.logoWrapper}>
        <img src={logo} alt={title} className={cls(style.logo, logoClassName)} />
      </div>
      <div className={style.content}>
        <h5 className={style.title}>{title}</h5>
        <div className={style.desc}>{children}</div>
        {
          !vertical && (
            <div className={style.footer}>
              <button type="button" className={style.consultEntry} onClick={onConsult}>
                <IconChat className={style.iconChat} />
                在线咨询
              </button>
            </div>
          )
        }
      </div>
    </section>
  )
}
